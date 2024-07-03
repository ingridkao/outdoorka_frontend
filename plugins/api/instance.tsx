import axios from "axios";
import { USER_T0KEN_COOKIE, OG_TOK0N_COOKIE, getCookie, removeUserCookie } from "@/utils/cookieHandler";

const onRequest = (tokenCookie: string) => (config: any) => {
	const token = getCookie(tokenCookie);
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	} else {
		// const refresh_token = getCookie(tokenCookie);
		// refresh_token
	}

	// Wait for 10 seconds before timing out
	config.timeout = 10000;

	return config;
};

const onResponse = (response: any) => {
	const { status } = response;
	if (status >= 200 && status <= 299) {
		return response.data;
	}
	return response;
};

const onError = (tokenCookie: string) => (error: any) => {	
	const { response } = error;
	if(response?.status === 401){
		if( tokenCookie === USER_T0KEN_COOKIE) removeUserCookie()
	}

	return Promise.reject({
		status: `${response?.status || 500}`,
		message: response?.data?.errorMessage || "服務異常",
	});
};

const createInstance = (baseURL: string, tokenCookie: string) => {
	const instance = axios.create({
		baseURL,
		headers: { "Content-Type": "application/json" },
	});

	instance.interceptors.request.use(onRequest(tokenCookie));
	instance.interceptors.response.use(onResponse, onError(tokenCookie));

	return instance;
};

const instance = createInstance(
	process.env.NEXT_PUBLIC_BASE_URL_USER || "http://localhost:3006",
	USER_T0KEN_COOKIE
);

const ogInstance = createInstance(
	process.env.NEXT_PUBLIC_BASE_URL_USER || "http://localhost:3006",
	OG_TOK0N_COOKIE
);

export { instance as default, ogInstance };
