import mock from '../mock';
import firebaseService from 'app/services/firebaseService';
import axios from 'axios';
import { API_URL } from 'app/fuse-configs/endpointConfig';

const profileDB = {};

mock.onPost('/api/profile-app/business/save').reply(request => {
	const data = JSON.parse(request.data); 
	firebaseService.db.ref(`business/${data.uid}/`).set({
		data: data,
		id: data.uid
	});

	return [200, data];
});

mock.onPost('/api/profile-app/business/mysql/save').reply(request => {
	const params = JSON.parse(request.data); 
	const saveFlag = params.saveFlag;
	const data = { 
		uid: params.uid,
		user_email: params.email,
		Contact_name: params.contactName,
		Bus_name: params.businessName,
		Bus_Addr1: params.businessMailiingAddress1,
		Bus_Addr2: params.businessMailiingAddress2,
		Bus_State: params.region,
		Bus_cntry: params.country,
		Bus_city_nm: '',
		Bus_Zip: params.zipCode,
		Bus_phone: 123456,
		Aadhar_card: params.aadhardCard,
		PAN_NO: params.panNumber,
		GST_NO: params.gstNumber,
		TIN_NO: '',
	};

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'	
		}
	};

	return new Promise((resolve, reject) => { 
		if(saveFlag === 'insert')
			axios.post( `${API_URL}/profiles`, data, config )
				.then(response => { 
					resolve([200, response]);		
				}).catch((error) => {
					resolve([400, error]);
				});
		else if(saveFlag === 'update')		
			axios.put( `${API_URL}/profiles/${data.uid}`, data, config )
				.then(response => { 
					resolve([200, response]);		
				}).catch((err) => {
					resolve([400, err]);		
				});
	});
});

mock.onGet('/api/profile-app/business').reply(params => {
	const { uid } = params;
	new Promise((resolve, reject) => {			
		var dbRef = firebaseService.db.ref(`business/${uid}/`);
		var business = [];
		dbRef.on('value', snapshot => { 
			const data = snapshot.val();			

			resolve(data);
		});
	})
});

mock.onPost('/api/profile-app/creditCard/save').reply(request => {
	const { uid, name, number, expiry, cvc, saveFlag } = JSON.parse(request.data); 
	firebaseService.db.ref(`credit/${uid}/`).set({
		id: uid,
		name,
		number,
		expiry,
		cvc,		
	});

	return [200, request.data];
});

mock.onGet('/api/profile-app/creditCard').reply(params => {
	const { uid } = params;
	new Promise((resolve, reject) => {			
		var dbRef = firebaseService.db.ref(`credit/${uid}/`);
		var credit = [];
		dbRef.on('value', snapshot => {
			const data = snapshot.val();
			
			resolve(data);
		});
	})
});

mock.onGet('/api/profile-app/subscription').reply(params => {
	const { uid } = params;
	new Promise((resolve, reject) => {			
		var dbRef = firebaseService.db.ref(`subscriptions/${uid}/`);
		var credit = [];
		dbRef.on('value', snapshot => {
			const data = snapshot.val();
			
			resolve(data);
		});
	})
});

mock.onPost('/api/profile-app/subscription/save').reply(request => { 
	const { uid, data } = JSON.parse(request.data); 
	firebaseService.db.ref(`subscriptions/${uid}/${data.response.id}`).set({ 
		id: data.response.id,
		...data
	});

	return [200, request.data];
});

mock.onPost('/api/profile-app/subscription/delete').reply(request => {
	const { uid, subId } = JSON.parse(request.data); 
	firebaseService.db.ref(`subscriptions/${uid}/${subId}`).remove();

	return [200, request.data];
});

mock.onPost('/api/profile-app/stripePlan/save').reply(request => {
	const { data } = JSON.parse(request.data); 
	firebaseService.db.ref(`stripePlans/${data.id}`).set({ 
		id: data.id,
		...data
	});

	return [200, request.data];
});

mock.onPost('/api/profile-app/stripeProduct/save').reply(request => { 
	const data = JSON.parse(request.data); 	
	firebaseService.db.ref(`stripeProducts/${data.id}`).set({ 
		...data
	});

	return [200, request.data];
});