import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/plugins/api/axios";
import { removeCookie, setCookie } from "@/utils/cookieHandler";
import { v4 as uuidv4 } from "uuid";

const { payments } = axios;

export const paymentRegistration = createAsyncThunk(
	"payments/registration",
	async (paymentForm, { rejectWithValue }) => {
		try {
			// 設置支付請求的參數
			const paymentData = {
				MerchantID: uuidv4(),
				MerchantTradeNo: `${Date.now()}`,
				MerchantTradeDate: new Date()
					.toISOString()
					.replace("T", " ")
					.split(".")[0],
				TotalAmount: paymentForm.totalAmount * paymentForm.ticketCount,
				PaymentType: "aio",
				TradeDesc: paymentForm.subtitle,
				ItemName: paymentForm.title,
				ReturnURL: "http://localhost:3000/",
				ChoosePayment: "Credit",
				EncryptType: 1,
				Email: paymentForm.email,
			};

			const { data } = await payments.registration(JSON.stringify(paymentData));

			return data;
		} catch (error) {
			return rejectWithValue(
				error.response ? error.response.data : error.message,
			);
		}
	},
);

const paymentsSlice = createSlice({
	name: "payments",
	initialState: {
		items: [],
		error: null,
		loading: false,
		success: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(paymentRegistration.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(paymentRegistration.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
				state.success = true;
			})
			.addCase(paymentRegistration.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.success = false;
			});
	},
});

export default paymentsSlice.reducer;
