import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import accountReducer from '../../pages/Account/store/slice/accountSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
});

export default rootReducer;
