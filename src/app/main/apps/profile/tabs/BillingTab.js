import React from 'react';
import CreditCard from '../card'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLIC_KEY_TEST, STRIPE_PUBLIC_KEY_LIVE } from 'app/utils'

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY_TEST);

function BillingDetailsTab(props) {	
	return (
		<div className="w-full">	
			<Elements stripe={stripePromise}>		
				<CreditCard />
			</Elements>
		</div>
	);
}

export default BillingDetailsTab;
