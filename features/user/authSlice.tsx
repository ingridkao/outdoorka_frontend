import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/plugins/api/axios";
import {
	tokenName,
	profileName,
	getProfileCookieObj,
	removeCookie,
	setProfileCookie,
	setCookie,
} from "@/utils/cookieHandler";
import { AuthState, ProfileItem, LoginForm } from "@/types/AuthType";
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
		profile: getProfileCookieObj(),
		error: null,
	} as AuthState,
	reducers: {
		logoutUser: (state: AuthState) => {
			state.profile = null;
			removeCookie(profileName);
			removeCookie(tokenName);
			// TODO: 倒轉到首頁
		},
		setProfile: (state: AuthState, action: any) => {
			console.log(action);
			// state.profile = null;
		},
	},
	extraReducers: (builder: any) => {
		const { pending, fulfilled, rejected } = loginUser;
		builder.addCase(pending, (state: AuthState) => {
			state.error = null;
		});
		builder.addCase(fulfilled, (state: AuthState, action: any) => {
			if (action.payload.error) {
				state.profile = null;
				removeCookie(profileName);
				removeCookie(tokenName);
			} else if (action.payload.data) {
				const { user, token } = action.payload.data;
				state.profile = user as ProfileItem;
				setProfileCookie(JSON.stringify(user), 1);
				setCookie(tokenName, token.access_token, 1);
			}
		});
		builder.addCase(rejected, (state: AuthState, action: any) => {
			state.error = action.error;
		});
	},
});

export const { logoutUser, setProfile } = authSlice.actions;
export default authSlice.reducer;
