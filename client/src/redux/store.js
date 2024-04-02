import { configureStore } from "@reduxjs/toolkit";
// slices imports
import authReducer from "./slices/auth.slice";
// reducers imports
import { authApi } from "./services/auth.services";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  devTools: process.env.NODE_ENV == "development",
  middleware: (gDM) => gDM().concat(authApi.middleware),
});
