import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import firebaseService from 'app/services/firebaseService';
import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

import { setUserDataFirebase, setUserData, logoutUser } from './store/userSlice';
import { setEmail, setResumeFileName, setTemplateFileName } from 'app/main/apps/home/store/projectsSlice';
import { setActiveStep } from 'app/main/apps/profile/store/profileSlice';

import { API_URL } from 'app/fuse-configs/endpointConfig';
import axios from 'axios';
import history from '@history'

class Auth extends Component {
	state = {
		waitAuthCheck: true
	};

	componentDidMount() {
		return Promise.all([
			this.firebaseCheck(),			
		]).then(() => {
			this.setState({ waitAuthCheck: false });
		});
	}

	firebaseCheck = () =>
		new Promise(resolve => {
			firebaseService.init(success => {
				if (!success) {
					resolve();
				}
			});

			firebaseService.onAuthStateChanged(authUser => { 	
				if (authUser) {
					this.props.setEmail('');
					this.props.setResumeFileName('');
					this.props.setTemplateFileName('');	
					this.props.setActiveStep(0);				
					this.props.showMessage({ message: 'Logging in' });

					/**
					 * Retrieve user data from Firebase
					 */
					firebaseService.getUserData(authUser.uid).then(
						user => {
							this.props.setUserDataFirebase(user, authUser);

							resolve();
							
							// if(!authUser.emailVerified) {
							// 	history.push({ pathname: '/mail-confirm' });
							// 	return;
							// }

							if(authUser.emailVerified) {
								axios.get(`${API_URL}/trigerlogin/${authUser.uid}/`).then((response) => {
									console.log('response.data');
								});

								this.props.showMessage({ message: 'Logged in' });
							} else {
								this.props.showMessage({ message: 'Please verify your email' });
							}
						},						
					);
				} else {
					resolve();
				}
			});

			return Promise.resolve();
		});

	render() {
		return this.state.waitAuthCheck ? <FuseSplashScreen /> : <>{this.props.children}</>;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logout: logoutUser,
			setUserData,
			setUserDataFirebase,
			showMessage,
			hideMessage,
			setEmail, 
			setResumeFileName,
			setTemplateFileName,
			setActiveStep,
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(Auth);
