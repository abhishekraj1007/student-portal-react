import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    studentProfileData: {},
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateStudentProfileData(state, action) {
        state.studentProfileData = action.payload;
    }
  },
});

export const accountActions = accountSlice.actions;
export default accountSlice.reducer;
