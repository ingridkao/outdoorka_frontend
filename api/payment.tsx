const paymentApi = (axios: any, event: any) => ({
	registration(params) {
		return axios.post(`${event}/registration`, params);
	},
});

export default paymentApi;
