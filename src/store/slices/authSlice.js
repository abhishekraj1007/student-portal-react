import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  loginUserName: "",
  isSuperAdmin: false,
  isCollege: false,
  userType: "",
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateLoginUser(state, action) {
      const { isAuthenticated, userName, isSuperAdmin, isCollege, userType } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.loginUserName = userName;
      state.isSuperAdmin = isSuperAdmin;
      state.isCollege = isCollege;
      state.userType = userType;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loginUserName = "";
      state.isSuperAdmin = false;
      state.isCollege = false;
      state.userType = "";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
