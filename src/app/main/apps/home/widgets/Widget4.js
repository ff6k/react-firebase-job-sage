import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ToolTip from '@material-ui/core/ToolTip';
import { setTemplateFileName } from '../store/projectsSlice';
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

function Widget4(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const templateFileName = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.templateFileName.name);

	const handleChange = (e) => {
		const ext = getFilenameAndExtension(e.target.value)[1];
		const file = e.target.files[0];
		if(ext==='xlsx' || ext==='xls') {
			dispatch(setTemplateFileName(file));
			return;
		}
		
		dispatch(showMessage({ message: 'You can upload only *.xlsx, *.xls file.', variant: 'warning' }));
		return false;		
	}

	return (
		<Paper className="w-full rounded-8 shadow">
			<div className="flex items-center px-16 h-52 border-b-1">
				<Typography className="text-15 flex w-full" color="black">
					<span className="truncate mr-8">{`Upload your role descriptions using template given`}</span>
					<Link 
						onClick={() => { 
							window.location.href = 
								`https://firebasestorage.googleapis.com/v0/b/jobsage-sai-ui-firebase-001.appspot.com/o/Roles%2FRoles_template.xlsx?alt=media&token=d7d043b3-a9d8-4c18-a355-d771c46c895a`; 
						}}>
						here...
					</Link>
				</Typography>
				
			</div>

			{templateFileName && 
				<div className="flex items-center px-16 h-52 border-b-1">
					<Typography className="text-15 flex w-full" color="black">
						<span className="truncate">{`${templateFileName}`}</span>
					</Typography>
				</div>
			}

			<div className="text-center pt-12 pb-28">
				<div className={classes.root}>
					<input 
						accept=".xls, .xlsx" 
						className={classes.input} 
						id="contained-button-template-file" 
						multiple 
						type="file" 
						onChange={(e) => {handleChange(e)}} 
					/>
					<label htmlFor="contained-button-template-file">
						<ToolTip title={`Maximum number of roles which can be uploaded is 100. Please upload appropriately`}>
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

export default React.memo(Widget4);
