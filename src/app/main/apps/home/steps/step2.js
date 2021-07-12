import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from '../store';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { setEmail, setResumeFileName, setTemplateFileName } from '../store/projectsSlice';

function LinearProgressWithLabel(props) {
	return (
		<Box display="flex" alignItems="center">
			<Box width="100%" mr={1}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

LinearProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate and buffer variants.
	 * Value between 0 and 100.
	 */
	value: PropTypes.number.isRequired
};

const useStyles = makeStyles({
	root: {
		padding: 30
	}
});

function Step2(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const email = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.email); 
	const progress = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.progress); 
	const isFileUploadCompleted = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.isFileUploadCompleted); 
	const [flag, setFlag] = useState(false);
	const [state, setState] = useState({
		email: ''
	});

	useState(() => {
		setState({ ...state, email });
		dispatch(setEmail(''));
		dispatch(setResumeFileName(''));
		dispatch(setTemplateFileName(''));
	}, [email]);

	return (
		<div className={classes.root}>
			{isFileUploadCompleted ? (
				<div>
					<FuseAnimateGroup
						className="flex flex-wrap"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						<Typography variant="h5" gutterBottom>
							{`Your recommendations have been sent to ${state.email}`}
						</Typography>
					</FuseAnimateGroup>
					<FuseAnimateGroup
						className="flex flex-wrap"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						{/* <div className="widget flex w-full sm:w-1/2 md:w-1/2 p-16" style={{marginBottom: 30}}>
							<Widget5 />
						</div> */}
					</FuseAnimateGroup>
				</div>
			) : (
				<div>
					<LinearProgressWithLabel value={progress} />
					<Typography variant="h5" gutterBottom>
						Processing your resumes & roles....
					</Typography>
				</div>
			)}
		</div>
	);
}

export default withReducer('projectDashboardApp', reducer)(Step2);
