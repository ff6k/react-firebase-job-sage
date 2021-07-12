import { combineReducers } from '@reduxjs/toolkit';
import business from './businessSlice';
import profile from './profileSlice';
import creditCard from './creditCardSlice';
import subscriptions from './subscriptionsSlice';
import stripePlans from './stripePlansSlice';
import stripeProducts from './stripeProductsSlice';

const reducer = combineReducers({
	business,	
	profile,
	creditCard,	
	subscriptions,
	stripePlans,
	stripeProducts,
});

export default reducer;
