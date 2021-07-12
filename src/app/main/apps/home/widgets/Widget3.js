import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ToolTip from '@material-ui/core/ToolTip';
import { setResumeFileName } from '../store/projectsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import { getFilenameAndExtension } from 'app/utils';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
		}
	},
	input: {
		display: 'none'
	}
}));

function Widget3(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const resumeFileName = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.resumeFileName.name); 	

	const handleChange = (e) => { 
		const ext = getFilenameAndExtension(e.target.value)[1];
		const file = e.target.files[0];
		if(ext==='zip' || ext==='rar') {
			dispatch(setResumeFileName(file));
			return;
		}
		
		dispatch(showMessage({ message: 'You can upload only *.zip file.', variant: 'warning' }));
		return false;		
	}

	return (
		<Paper className="w-full rounded-8 shadow">
			<div className="flex items-center px-16 h-52 border-b-1">
				<Typography className="text-15 flex w-full" color="black">
					<span className="truncate">{`Zip your resume & upload it here`}</span>
				</Typography>
			</div>
			
			{resumeFileName && 
				<div className="flex items-center px-16 h-52 border-b-1">
					<Typography className="text-15 flex w-full" color="black">
						<span className="truncate">{`${resumeFileName}`}</span>
					</Typography>
				</div>
			}
			
			<div className="text-center pt-12 pb-28">
				<div className={classes.root}>
					<input 
						accept=".zip" 
						className={classes.input} 
						id="contained-button-resume-file" 
						multiple 
						type="file" 
						onChange={e => handleChange(e)}
					/>
					<label htmlFor="contained-button-resume-file">
					<ToolTip title={`Upload your resumes as .zip file`}>										
						<Button variant="contained" color="primary" startIcon={<CloudUploadIcon />} component="span">
							Upload
						</Button>
					</ToolTip>	
					</label>
				</div>
			</div>
		</Paper>
	);
}

export default React.memo(Widget3);
