import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/plugins/api/axios";
import { removeCookie, setCookie } from "@/utils/cookieHandler";

const { payments } = axios;

export const paymentRegistration = createAsyncThunk(
	"auth/registration",
	async (paymentForm: any) => {
		const res = await payments.registration(paymentForm);
		return res;
	},
);

const paymentsSlice: any = createSlice({
	name: "auth",
	initialState: {
		items: [],
		error: null,
	},
	reducers: {},
});

export default paymentsSlice.reducer;
