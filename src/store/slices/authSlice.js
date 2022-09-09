import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  loginUserName: "",
  isSuperAdmin: false,
  isCollege: false,
  isStudent: false,
  userType: "",
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateLoginUser(state, action) {
      const { isAuthenticated, userName, isSuperAdmin, isCollege, isStudent, userType } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.loginUserName = userName;
      state.isSuperAdmin = isSuperAdmin;
      state.isCollege = isCollege;
      state.isStudent = isStudent;
      state.userType = userType;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loginUserName = "";
      state.isSuperAdmin = false;
      state.isCollege = false;
      state.isStudent = false;
      state.userType = "";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
