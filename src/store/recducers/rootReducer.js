import { combineReducers } from '@reduxjs/toolkit';
import authRedcer from '../slices/authSlice';

const rootReducer = combineReducers({
  auth: authRedcer,
});

export default rootReducer;
