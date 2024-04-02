import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export default authSlice.reducer;
export const { setCredentials } = authSlice.actions;
