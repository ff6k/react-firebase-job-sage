import { combineReducers } from '@reduxjs/toolkit';
import widgets from './widgetsSlice';
import files from './filesSlice';

const reducer = combineReducers({
	widgets,
	files,
});

export default reducer;
