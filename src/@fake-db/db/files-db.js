import mock from '../mock';
import firebaseService from 'app/services/firebaseService';
import axios from 'axios';
import { API_URL } from 'app/fuse-configs/endpointConfig';

mock.onPost('/api/files-app/files/save').reply(request => {
	const data = JSON.parse(request.data); 
	// firebaseService.db.ref(`business/${data.uid}/`).set({
	// 	data: data,
	// 	id: data.uid
	// });

	return [200, data];
});
