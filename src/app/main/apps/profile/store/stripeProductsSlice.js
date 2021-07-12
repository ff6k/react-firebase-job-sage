import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import firebaseService from 'app/services/firebaseService';

export const getStripeProducts = createAsyncThunk('profileApp/stripeProduct', params => 
	new Promise((resolve, reject) => {
		
		var dbRef = firebaseService.db.ref(`stripeProducts/`);
		var stripeProducts = []; 
		dbRef.on('value', snapshot => { 
			const data = snapshot.val();

			if(data) {
				Object.keys(data).map(key => {
					stripeProducts.push(data[key]);
				});
			} else {
				resolve(stripeProducts)
			}
						
			resolve(stripeProducts);
		});
	})		
);	

export const saveStripeProduct = createAsyncThunk('profileApp/stripeProduct/save', async (params, { dispatch, getState } ) => { 
	const response = await axios.post('/api/profile-app/stripeProduct/save', params);
	const data = await response.data;
	
	return data;
});

export const deleteStripeProduct = createAsyncThunk('profileApp/stripeProduct/delete', async (params, { dispatch, getState } ) => { 
	const response = await axios.post('/api/profile-app/stripeProduct/delete', params);
	const data = await response.data;
	
	return dispatch(getStripeProducts({ uid: params.uid }));
});

const stripeProductsAdapter = createEntityAdapter({});

export const { selectAll: selectStripeProducts, selectById: selectStripeProductsById } = stripeProductsAdapter.getSelectors(
	state => state.profileApp.stripeProducts
);

const stripeProductsSlice = createSlice({
	name: 'profileApp/stripeProducts',
	initialState: stripeProductsAdapter.getInitialState({
		stripe: {
			productId: '',
			planId: '',
		},
	}),
	reducers: {
		setStripe: {
			reducer: (state, action) => {
				state.stripe = action.payload;
			},
		},
	},
	extraReducers: {
		[getStripeProducts.fulfilled]: stripeProductsAdapter.setAll,
	}
});

export const { setStripe } = stripeProductsSlice.actions;

export default stripeProductsSlice.reducer;
