import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import firebaseService from 'app/services/firebaseService';

export const getStripePlan = createAsyncThunk('profileApp/stripePlan', params => 
	new Promise((resolve, reject) => {
		
		var dbRef = firebaseService.db.ref(`stripePlans/${params.uid}/`);
		var stripePlans = []; 
		dbRef.on('value', snapshot => { 
			const data = snapshot.val();

			if(data) {
				Object.keys(data).map(key => {
					stripePlans.push(data[key]);
				});
			} else {
				resolve(stripePlans)
			}
						
			resolve(stripePlans);
		});
	})		
);	

export const saveStripePlan = createAsyncThunk('profileApp/stripePlan/save', async (params, { dispatch, getState } ) => { 
	const response = await axios.post('/api/profile-app/stripePlan/save', params);
	const data = await response.data;
	
	return dispatch(getStripePlan(params));
});

export const deleteStripePlan = createAsyncThunk('profileApp/stripePlan/delete', async (params, { dispatch, getState } ) => { 
	const response = await axios.post('/api/profile-app/stripePlan/delete', params);
	const data = await response.data;
	
	return dispatch(getStripePlan({ uid: params.uid }));
});

const stripePlansAdapter = createEntityAdapter({});

export const { selectAll: selectStripePlans, selectById: selectStripePlansById } = stripePlansAdapter.getSelectors(
	state => state.profileApp.stripePlans
);

const stripePlansSlice = createSlice({
	name: 'profileApp/stripePlans',
	initialState: stripePlansAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getStripePlan.fulfilled]: stripePlansAdapter.setAll,
	}
});

export const {} = stripePlansSlice.actions;

export default stripePlansSlice.reducer;
