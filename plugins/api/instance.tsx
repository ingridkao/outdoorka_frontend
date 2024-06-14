import axios from "axios";
import { getCookie } from "@/utils/cookieHandler";

const onRequest = (tokenCookie: string) => (config: any) => {
	const token = getCookie(tokenCookie);
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	// Wait for 10 seconds before timing out
	config.timeout = 10000; //

	return config;
};

const onResponse = (response: any) => {
	const { status } = response;

	if (status >= 200 && status <= 299) {
		return response.data;
	}

	return response;
};

const onError = (error: any) => {
	const { response } = error;
	return Promise.reject({
		status: `${response.status || 500}`,
		message: response.data?.errorMessage || "服務異常",
	});
};

const createInstance = (baseURL: string, tokenCookie: string) => {
	const instance = axios.create({
		baseURL,
		headers: { "Content-Type": "application/json" },
	});

	instance.interceptors.request.use(onRequest(tokenCookie));
	instance.interceptors.response.use(onResponse, onError);

	return instance;
};

const instance = createInstance(
	process.env.NEXT_PUBLIC_BASE_URL_USER || "http://localhost:3006",
	"OUTDOORKA_TOKEN",
);

const ogInstance = createInstance(
	process.env.NEXT_PUBLIC_BASE_URL_USER || "http://localhost:3006",
	"OUTDOORKA_OG_TOKEN",
);

export { instance as default, ogInstance };
