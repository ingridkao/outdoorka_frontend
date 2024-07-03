const organizerTicket = (axios: any, event: any) => ({
	getTicketInfo(id: string) {
		return axios.get(`${event}/${id}/confirm`);
	},
	patchTicketInfo(id: string) {
		return axios.patch(`${event}/${id}/confirm`);
	}
});

export default organizerTicket;
