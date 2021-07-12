import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import { updateUserSettingsFirebase } from './userSlice';
import axios from 'axios';

export const submitUpdate = model => async dispatch => { 
	return new Promise((resolve, reject) => {
		axios.post('/api/auth/user/update', {
			uid: firebaseService.auth.currentUser.uid,
			...model
		}).then(response => {
			if (response.data) {
				// this.setSession(response.data.access_token);
				resolve(response.data);
			} else {
				reject(response.data.error);
			}
		});
	});
};

export const updateWithFirebase = model => async dispatch => {
	if (!firebaseService.auth) {
		console.warn("Firebase Service didn't initialize, check your configuration");

		return () => false;
	} 
	const { displayName, profile, promoCode } = model;

	dispatch(updateUserSettingsFirebase({
		displayName,
		profile,
		promoCode,
	}));

	return dispatch(updateSuccess());
};

const initialState = {
	success: false,
	error: {
		username: null,
		password: null
	}
};

const updateSlice = createSlice({
	name: 'auth/update',
	initialState,
	reducers: {
		updateSuccess: (state, action) => {
			state.success = true;			
		},
		updateError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { updateSuccess, updateError } = updateSlice.actions;

export default updateSlice.reducer;
