import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import {useHistory} from 'react-router-dom'
import firebaseService from 'app/services/firebaseService';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getBusiness = createAsyncThunk(
	'profileApp/business/getBusiness',
	(params) =>
		new Promise((resolve, reject) => {
			
			var dbRef = firebaseService.db.ref(`business/${params.uid}/`);
			var business = [];
			dbRef.on('value', snapshot => { 
				const data = snapshot.val(); 

				if (data) {					
					business.push(data);				
				} 

				resolve(business);
			});
		})
);

export const saveBusiness = createAsyncThunk('profileApp/business/saveBusiness', async ( {form}, { dispatch, getState } ) => {
	const response = await axios.post('/api/profile-app/business/save', form);
	const data = await response.data;

	response = await axios.post('/api/profile-app/business/mysql/save', form);
	data = await response.data
	
	dispatch(showMessage({ message: 'Your data saved to database' }));
});

export const updateBusiness = createAsyncThunk('profileApp/business/updateBusiness', async ( {form, routeParams}, { dispatch, getState } ) => {
	const response = await axios.post('/api/profile-app/business/update', form);
	const data = await response.data;

	dispatch(getBusiness(routeParams));
});

const businessAdapter = createEntityAdapter({});

export const { selectAll: selectBusiness, selectById: selectBusinessById } = businessAdapter.getSelectors(
	state => state.profileApp.business
);

const businessSlice = createSlice({
	name: 'profileApp/business',
	initialState: businessAdapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[getBusiness.fulfilled]: businessAdapter.setAll,
	}
});

export default businessSlice.reducer;
