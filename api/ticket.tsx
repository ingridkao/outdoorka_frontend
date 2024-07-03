const ticket = (axios: any, event: any) => ({
	getPaymentList() {
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
	getSuspenseTicketInfo() {
		return axios.get(`${event}/suspense`);
	},
	userReview(id: string, rating: number = 5, comment: string = "") {
		if (!(rating && comment)) return
		return axios.post(`${event}/${id}/rating`, {
			rating,
			comment
		});
	},
});

export default ticket;
