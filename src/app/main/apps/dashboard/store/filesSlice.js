import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import firebaseService from 'app/services/firebaseService';
import { API_URL } from 'app/fuse-configs/endpointConfig';

export const getFiles = createAsyncThunk(
	'dashboardApp/files/getFiles', 
	params => 
		new Promise((resolve, reject) => {	

			var dbRef = firebaseService.db.ref(`files/${params.uid}`);
			var files = [];
			const toDate = params.toDate;
			const fromDate = params.fromDate;
			dbRef.on('value', snapshot => {
				const data = snapshot.val(); 

				if(data) {
					Object.keys(data).map(key => {
						if(key>=fromDate && key<=toDate) {
							files.push(data[key]);
						}
						
					});
				} else {
					resolve(files)
				}
							
				resolve(files);
			});
		})
);

const filesAdapter = createEntityAdapter({});

export const { selectAll: selectFiles, selectEntities: selectFilesEntities, selectById: selectFilesById } = filesAdapter.getSelectors(
	state => state.dashboardApp.files
);

const filesSlice = createSlice({
	name: 'dashboardApp/files',
	initialState: filesAdapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[getFiles.fulfilled]: filesAdapter.setAll
	}
});

export const {} = filesSlice.actions;

export default filesSlice.reducer;
