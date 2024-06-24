const ticket = (axios: any, event: any) => ({
	getTicketList() {
		return axios.get(`${event}`);
	},
	getTicketInfo(id: string) {
		return axios.get(`${event}/${id}`);
	},
});

export default ticket;
