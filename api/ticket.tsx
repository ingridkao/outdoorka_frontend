const ticket = (axios: any, event: any) => ({
	getTicketList() {
		return axios.get(`${event}`);
	}
});

export default ticket;
