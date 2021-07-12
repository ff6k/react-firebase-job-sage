import { combineReducers } from '@reduxjs/toolkit';
import login from './loginSlice';
import register from './registerSlice';
import update from './updateSlice';
import user from './userSlice';

const authReducers = combineReducers({
	user,
	login,
	register,
	update,
});

export default authReducers;
