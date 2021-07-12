import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseLoading from '@fuse/core/FuseLoading';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import React, { useState, useEffect, useRef } from 'react';
import reducer from './store';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Widget1 from './widgets/Widget1';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, selectFiles } from './store/filesSlice';
import axios from 'axios';
import 'firebase/auth';
import 'firebase/storage';
import { downloadURL, file_downloads } from 'app/utils';
import { API_URL } from 'app/fuse-configs/endpointConfig';

const TMY = {
	T: [ 'Trial', 'Trial' ],
	M: [ 'Month to Date', 'Monthly' ],
	Y: [ 'Year to Date', 'Yearly' ]
};

let w = {
	widget1: {
		currentRange: 'requirements',
		id: 'widget1',
		label: 'Roles Processed',
		value: '0',
		des: ''
	},
	widget2: {
		currentRange: 'resumes',
		id: 'widget2',
		label: 'Roles Quota Available',
		value: '0',
		des: ''
	},
	widget3: {
		currentRange: 'requirements',
		id: 'widget3',
		label: 'Resumes Processed',
		value: '0',
		des: ''
	},
	widget4: {
		currentRange: 'resumes',
		id: 'widget4',
		label: 'Resumes Quota Available',
		value: '0',
		des: ''
	}
};

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
	},
	paper: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		'& > *': {
			padding: theme.spacing(3),
		},
		paddingBottom: 12
	},
	calendar: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		'& > *': {
			marginTop: theme.spacing(1),
			padding: theme.spacing(2)
		}
	}
}));

const DashboardApp = props => {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const [widgets, setWidgets] = useState(w);
	const user = useSelector(({ auth }) => auth.user);
	const files = useSelector(selectFiles); 
	const [fromDate, setFromDate] = useState(moment().date(1));
	const [toDate, setToDate] = useState(moment()); 
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.put(`${API_URL}/dashboard/${user.data.email}`).then((response) => {
			const data = response.data; 
			w = {
				...w, widget1: {
					...w.widget1,
					value: data.roles_processed ? data.roles_processed : 0,
					des: TMY[data.flag][0]
				}
			};
			w = {
				...w, widget2: {
					...widgets.widget2,
					value: data.roles_quota_available ? data.roles_quota_available : 0,
					des: TMY[data.flag][1] 
				}
			};
			w = {
				...w, widget3: {
					...w.widget3,
					value: data.resumes_processed ? data.resumes_processed : 0,
					des: TMY[data.flag][0] 
				}
			};
			w = {
				...w, widget4: {
					...w.widget4,
					value: data.resumes_quota_available ? data.resumes_quota_available : 0,
					des: TMY[data.flag][1] 
				}
			};

			setLoading(false);
			setWidgets(w);
		});
	}, [user]);

	useEffect(() => {
		if(toDate && fromDate) { 
			dispatch(getFiles({
				 uid: user.uid, 
				 toDate: moment(toDate).format('x'), 
				 fromDate: moment(fromDate).format('x') 
			}));
		}
	}, [toDate, fromDate]);

	const handleFromDateChange = date => {
		if(date > toDate) {
			dispatch(showMessage({ message: 'Please select correct date.', variant: 'warning' }));
			return;
		}
		setFromDate(date);
	};

	const handleToDateChange = date => {
		if(date < fromDate) {
			dispatch(showMessage({ message: 'Please select correct date.', variant: 'warning' }));
			return;
		} else if(date > moment()) {
			dispatch(showMessage({ message: 'Please select correct date.', variant: 'warning' }));
			return;
		}
		setToDate(date);
	};

	const handleDownload = () => { 
		// downloadFiles(files);
		const urls = [];
		files.map(f => {		
			// downloadURL(f.resumeFileDownloadURL, `${user.data.email}_${f.timestamp}_${f.resumeFileName}`);
			// downloadURL(f.templateFileDownloadURL, `${user.data.email}_${f.timestamp}_${f.templateFileName}`);	
			urls.push(f.resumeFileDownloadURL);
			urls.push(f.templateFileDownloadURL);
		}); console.log('===============================', urls)
		file_downloads(urls)
	}

	if(loading) {
		return <FuseLoading />
	}
	  
	return (
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
				<div className='p-12'>
					<FuseAnimateGroup
						className="flex flex-wrap"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
							<Widget1 widget={widgets.widget1} />
						</div>
						<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
							<Widget1 widget={widgets.widget2} />
						</div>
						<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
							<Widget1 widget={widgets.widget3} />
						</div>
						<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
							<Widget1 widget={widgets.widget4} />
						</div>
					</FuseAnimateGroup>
					<FuseAnimateGroup
						className="flex flex-wrap p-12"
						style={{ display: 'flex', flexDirection: 'column' }}
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						<div className={classes.paper}>
							<Paper elevation={1}>
								<Typography>Your previous recommendations are available to download here</Typography>
							</Paper>
						</div>
						<div className={classes.calendar}>
							<Paper>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<div className="text-center pt-12 pb-28">
										<KeyboardDatePicker
											disableToolbar
											variant="inline"
											format="MM/dd/yyyy"
											margin="normal"
											id="date-picker-inline"
											label="Date picker inline"
											value={fromDate}
											onChange={handleFromDateChange}
											KeyboardButtonProps={{
												'aria-label': 'change date'
											}}
											style={{ padding: 5 }}
										/>
										<KeyboardDatePicker
											disableToolbar
											variant="inline"
											format="MM/dd/yyyy"
											margin="normal"
											id="date-picker-inline"
											label="To date"
											value={toDate}
											onChange={handleToDateChange}
											KeyboardButtonProps={{
												'aria-label': 'change date'
											}}
											style={{ padding: 5 }}
										/>
									</div>
								</MuiPickersUtilsProvider>
							</Paper>
						</div>
					</FuseAnimateGroup>
					<FuseAnimateGroup>
						<div className="text-center pt-12 pb-28">
							<Typography className="text-15" color="textSecondary">
								<Button variant="contained" size="large" startIcon={<SaveIcon />} onClick={handleDownload} >
									Download
								</Button>
							</Typography>
						</div>
					</FuseAnimateGroup>
				</div>
			}
			ref={pageLayout}
		/>
	);
};

export default withReducer('dashboardApp', reducer)(DashboardApp);
