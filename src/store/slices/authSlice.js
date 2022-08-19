import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  loginUserName: "",
  isSuperAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateLoginUser(state, action) {
      const { isAuthenticated, userName, isSuperAdmin } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.loginUserName = userName;
      state.isSuperAdmin = isSuperAdmin
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loginUserName = "";
      state.isSuperAdmin = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
