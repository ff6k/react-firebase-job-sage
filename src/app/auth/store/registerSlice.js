import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import { createUserSettingsFirebase } from './userSlice';
import axios from 'axios';

export const submitRegister = model => async dispatch => {
	return new Promise((resolve, reject) => {
		axios.post('/api/auth/register', {
			uid: firebaseService.auth.currentUser.uid,
			...model
		}).then(response => {
			if (response.data.user) {
				// this.setSession(response.data.access_token);
				resolve(response.data.user);
			} else {
				reject(response.data.error);
			}
		});
	});
};

export const registerWithFirebase = model => async dispatch => {
	if (!firebaseService.auth) {
		console.warn("Firebase Service didn't initialize, check your configuration");

		return () => false;
	}	
	const { email, password, displayName, profile } = model;

	return firebaseService.auth
		.createUserWithEmailAndPassword(email, password)
		.then(response => { 
			response.user.sendEmailVerification();			
			dispatch(
				createUserSettingsFirebase({
					...response.user,
					displayName,
					email,
					profile,
				})
			);
			
			return dispatch(registerSuccess());				
		})
		.catch(error => {
			const usernameErrorCodes = ['auth/operation-not-allowed', 'auth/user-not-found', 'auth/user-disabled'];

			const emailErrorCodes = ['auth/email-already-in-use', 'auth/invalid-email'];

			const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

			const response = {
				email: emailErrorCodes.includes(error.code) ? error.message : null,
				displayName: usernameErrorCodes.includes(error.code) ? error.message : null,
				password: passwordErrorCodes.includes(error.code) ? error.message : null
			};

			if (error.code === 'auth/invalid-api-key') {
				dispatch(showMessage({ message: error.message }));
			}

			return dispatch(registerError(response));
		});
};

const initialState = {
	success: false,
	error: {
		username: null,
		password: null
	}
};

const registerSlice = createSlice({
	name: 'auth/register',
	initialState,
	reducers: {
		registerSuccess: (state, action) => {
			state.success = true;
		},
		registerError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		},		
	},
	extraReducers: {}
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
