import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  wsClientId: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setWsClientId(state, action) {
      state.wsClientId = action.payload;
    }
  },
});

export default authSlice.reducer;
export const { setCredentials, setWsClientId } = authSlice.actions;
