import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhoneNumber from 'material-ui-phone-number';
import { CountryRegionData } from 'react-country-region-selector';
import MenuItem from "@material-ui/core/MenuItem";
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '@fuse/core/formsy';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import withReducer from 'app/store/withReducer'; 
import { saveBusiness, getBusiness, selectBusiness } from './store/businessSlice';
import reducer from './store';
import { formatPhoneNumber, unformatPhoneNumber } from 'app/utils'
import { useHistory } from 'react-router';

const defaultFormState = {
	businessName: '',
	contactName: '',
	email: '',
	businessMailiingAddress1: '',
	businessMailiingAddress2: '',
	country: [],
	region: '',
	zipCode: '',
	phone: '',
	aadhar: '',
	panNumber: '',
	gstNumber: '',
};

function BusinessProfilePage(props) {
	const dispatch = useDispatch();
	const history = useHistory();

	const { form, handleChange, setForm } = useForm({});
	const formRef = useRef(null);
	const business = useSelector(selectBusiness); 
	const user = useSelector(({ auth }) => auth.user);
	const [isFormValid, setIsFormValid] = useState(false);	
	const [errorText, setErrorText] = useState('');
	const [saveFlag, setSaveFlag] = useState('insert');
	const [state, setState] = useState({
		phone: '',
		country: '',
		region: '',
	});

	useEffect(() => {
		dispatch(getBusiness({ uid: user.uid }));
	}, [dispatch]);

	useEffect(() => {
		if(business.length > 0) {	
			setSaveFlag('update');	
			setState({ 
				phone: formatPhoneNumber(business[0].data.phone), 
				country: business[0].data.country, 
				region: business[0].data.region,
			});
			setForm({ ...business[0].data });
		} else {
			setState({
				phone: '',
				country: '',
				region: ''
			});
			setForm(defaultFormState);
			setSaveFlag('insert');
		}
	}, [business]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) { 	
		const form = { 
			...model, 
			...state,
			phone: unformatPhoneNumber(state.phone),
			uid: user.uid,
			saveFlag: saveFlag, 
		};
		dispatch(saveBusiness({ form })).then(() => {
			history.push({ pathname: '/' })
		});
	}

	const getRegions = country => { 
		if (!country) {
		  return '';
		}
		return _.find(CountryRegionData, (item) => country ===  item[0])[2].split("|").map(regionPair => {
		  let [regionName, regionShortCode = null] = regionPair.split("~");
		  return regionName;
		});
	};

	const selectCountry = (e) => { 
		setState({ 
			...state, 
			country: e.target.value,
			region: '', 
		});
		setForm({ ...form, zipCode: '' });
	}

	const selectRegion = (e) => {
		setState({ 
			...state, 
			region: e.target.value 
		});
	}

	return (
		<>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={				
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex items-center">
							<FuseAnimate animation="transition.expandIn" delay={300}>
								<Icon className="text-32">shopping_basket</Icon>
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
									Provide Business Details
								</Typography>
							</FuseAnimate>
						</div>
					</div>
				}				
				content={
					<div className="p-16 sm:p-24 max-w-2xl">							
						<Formsy
							onValidSubmit={handleSubmit}
							onValid={enableButton}
							onInvalid={disableButton}
							ref={formRef}
							className="flex flex-col justify-center w-full"
						>			
							<TextFieldFormsy
								className="mb-16"
								type="text"
								name="businessName"
								label="Business Name"
								value={form.businessName}
								onChange={handleChange}
								// validations={{
								// 	minLength: 4
								// }}
								// validationErrors={{
								// 	minLength: 'Min character length is 4'
								// }}
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
								type="text"
								name="contactName"
								label="Contact Name"
								value={form.contactName}
								onChange={handleChange}
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
								type="text"
								name="email"
								label="Email"
								value={form.email}
								onChange={handleChange}
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
								type="text"
								name="businessMailiingAddress1"
								label="Business mailing address 1"
								value={form.businessMailiingAddress1}
								onChange={handleChange}								
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												home
											</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								required
							/>

							<TextFieldFormsy
								className="mb-16"
								type="text"
								name="businessMailiingAddress2"
								label="Business mailing address 2"
								value={form.businessMailiingAddress2}
								onChange={handleChange}								
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												home_work
											</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								// required
							/>
							
							<div className="flex -mx-4">
								<TextField
									className="mt-8 mb-16 mx-4"
									type="text"
									name="country"
									label="Country"
									value={state.country}
									onChange={(e) => {selectCountry(e)}}
									// validations={{
									// 	minLength: 4
									// }}
									// validationErrors={{
									// 	minLength: 'Min character length is 4'
									// }}								
									variant="outlined"
									// required						
									select
									fullWidth
								>
									{CountryRegionData.map((option, index) => ( 
										<MenuItem key={option[0]} value={option[0]}>
											{option[0]}
										</MenuItem>
									))}
								</TextField>

								{state.country==='United States' &&
									<TextField
										className="mt-8 mb-16 mx-4"
										type="text"
										name="region"
										label="State"
										value={state.region}
										onChange={(e) => {selectRegion(e)}}
										// validations={{
										// 	minLength: 4
										// }}
										// validationErrors={{
										// 	minLength: 'Min character length is 4'
										// }}										
										variant="outlined"
										// required						
										select
										fullWidth
									>
										{getRegions(state.country).map((option, index) => (
											<MenuItem key={option} value={option}>
												{option}
											</MenuItem>
										))}
									</TextField>
								}

								{state.country!=='United States' &&
									<TextFieldFormsy
										className="mt-8 mb-16 mx-4"
										type="text"
										name="state"
										label="State"
										value={state.region}
										onChange={(e) => {selectRegion(e)}}										
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Icon className="text-20" color="action">
														grain
													</Icon>
												</InputAdornment>
											)
										}}
										variant="outlined"
										required
										fullWidth
									/>
								}
							</div>								

							<div className="flex -mx-4">
								<TextFieldFormsy
									className="mt-8 mb-16 mx-4"
									type="text"
									name="zipCode"
									label="Zip Code"
									value={form.zipCode}
									onChange={handleChange}
									// validations={{
									// 	minLength: 4
									// }}
									// validationErrors={{
									// 	minLength: 'Min character length is 4'
									// }}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<Icon className="text-20" color="action">
													format_list_numbered
												</Icon>
											</InputAdornment>
										)
									}}
									variant="outlined"
									required
									fullWidth
								/>

								<PhoneNumber
									className="mt-8 mb-16 mx-4"
									// country={'us'}
									type="text"
									name="phone"
									label="Pnone Number"						
									value = {state.phone}
									onChange={(phone) => setState({ ... state, phone: phone })}
									// validations={{
									// 	minLength: 4
									// }}
									// validationErrors={{
									// 	minLength: 'Min character length is 4'
									// }}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<Icon className="text-20" color="action">
													phone
												</Icon>
											</InputAdornment>
										)
									}}
									variant="outlined"
									required
									fullWidth
								/>
							</div>				
							{state.country==='India' &&
								<>
									<TextFieldFormsy
										className="mb-16"
										type="text"
										name="aadhardCard"
										label="Aadhar Card"
										value={form.aadhardCard}
										onChange={handleChange}
										// validations={{
										// 	minLength: 4
										// }}
										// validationErrors={{
										// 	minLength: 'Min character length is 4'
										// }}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Icon className="text-20" color="action">
														credit_card
													</Icon>
												</InputAdornment>
											)
										}}
										variant="outlined"
										// required
										fullWidth
									/>

									<div className="flex -mx-4">
										<TextFieldFormsy
											className="mt-8 mb-16 mx-4"
											type="text"
											name="panNumber"
											label="Pan Number"		
											value={form.panNumber}
											onChange={handleChange}				
											// validations={{
											// 	minLength: 4
											// }}
											// validationErrors={{
											// 	minLength: 'Min character length is 4'
											// }}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<Icon className="text-20" color="action">
															domain_verification
														</Icon>
													</InputAdornment>
												)
											}}
											variant="outlined"
											// required
											fullWidth
										/>

										<TextFieldFormsy
											className="mt-8 mb-16 mx-4"
											type="text"
											name="gstNumber"
											label="GST Number"
											value={form.gstNumber}
											onChange={handleChange}
											// validations={{
											// 	minLength: 4
											// }}
											// validationErrors={{
											// 	minLength: 'Min character length is 4'
											// }}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<Icon className="text-20" color="action">
															confirmation_number
														</Icon>
													</InputAdornment>
												)
											}}
											variant="outlined"
											// required
											fullWidth
										/>	
									</div>	
								</>
							}

							<Button
								type="submit"
								variant="contained"
								color="primary"
								className="w-full mx-auto mt-16 normal-case"
								aria-label="REGISTER WITH FIREBASE"
								disabled={isFormValid && !errorText ? false : true}
							>
								Submit
							</Button>
						</Formsy>
					</div>	
				}
				innerScroll
			/>
		</>
	);
}

export default withReducer('profileApp', reducer)(BusinessProfilePage);
