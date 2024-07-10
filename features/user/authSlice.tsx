import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/plugins/api/axios";
import {
  USER_T0KEN_COOKIE,
  USER_PROFILE_COOKIE,
  setProfileCookie,
  removeUserCookie,
  setCookie,
} from "@/utils/cookieHandler";
import { AuthState, LoginForm } from "@/types/AuthType";
const { auth } = axios;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginForm: LoginForm) => {
    const res = await auth.loginEndUser(loginForm);
    return res;
  },
);

const authSlice: any = createSlice({
  name: "auth",
  initialState: {
    error: null,
  } as AuthState,
  reducers: {
    logoutUser: (state: AuthState) => {
      state.error = null;
      removeUserCookie();
    },
  },
  extraReducers: (builder: any) => {
    const { pending, fulfilled, rejected } = loginUser;
    builder.addCase(pending, (state: AuthState) => {
      state.error = null;
    });
    builder.addCase(rejected, (state: AuthState, action: any) => {
      state.error = action.error;
    });
    builder.addCase(fulfilled, (state: AuthState, action: any) => {
      if (action.payload.error) {
        state.error = action.payload.error;
        removeUserCookie();
      } else if (action.payload.data) {
        const { user, token } = action.payload.data;
        setProfileCookie(USER_PROFILE_COOKIE, user, 1);
        setCookie(USER_T0KEN_COOKIE, token.access_token, 1);
      }
    });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
