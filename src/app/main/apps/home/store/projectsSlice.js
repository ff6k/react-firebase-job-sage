import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

export const getProjects = createAsyncThunk('projectDashboardApp/projects/getProjects', async () => {
	const response = await axios.get('/api/project-dashboard-app/projects');
	return response.data;
});

const projectsAdapter = createEntityAdapter({});

export const {
	selectAll: selectProjects,
	selectEntities: selectProjectsEntities,
	selectById: selectProjectById
} = projectsAdapter.getSelectors(state => state.projectDashboardApp.projects);

const projectsSlice = createSlice({
	name: 'projectDashboardApp/projects',
	initialState: projectsAdapter.getInitialState({
		resumeFileName: '',
		templateFileName: '',
		email: '',
		progress: 0,
		isFileUploadCompleted: true,
		mailDialog: {
			props: {
				open: false
			},
			data: null
		},
	}),
	reducers: {
		setResumeFileName: {
			reducer: (state, action) => {
				state.resumeFileName = action.payload;
			},
		},
		setTemplateFileName: {
			reducer: (state, action) => {
				state.templateFileName = action.payload;
			},
		},
		setEmail: {
			reducer: (state, action) => {
				state.email = action.payload
			}
		},
		setProgress: {
			reducer: (state, action) => {
				state.progress = action.payload
			}
		},
		setIsFileUploadCompleted: {
			reducer: (state, action) => {
				state.isFileUploadCompleted = action.payload;
			},
		},
		openMailDialog: (state, action) => {
			state.mailDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeMailDialog: (state, action) => {
			state.mailDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
	},
	extraReducers: {
		[getProjects.fulfilled]: projectsAdapter.setAll
	}
});

export const { 
	setResumeFileName, 
	setTemplateFileName, 
	setEmail,
	setProgress,
	setIsFileUploadCompleted,
	openMailDialog,
	closeMailDialog,
} = projectsSlice.actions;

export default projectsSlice.reducer;
