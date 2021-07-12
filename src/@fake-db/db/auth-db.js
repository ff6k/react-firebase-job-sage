import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import jwt from 'jsonwebtoken';
import mock from '../mock';
import axios from 'axios';
import { API_URL } from 'app/fuse-configs/endpointConfig';
/* eslint-disable camelcase */

const jwtConfig = {
	secret: 'some-secret-code-goes-here',
	expiresIn: '2 days' // A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc)
};

const authDB = {
	users: []
};

mock.onGet('/api/auth').reply(config => {
	const data = JSON.parse(config.data);
	const { email, password } = data;

	const user = _.cloneDeep(authDB.users.find(_user => _user.data.email === email));

	const error = {
		email: user ? null : 'Check your username/email',
		password: user && user.password === password ? null : 'Check your password'
	};

	if (!error.email && !error.password && !error.displayName) {
		delete user.password;

		const access_token = jwt.sign({ id: user.uuid }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

		const response = {
			user,
			access_token
		};

		return [200, response];
	}
	return [200, { error }];
});

mock.onGet('/api/auth/access-token').reply(config => {
	const data = JSON.parse(config.data);
	const { access_token } = data;

	try {
		const { id } = jwt.verify(access_token, jwtConfig.secret);

		const user = _.cloneDeep(authDB.users.find(_user => _user.uuid === id));
		delete user.password;

		const updatedAccessToken = jwt.sign({ id: user.uuid }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

		const response = {
			user,
			access_token: updatedAccessToken
		};

		return [200, response];
	} catch (e) {
		const error = 'Invalid access token detected';
		return [401, { error }];
	}
});

mock.onPost('/api/auth/register').reply(request => {
	const data = JSON.parse(request.data);
	const { uid, displayName, password, email } = data;
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
		axios.post(
			`${API_URL}/customers`, 
			{			
				uid: uid,
				user_name: displayName,
				pwd: password,
				user_email: email,
			},
			config
		).then(response => { console.log('success')
			if (response.data.user) { 									
				resolve(response.data.user);
			} else {
				reject(response.data.error);
			}
		}).catch(err => {
			console.log('error:', err);
		});
	});
});

mock.onPost('/api/auth/user/update').reply(request => {
	const data = JSON.parse(request.data); 
	const { uid, displayName, profile, promoCode } = data;
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT',
			'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'	
		}
	}; 
	return new Promise((resolve, reject) => {
		axios.put(
			`${API_URL}/customers/${uid}`, 
			{			
				user_name: displayName,
				profile: profile,
				promoCode: promoCode,				
			},
			config
		).then(response => { 
			if (response.data) { 					
				// this.setSession(response.data.access_token);				
				resolve([200, response.data]);
			} else {
				reject([400, 'error']);
			}
		});
	})
});
