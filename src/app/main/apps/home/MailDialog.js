import { useForm } from '@fuse/hooks';
import { TextFieldFormsy } from '@fuse/core/formsy';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import _ from '@lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeMailDialog, setEmail, setProgress, setIsFileUploadCompleted } from './store/projectsSlice';
import moment from 'moment';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import { PY_API_ENDPOINT, FB_STORAGE_URL_ENDPOINT, PY_FILES_API_ENDPOINT } from 'app/fuse-configs/endpointConfig';

const defaultFormState = {
	email: '',
	handleNext: null
};

function AddUserDialog(props) {
	const dispatch = useDispatch();	
	const mailDialog = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.mailDialog);
	const resumeFile = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.resumeFileName); 
	const templateFile = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.templateFileName); 
	const authUser = useSelector(({ auth }) => auth.user); 
	const { form, handleChange, setForm } = useForm(defaultFormState); 	
	const formRef = useRef(null);
	let resumeFileDownloadURL = '';
	let templateFileDownloadURL = '';
	let resumeFileName = '';
	let templateFileName = '';
	let resumeFileSaveName = '';
	let templateFileSaveName = ''

	const initDialog = useCallback(() => {	
		setForm({
			...mailDialog.data,
		}); 
	}, [mailDialog.data, setForm]);

	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {		
		if (mailDialog.props.open) {
			initDialog();
		}
	}, [mailDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return dispatch(closeMailDialog());
	}

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function uploadFile(files, n = 0) {	
		const file = files[n];	
		let timestamp = moment();	
		
		if(n === 0) {
			resumeFileSaveName = `Files/${form.email}_${timestamp.format('x')}_${file.name}`
		} else if(n === 1) {
			templateFileSaveName = `Files/${form.email}_${timestamp.format('x')}_${file.name}`
		}

		const uploadTask = firebase
			.storage()
			.ref().child(n===0 ? resumeFileSaveName : templateFileSaveName)
			.put(file);
		uploadTask.on(
			firebase.storage.TaskEvent.STATE_CHANGED,
			snapshot => { 
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				if (snapshot.state === firebase.storage.TaskState.RUNNING) {
					console.log(`Progress: ${progress}%`);
					dispatch(setProgress(progress));
				}
			},
			error => console.log(error.code),
			async () => {				
				const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();	
				if(n === 0) {
					resumeFileDownloadURL = downloadURL;
					resumeFileName = file.name;
				}					
				else {
					templateFileDownloadURL = downloadURL;
					templateFileName = file.name;

					firebase.database().ref(`files/${authUser.uid}/${timestamp.format('x')}`).set({
						id: timestamp.format('x'),
						uid: authUser.uid,
						email: form.email,
						timestamp: timestamp.format('x'),
						resumeFileName: resumeFileName,
						templateFileName: templateFileName,
						resumeFileDownloadURL: resumeFileDownloadURL,
						templateFileDownloadURL: templateFileDownloadURL,
						resumeFileSaveName: resumeFileSaveName,
						templateFileSaveName: templateFileSaveName
					});	
				}
																																													
				dispatch(setProgress(0));

				n ++; 
				if(n < 2) {
					uploadFile(files, n)
				} else {										
					const pyResumeFilePath = `${PY_API_ENDPOINT}/${resumeFileSaveName}`;
					const pyTemplateFilePath = `${PY_API_ENDPOINT}/${templateFileSaveName}`;					

					axios.get(`${PY_FILES_API_ENDPOINT}`, {						
						params: {
							url1: pyTemplateFilePath,
							url2: pyResumeFilePath,
							user_email: authUser.data.email,
							recc_email: form.email
						}
					}).then((response) => {
						console.log(response.data);
					}).catch((err) => {
						console.log(err);
					});

					dispatch(setIsFileUploadCompleted(true));
				}				
			}
		);
	}

	async function handleSubmit(event) {	
		event.preventDefault();	
		dispatch(setEmail(form.email));	
		mailDialog.data.handleNext();
		closeComposeDialog();

		const data = uploadFile([resumeFile, templateFile]);		
	}

	function handleRemove() {
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...mailDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Please confirm the email ID
					</Typography>
				</Toolbar>
			</AppBar>
			<Formsy 
				onValidSubmit={handleSubmit}
					onValid={enableButton}
					onInvalid={disableButton}
					ref={formRef} 
					className="flex flex-col md:overflow-hidden"
				>
				<Typography className='self-center mt-24' variant="subtitle1" color="inherit">
					Edit the email ID here
				</Typography>
				<DialogContent classes={{ root: 'px-24 pb-24' }}>					
					<div className="flex">
						<div className="flex flex-col justify-center w-full">
							<TextFieldFormsy
								className="mb-16"
								type="email"
								name="email"
								label="Email"
								value={form.email}
								validations="isEmail"					
								validationErrors={{
									isEmail: 'Please enter a valid email'
								}}								
								onChange={handleChange}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												email
											</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								required
							/> 	
						</div>
					</div>				
				</DialogContent>				
				<DialogActions className="justify-between p-8">
					<div className="px-16">
						<Button
							variant="contained"
							color="primary"
							type="submit"
							onClick={handleSubmit}
							disabled={!isFormValid}
						>
							OK
						</Button>
					</div>
					<div className="px-16">
						<Button
							variant="contained"
							color="primary"
							onClick={handleRemove}
						>
							CANCEL
						</Button>
					</div>	
				</DialogActions>
			</Formsy>
		</Dialog>
	);
}

export default AddUserDialog;

