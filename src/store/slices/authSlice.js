import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  loginUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateLoginUser(state, action) {
      const { isAuthenticated } = action.payload;
      state.isAuthenticated = isAuthenticated;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loginUser = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
