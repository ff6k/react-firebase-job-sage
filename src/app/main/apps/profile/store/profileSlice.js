import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import {useHistory} from 'react-router-dom'
import firebaseService from 'app/services/firebaseService';

const profileAdapter = createEntityAdapter({});

export const { selectAll: selectBusiness, selectById: selectBusinessById } = profileAdapter.getSelectors(
	state => state.profileApp.profile
);

const profileSlice = createSlice({
	name: 'profileApp/profile',
	initialState: profileAdapter.getInitialState({
		activeStep: 0,		
	}),
	reducers: {
		setActiveStep: {
			reducer: (state, action) => {
				state.activeStep = action.payload;
			},
		},		
	},
	extraReducers: {}
});

export const { setActiveStep } = profileSlice.actions;

export default profileSlice.reducer;
