const organizerTicket = (axios: any, event: any) => ({
	getTicketInfo(id: string) {
		return axios.get(`${event}/${id}/confirm`);
	}
});

export default organizerTicket;
