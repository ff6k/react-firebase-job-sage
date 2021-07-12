import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import firebaseService from 'app/services/firebaseService';

export const getCreditCard = createAsyncThunk('profileApp/creditCard', params => 
	new Promise((resolve, reject) => {
		
		var dbRef = firebaseService.db.ref(`credit/${params.uid}/`);
		var creditCard = []; 
		dbRef.on('value', snapshot => {
			const data = snapshot.val();

			if (data) {					
				creditCard.push(data);				
			}

			resolve(creditCard);
		});
	})		
);	

export const saveCreditCard = createAsyncThunk('profileApp/creditCard/save', async (form, { dispatch, getState } ) => { 
	const response = await axios.post('/api/profile-app/creditCard/save', form);
	const data = await response.data;
	
	return dispatch(getCreditCard({ uid: form.uid }));
});

const creditCardAdapter = createEntityAdapter({});

export const { selectAll: selectCreditCard, selectById: selectCreditCardById } = creditCardAdapter.getSelectors(
	state => state.profileApp.creditCard
);

const creditCardSlice = createSlice({
	name: 'profileApp/creditCard',
	initialState: creditCardAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getCreditCard.fulfilled]: creditCardAdapter.setAll,
	}
});

export const { setActiveStep } = creditCardSlice.actions;

export default creditCardSlice.reducer;
