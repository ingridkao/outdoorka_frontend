const ticket = (axios: any, event: any) => ({
	getTicketList() {
		return axios.get(`${event}`);
	},
	getPaymentInfo(id: string) {
		return axios.get(`${event}/${id}`);
	},
	updateTicketInfo(id: string, email: string = "", note: string = "") {
		const post: any = {};
		if (email) post.ownerEmail = email;
		if (note) post.ticketNote = note;
		return axios.patch(`${event}/${id}`, post);
	},
});

export default ticket;
