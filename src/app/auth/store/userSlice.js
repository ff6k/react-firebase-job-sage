import { createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import history from '@history';
import _ from '@lodash';
import { setInitialSettings, setDefaultSettings } from 'app/store/fuse/settingsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';

export const setUserDataFirebase = (user, authUser) => async dispatch => {
	if (
		user &&
		user.data &&
		user.data.settings &&
		user.data.settings.theme &&
		user.data.settings.layout &&
		user.data.settings.layout.style
	) { 
		// Set user data but do not update
		return dispatch(setUserData({ ...user, data: { ...user.data, emailVerified: authUser.emailVerified } }));
	}

	// Create missing user settings
	return dispatch(createUserSettingsFirebase(authUser));
};

export const createUserSettingsFirebase = authUser => async (dispatch, getState) => { 
	const guestUser = getState().auth.user;
	const fuseDefaultSettings = getState().fuse.settings.defaults;
	const { currentUser } = firebase.auth();
	
	var storage = firebase.storage();
	var storageRef = storage.ref(); 
	if (authUser.profile) { 
		var uploadTask = storageRef.child('Photos/' + authUser.profile.name).put(authUser.profile);
		
		uploadTask.on(
			firebase.storage.TaskEvent.STATE_CHANGED,
			snapshot => {},
			error => {
				throw error;
			},
			() => { 
				uploadTask.snapshot.ref.getDownloadURL().then(url => {
					const user = _.merge({}, guestUser, {
						uid: authUser.uid,
						from: 'firebase',
						role: ['admin'],
						data: {
							displayName: authUser.displayName,
							email: authUser.email,
							emailVerified: false,
							photoURL: url,
							settings: { ...fuseDefaultSettings }
						}
					});
					currentUser.updateProfile(user.data);

					dispatch(updateUserData(user));

					return dispatch(setUserData(user));
				});
			}
		);
	} else {
		const user = _.merge({}, guestUser, {
			uid: authUser.uid,
			from: 'firebase',
			role: ['admin'],
			data: {
				displayName: authUser.displayName,
				email: authUser.email,
				emailVerified: false,
				photoURL: '',
				settings: { ...fuseDefaultSettings }
			}
		});
		currentUser.updateProfile(user.data);

		dispatch(updateUserData(user));

		return dispatch(setUserData(user));
	}
};

export const updateUserSettingsFirebase = authUser => async (dispatch, getState) => {
	const guestUser = getState().auth.user;
	const fuseDefaultSettings = getState().fuse.settings.defaults;
	const { currentUser } = firebase.auth();

	var storage = firebase.storage();
	var storageRef = storage.ref();
	if (authUser.profile) { 
		var uploadTask = storageRef.child('Photos/' + authUser.profile.name).put(authUser.profile);

		uploadTask.on(
			firebase.storage.TaskEvent.STATE_CHANGED,
			snapshot => {},
			error => {
				throw error;
			},
			() => {
				uploadTask.snapshot.ref.getDownloadURL().then(url => {
					const user = _.merge({}, guestUser, {
						uid: authUser.uid,
						from: 'firebase',
						role: ['admin'],
						data: {
							displayName: authUser.displayName,
							email: authUser.email,
							photoURL: url,
							promoCode: authUser.promoCode,
							emailVerified: authUser.emailVerified,
							settings: { ...fuseDefaultSettings }
						}
					});
					currentUser.updateProfile(user.data);

					dispatch(updateUserData(user));

					return dispatch(setUserData(user));
				});
			}
		);
	} else { 
		const user = _.merge({}, guestUser, {
			uid: authUser.uid,
			from: 'firebase',
			role: ['admin'],
			data: {
				displayName: authUser.displayName,
				email: authUser.email,
				promoCode: authUser.promoCode,
				emailVerified: authUser.emailVerified,
				settings: { ...fuseDefaultSettings }
			}
		});
		currentUser.updateProfile(user.data);

		dispatch(updateUserData(user));

		return dispatch(setUserData(user));
	}
};

export const setUserData = user => async (dispatch, getState) => {
	/*
		You can redirect the logged-in user to a specific route depending on his role
			*/

	history.location.state = {
		redirectUrl: user.data.emailVerified ? user.redirectUrl : '/mail-confirm' // for example 'apps/academy'
	};

	/*
    Set User Settings
     */
	dispatch(setDefaultSettings(user.data.settings));
	
	dispatch(setUser(user));
};

export const updateUserSettings = settings => async (dispatch, getState) => {
	const oldUser = getState().auth.user;
	const user = _.merge({}, oldUser, { data: { settings } });

	dispatch(updateUserData(user));

	return dispatch(setUserData(user));
};

export const updateUserShortcuts = shortcuts => async (dispatch, getState) => {
	const { user } = getState().auth;
	const newUser = {
		...user,
		data: {
			...user.data,
			shortcuts
		}
	};

	dispatch(updateUserData(user));

	return dispatch(setUserData(newUser));
};

export const logoutUser = () => async (dispatch, getState) => {
	const { user } = getState().auth;

	if (!user.role || user.role.length === 0) {
		// is guest
		return null;
	}

	history.push({
		pathname: '/'
	});

	switch (user.from) {
		case 'firebase': {
			localStorage.clear();
			firebaseService.signOut();
			break;
		}		
	}

	dispatch(setInitialSettings());

	return dispatch(userLoggedOut());
};

export const updateUserData = user => async (dispatch, getState) => {
	if (!user.role || user.role.length === 0) {
		// is guest
		return;
	} 
	switch (user.from) {
		case 'firebase': {
			firebaseService
				.updateUserData(user)
				.then(() => {
					// dispatch(showMessage({ message: 'Profile updated' }));
				})
				.catch(error => {
					dispatch(showMessage({ message: error.message }));
				});
			break;
		}	
	}
};

const initialState = {
	role: [], // guest
	data: {
		displayName: '',
		photoURL: '',
		email: '',
		promoCode: '',
		emailVerified: false,
		shortcuts: [],
	}
};

const userSlice = createSlice({
	name: 'auth/user',
	initialState,
	reducers: {
		setUser: (state, action) => action.payload,
		userLoggedOut: (state, action) => initialState
	},
	extraReducers: {}
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
