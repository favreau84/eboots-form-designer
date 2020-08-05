import { configureStore } from "@reduxjs/toolkit";
import formsReducer from "features/forms/formsSlice";
import authReducer from "features/auth/authSlice";

export default configureStore({
  reducer: {
    forms: formsReducer,
    auth: authReducer,
  },
});
