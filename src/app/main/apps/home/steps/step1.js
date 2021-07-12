import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { TextFieldFormsy } from '@fuse/core/formsy';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import withReducer from 'app/store/withReducer';
import Formsy from 'formsy-react';
import _ from '@lodash';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from '../store';
import { selectProjects, getProjects, setEmail, setIsFileUploadCompleted } from '../store/projectsSlice';
import { getWidgets, selectWidgets } from '../store/widgetsSlice';

import Widget3 from '../widgets/Widget3';
import Widget4 from '../widgets/Widget4';

function Step1(props) {
	const dispatch = useDispatch();
	const email = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects.email); 
	const widgets = useSelector(selectWidgets);
	const projects = useSelector(selectProjects);
	const formRef = useRef(null);

	useEffect(() => {
		dispatch(setIsFileUploadCompleted(false));
		dispatch(getWidgets());
		dispatch(getProjects());
	}, [dispatch]);
	
	const handleChange = async(e) => {
		dispatch(setEmail(e.target.value))
	}

	if (_.isEmpty(widgets) || _.isEmpty(projects)) {
		return null;
	}

	return (
		<div>
			<FuseAnimateGroup
				className="flex flex-wrap"
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
				style={{ justifyContent: 'center' }}
			>
				<div className="widget flex w-full sm:w-1/2 md:w-1/2 p-12">
					<Widget3 onStateChanged={props.onStateChanged} />
				</div>
				<div className="widget flex w-full sm:w-1/2 md:w-1/2 p-12">					
					<Widget4 onStateChanged={props.onStateChanged} />
				</div>
			</FuseAnimateGroup>
			<FuseAnimateGroup
				className="flex flex-wrap"
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
				style={{ justifyContent: 'center' }}
			>
				<div className="widget flex w-full sm:w-1 md:w-1/2 p-16" style={{ marginBottom: 30 }}>
					<Formsy ref={formRef} className="flex flex-col justify-center w-full">
						<Typography className='px-2 pb-5'>Enter your email to send recommendations</Typography>
						<TextFieldFormsy
							className="mb-16"
							type="email"
							name="email"
							label="Email"
							value={email}
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
					</Formsy>
				</div>
			</FuseAnimateGroup>
		</div>
	);
}

export default withReducer('projectDashboardApp', reducer)(Step1);
