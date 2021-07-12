import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { registerWithFirebase, submitRegister } from 'app/auth/store/registerSlice';
import { useForm } from '@fuse/hooks';
import axios from 'axios';
import _ from '@lodash';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
	upload: {
		'& > *': {
			margin: theme.spacing(1)
		}
	},
	input: {
		display: 'none'
	}
}));

function FirebaseRegisterTab(props) {
	const dispatch = useDispatch();
	const register = useSelector(({ auth }) => auth.register);
	const classes = useStyles();

	const { form, handleChange, setForm } = useForm({});
	const [profileImg, setProfileImgData] = React.useState('');
	const [profileObject, setProfileObject] = React.useState();
	const [showPassword, setShowPassword] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const [data, setData] = useState([]);
	const [errorText, setErrorText] = useState('');
	const [dialog, setDialog] = useState({
		open: false,
		title: null,
		content: null
	});
	const formRef = useRef(null);

	useEffect(() => {
		axios.get('/api/knowledge-base').then(res => {
			setData(res.data);
		});
	}, []);

	useEffect(() => {
		if (register.error && (register.error.username || register.error.password || register.error.email)) {
			formRef.current.updateInputsWithError({
				...register.error
			});
			disableButton();
		}
	}, [register]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}	

	function handleSubmit(model) {				
		if (profileObject) 
			model["profile"] = profileObject;
		else 
			model["profile"] = '';

		dispatch(registerWithFirebase(model)).then((response) => {
			if(response.type === 'auth/register/registerSuccess') { 
				dispatch(submitRegister(model));
			} else if(response.type === 'auth/register/registerError') {
				console.log(response);
			}
		}).catch((err) => {
			console.log(err);		
		});		
	}

	function onChangeProfile(img) {
		setProfileObject(img);
		var reader = new FileReader();
		reader.readAsBinaryString(img);

		reader.onload = function () {
			setProfileImgData(btoa(reader.result));
		};
		reader.onerror = function () {
			console.log('there are some problems');
		};
	}

	function handleOpenDialog(id) {
		const dialogData = _.find(data, (item) => item.id===id);
		setDialog({
			open: true,
			...dialogData
		});
	}

	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<div
					style={{
						marginBottom: 20,
						display: 'flex',
						flexDirection: 'row',
						alignContent: 'center',
						alignItems: 'center'
					}}
				>
					{/* <Avatar className="w-96 h-96" src={`data:image/png;base64,${profileImg}`} />
					<div className={classes.upload}>
						<TextFieldFormsy
							name="profile"
							accept="image/png"
							className={classes.input}
							id="contained-button-file"
							multiple
							type="file"
							onChange={e => onChangeProfile(e.target.files[0])}
						/>
						<label htmlFor="contained-button-file">
							<Button variant="contained" color="primary" component="span">
								{profileImg ? `Change` : `Add image`}
							</Button>
						</label>
						{profileImg && (
							<Button
								variant="outlined"
								color="primary"
								component="span"
								onClick={() => setProfileImgData('')}
							>
								Delete
							</Button>
						)}
					</div> */}
				</div>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="displayName"
					label="Display name"
					validations={{
						minLength: 4,
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									person
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="email"
					name="email"
					label="Email"
					validations="isEmail"					
					validationErrors={{
						isEmail: 'Please enter a valid email'
					}}
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

				<TextFieldFormsy
					className="mb-16"
					type="password"
					name="password"
					label="Password"
					onChange={handleChange}
					validations={{
						minLength: 8,
						matchRegexp: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
					}}
					
					validationErrors={{
						minLength: 'Password is too short - should be 8 chars minimum.',
						matchRegexp: 'Password must contain at least one special character.'
					}}													
					InputProps={{
						type: showPassword ? 'text' : 'password',
						endAdornment: (
							<InputAdornment position="end">
								{form.password && 
									<IconButton onClick={() => setShowPassword(!showPassword)}>
										<Icon className="text-20" color="action">
											{showPassword ? 'visibility' : 'visibility_off'}
										</Icon>
									</IconButton>
								}
								<Icon className="text-20" color="action">
									vpn_key
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="password"
					name="password-confirm"
					label="Confirm Password"
					validations="equalsField:password"					
					validationErrors={{
						equalsField: 'Passwords do not match'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									vpn_key
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<div className="flex flex-col items-center justify-center pb-32">
					<div>
						<span className="font-medium mr-8">{`By Registering, you agree to our`}</span>
						<Link 
							className="font-medium" 
							to='/document/1'
							// onClick={() => handleOpenDialog('6')}
						>
							Terms & Conditions 
						</Link>
						<Link 
							className="font-medium" 
							to='document/2'
							// onClick={() => handleOpenDialog('7')}
						>
							, Privacy Policy
						</Link>
					</div>
				</div>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="REGISTER WITH FIREBASE"
					disabled={isFormValid && !errorText ? false : true}
				>
					Register
				</Button>
			</Formsy>

			{useMemo(() => {
				function handleCloseDialog() {
					setDialog({
						...dialog,
						open: false
					});
				}

				return (
					<Dialog
						open={dialog.open}
						onClose={handleCloseDialog}
						aria-labelledby="knowledge-base-document"
						TransitionComponent={Transition}
					>
						<DialogTitle>{dialog.title}</DialogTitle>
						<DialogContent>
							<DialogContentText dangerouslySetInnerHTML={{ __html: dialog.content }} />
						</DialogContent>
						<DialogActions>
							<Button onClick={handleCloseDialog} color="primary">
								CLOSE
							</Button>
						</DialogActions>
					</Dialog>
				);
			}, [dialog])}
		</div>
	);
}

export default FirebaseRegisterTab;
