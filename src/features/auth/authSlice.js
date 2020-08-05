import { createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { InteractiveSignInRequired } from "./utils";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    networkRequests: 0,
    currentEmail: null,
    lastError: null,
  },
  reducers: {
    startNetwork: (state) => {
      state.networkRequest += 1;
    },
    stopNetwork: (state) => {
      state.networkRequest += -1;
    },
    networkError: (state, action) => {},
    signin: (state, action) => {
      state.currentEmail = action.payload;
    },
    signout: (state) => {
      state.currentEmail = null;
    },
  },
});

export const {
  startNetwork,
  stopNetwork,
  networkError,
  signin,
  signout,
} = authSlice.actions;

// thunks

// export function initializeNetwork() {
//   return async (dispatch) => {
//     try {
//       dispatch(startNetwork());
//       const identity = await authService.getToken();
//       dispatch(signin(identity));
//       dispatch(stopNetwork());
//     } catch (error) {
//       dispatch(stopNetwork());
//       if (!(error instanceof InteractiveSignInRequired)) {
//         dispatch(networkError(error));
//       }
//     }
//   };
// }

export function signIn() {
  return async (dispatch) => {
    try {
      dispatch(startNetwork());
      const identity = await authService.signIn();
      console.log("identity", identity);
      dispatch(signin(identity.emailAddress));
      dispatch(stopNetwork());
    } catch (error) {
      dispatch(stopNetwork());
      dispatch(networkError(error));
    }
  };
}

export function signOut() {
  return (dispatch) => {
    dispatch(startNetwork());
    authService.signOut();
    dispatch(stopNetwork());
    dispatch(signout());
  };
}

// selectors
export const selectCurrentEmail = (state) => state.auth.currentEmail;

export default authSlice.reducer;
