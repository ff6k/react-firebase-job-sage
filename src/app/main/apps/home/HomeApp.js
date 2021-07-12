import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { openMailDialog } from './store/projectsSlice';
import MailDialog from './MailDialog';
import axios from 'axios';
import { API_URL } from 'app/fuse-configs/endpointConfig';
import { logoutUser } from 'app/auth/store/userSlice';

import Step1 from './steps/step1';
import Step2 from './steps/step2';

const useStyles = makeStyles(theme => ({
	content: {
		'& canvas': {
			maxHeight: '100%'
		}
	},
	selectedProject: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '8px 0 0 0'
	},
	projectMenuButton: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '0 8px 0 0',
		marginLeft: 1
	}
}));

function ProjectDashboardApp(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const user = useSelector(({ auth }) => auth.user); 
	const email = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.email); 
	const resumeFileName = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.resumeFileName.name); 
	const templateFileName = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.templateFileName.name); 
	const isFileUploadCompleted = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.isFileUploadCompleted); 
	const [activeStep, setActiveStep] = useState(0);
	const [trialState, setTrialState] = useState(0);

	useEffect(() => {
		if(!user.data.emailVerified) {
			dispatch(logoutUser());
			return;
		}
		axios.get(`${API_URL}/dashboard/${user.uid}`).then(response => { 
			if(response.data) {
				setTrialState(response.data.flag);
			}
		})
	}, []);

	function getSteps() {
		return ['Upload Resume & Roles', 'Download Recommendations'];
	}

	const steps = getSteps();

	const openDialog = () => {
		dispatch(openMailDialog({ email, handleNext: () => handleNext() }));
	};

	const handleNext = () => { 
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return <Step1 />;
			case 1:
				return <Step2 />;
			default:
				return 'Unknown stepIndex';
		}
	}

	return (
		<>
			<FusePageSimple
				classes={{
					toolbar: 'min-h-48 h-48',
					rightSidebar: 'w-288',
					content: classes.content
				}}
				header={
					<div className="p-24">
						<h3>{`Welcome ${user.data.displayName}!`}</h3>
					</div>
				}
				content={
					<div className="p-12">
						<div className='p-12'>
							<Stepper activeStep={activeStep} alternativeLabel>
								{steps.map(label => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>
						</div>
						<div>
							<Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
							<div style={{ position: 'absolute', bottom: 20, right: 20 }}>
							{activeStep === 1 ?
								<Button 
									variant="contained" 
									color="primary" 
									disabled={!isFileUploadCompleted} 
									onClick={handleBack} 
									className={classes.backButton}
								>
									Back
								</Button> :																
								<Button 
									variant="contained" 
									color="primary" 
									disabled={resumeFileName && templateFileName && email && trialState>0 ? false : true} 
									onClick={openDialog}
								>
									{`Continue`}
								</Button>
							}
							</div>
						</div>
					</div>
				}
				ref={pageLayout}
			/>
			<MailDialog />
		</>
	);
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);
