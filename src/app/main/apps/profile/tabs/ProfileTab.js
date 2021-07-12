import { TextFieldFormsy } from '@fuse/core/formsy';
import FuseLoading from '@fuse/core/FuseLoading';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import Formsy from 'formsy-react';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { updateWithFirebase, submitUpdate } from 'app/auth/store/updateSlice';
import { saveStripePlan } from '../store/stripePlansSlice';
import { useForm } from '@fuse/hooks';
import axios from 'axios';
import _ from '@lodash';
import { FIREBASE_FUNCTION_API_ENDPOINT, API_URL } from 'app/fuse-configs/endpointConfig';
import { showMessage } from 'app/store/fuse/messageSlice';
import { saveStripeProduct, setStripe } from '../store/stripeProductsSlice';
import { getSubscription, saveSubscription, selectSubscriptions, createSubscription1 } from "../store/subscriptionsSlice";

import history from '@history';

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

function FirebaseUpdateTab(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const user = useSelector(({ auth }) => auth.user); 
	const subscription = useSelector(selectSubscriptions); 
	const stripe = useSelector(({ profileApp }) => profileApp.stripeProducts.stripe);
	const { form, handleChange, setForm } = useForm({ ...user.data, promoCode: user.data.hasOwnProperty('promoCode') ? user.data.promoCode : '' });
	const [profileImg, setProfileImgData] = useState('');
	const [profileObject, setProfileObject] = useState();
	const [isFormValid, setIsFormValid] = useState(false);
	const [loading, setLoading] = useState(true);
	const formRef = useRef(null);
	let isValidPromoCode = false;

	useEffect(() => {	
		dispatch(getSubscription({ uid: user.uid })).then(
			axios.post(`${FIREBASE_FUNCTION_API_ENDPOINT}/getProducts`, {}).then((response) => {
				const products = response.data.data;
				let product  = _.find(products, { name: 'JobSageSai' });

				if(!product) { 

					/*
						create a stripe product named 'Jobsage' to stipe
					**/
					axios.post(`${FIREBASE_FUNCTION_API_ENDPOINT}/createProduct`, { name: 'JobSageSai', }).then((res) => {
						product = res.data;
						dispatch(setStripe({ ...stripe, productId: product.id, planId: '' }));


						/*
							save a stripe product to firebase realtime database
						**/
						dispatch(saveStripeProduct(product)).then(() => {
							setLoading(false);
						});								
					})
				} else { 

					/*
					get a whole stripe plans from stipe
					**/
					axios.post(`${FIREBASE_FUNCTION_API_ENDPOINT}/getPlans`, {}).then(response => {
						const plans = response.data.data; 
				
						/*
						check if a stripe plan with the indicated promoCode exist 
						**/
						const plan = _.find(plans, { nickname: user.data.promoCode, product: product.id });
						if(plan) {
							dispatch(setStripe({ ...stripe, productId: product.id, planId: plan.id }));
						} else {
							dispatch(setStripe({ ...stripe, productId: product.id, planId: '' }));
						}
						
						setLoading(false);	
					}).catch((err) => {
						showMessage({ message: err });
						setLoading(false);
					});  				
				}
			})	
		);			
	}, [dispatch]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);			
	}

	async function handleSubmit(model) { 	
		setLoading(true);	

		if (profileObject) 
			model["profile"] = profileObject;
		else 
			model["profile"] = ''; 

		let promoData = {
			billing_amt: '', 
			month_or_year_ind: '', 
			start_dt: '', 
			end_dt: ''
		};

		if(form.promoCode) {
			await axios.get(`${API_URL}/promo/${form.promoCode}`).then(response => {		
				promoData = { ...promoData, ...response.data };
				isValidPromoCode = true;			
			}).catch(() => {
				dispatch(showMessage({ 
					message: 'Please enter a valid promotion code', 
					variant: 'warning' 
				}));
			});

			if(!isValidPromoCode) {
				setLoading(false);
				return;
			}				
		}	
		
		dispatch(updateWithFirebase(model)).then(() => { 
			dispatch(submitUpdate(model)).then(() => {
				if(form.promoCode) { 

					/*
						get a whole stripe plans from stipe
					**/
					axios.post(`${FIREBASE_FUNCTION_API_ENDPOINT}/getPlans`, {}).then(response => {
						const plans = response.data.data; 

						/*
							check if a stripe plan with the indicated promoCode exist 
						**/
						let plan = _.find(plans, { nickname: form.promoCode, product: stripe.productId });
						if(!plan) {

							/*
								create a stripe plan to stipe
							**/
							axios.post(`${FIREBASE_FUNCTION_API_ENDPOINT}/createPrice`, {
								nickname: form.promoCode,
								amount: promoData.billing_amt * 100,
								currency: 'USD',
								month: promoData.month_or_year_ind==='M' ? 'month' : 'year',
								productId: stripe.productId,
								startDate: promoData.start_dt,
								endDate: promoData.end_dt,
							}).then((planRes) => {
								plan = planRes.data;
								
								/*
									save a stripe plan to firebase realtime database
								**/
								dispatch(saveStripePlan({ uid: user.uid, data: planRes.data })).then(() => {
									dispatch(setStripe({ ...stripe, planId: plan.id }));
									if(subscription.length === 0) {
										dispatch(createSubscription1({ user, stripe: { ...stripe, planId: plan.id } })).then((res) => {
											const response = res.payload;
			
											/*
												update a subscription data with firebase
											**/
											dispatch(saveSubscription({ uid: user.uid, data: response.data })).then(() => {
												history.push({ pathname: '/pages/profile/billing' });
											});   								
										});
									} else {
										history.push({ pathname: '/pages/profile/billing' });
									}
								});								
							}).catch(() => {								
								showMessage({ message: 'Failed to create a new plan on Stripe' });
								setLoading(false)
							});
						} else {					
							dispatch(setStripe({ ...stripe, planId: plan.id }));
							if(subscription.length === 0) {
								dispatch(createSubscription1({ user, stripe: { ...stripe, planId: plan.id } })).then((res) => {
									const response = res.payload;
	
									/*
										update a subscription data with firebase
									**/
									dispatch(saveSubscription({ uid: user.uid, data: response.data })).then(() => {
										history.push({ pathname: '/pages/profile/billing' });
									});   								
								});
							} else {
								history.push({ pathname: '/pages/profile/billing' });
							}
						}					
					}).catch(() => {
						showMessage({ message: 'Failed to connect on Stripe' });
						setLoading(false);
					});
				} else {
					setLoading(false);
				}
								
			}).catch((err) => {
				dispatch(showMessage({ message: err }));
				setLoading(false);
			})			
		}).catch((err) => {
			dispatch(showMessage({ message: err }));
			setLoading(false);
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

	if (loading) {
		return <FuseLoading />;
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
					<Avatar className="w-96 h-96" src={profileImg ? `data:image/png;base64,${profileImg}` : `${form.photoURL}`} />
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
					</div>
				</div>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="displayName"
					label="Display name"
					value={form.displayName}
					onChange={handleChange}
					validations={{
						minLength: 4
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
					type="text"
					name="promoCode"
					label="Promo Code"
					value={form.promoCode}
					onChange={handleChange}					
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									vpn_lock
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					// required
				/>
			
				<div className="flex flex-col items-center justify-center pb-32">
					<Typography>
						<span className="font-medium mr-8">Reach out to</span>
						<a className="font-medium mr-8" href='mailto:arvind@jobsage.app'>Arvind@jobsage.app</a>  
						<span className="font-medium">for your promo code</span>		
					</Typography>				
				</div>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="UPDATE WITH FIREBASE"
					disabled={!isFormValid}
				>
					Update
				</Button>
			</Formsy>
		</div>
	);
}

export default FirebaseUpdateTab;
