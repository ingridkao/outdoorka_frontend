import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/plugins/api/axios";
import { OG_TOK0N_COOKIE, removeOgCookie, setCookie } from "@/utils/cookieHandler";

import {
	AuthItem,
	LoginOrganizerForm,
	ProfileOgItem,
	OgAuthState,
} from "@/types/AuthType";

const { auth, organizer } = axios;

const initialState = {
	token: null,
	profile: null,
	error: null,
} as OgAuthState;

const ogAuthSlice: any = createSlice({
	name: "ogAuth",
	initialState,
	reducers: {
		logoutOrganizer: (state: OgAuthState) => {
			state.token = null;
			state.profile = null;
			removeOgCookie();
		},
	},
	extraReducers: (builder: any) => {
		const { pending, fulfilled, rejected } = loginOrganizer;
		builder.addCase(pending, (state: OgAuthState) => {
			// loading start
			state.error = null;
			state.token = null;
			state.profile = null;
		});
		builder.addCase(rejected, (state: OgAuthState, action: any) => {
			state.error = action.error;
			state.token = null;
			state.profile = null;
		});
		builder.addCase(
			fulfilled,
			(state: OgAuthState, action: any) => {
				// loading end
				if (action.payload.error) {
					state.error = action.payload.error;
					state.token = null;
					state.profile = null;
					removeOgCookie();
				} else if (action.payload.data) {
					const { organizer, token } = action.payload.data;
					state.profile = organizer as ProfileOgItem;
					state.token = token as AuthItem;
					setCookie(OG_TOK0N_COOKIE, state.token.access_token, 3);
				}
			},
		);

		// getOrganizer
		builder.addCase(getOrganizer.rejected, (state: OgAuthState, action: any) => {
			state.error = action.error;
			state.token = null;
			state.profile = null;
		});
		builder.addCase(
			getOrganizer.fulfilled,
			(state: OgAuthState, action: any) => {
				// loading end
				if (action.payload.error) {
					state.error = action.payload.error;
					state.token = null;
					state.profile = null;
					removeOgCookie();
				} else if (action.payload.data) {
					const organizer = action.payload.data;
					state.profile = organizer as ProfileOgItem;
				}
			},
		);
	},
});

export const { logoutOrganizer } = ogAuthSlice.actions;
export const loginOrganizer = createAsyncThunk(
	"ogAuth/loginOrganizer",
	async (loginForm: LoginOrganizerForm) => {
		const res = await auth.loginOrganizer(loginForm);
		return res;
	},
);
export const getOrganizer = createAsyncThunk("organizer/profile", async () => {
	const res = await organizer.getOrganizer();
	return res;
});
export default ogAuthSlice.reducer;
