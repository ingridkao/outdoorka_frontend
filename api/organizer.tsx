import { ICreateActivity, IGetActivity } from "@/types";

const organizerApi = (axios: any, event: any) => ({
	getOrganizer() {
		return axios.get(`${event}/profile`);
	},
	getActivity(params: IGetActivity) {
		return axios.get(`${event}/activity`, { params });
	},
	getActivityById(id: string) {
		return axios.get(`${event}/activity/${id}`);
	},
	createActivity(post: ICreateActivity) {
		return axios.post(`${event}/activities`, post);
	},
	updateActivity(post: ICreateActivity, id: string) {
		return axios.patch(`${event}/activities/${id}`, post);
	},
	imageUpload(formData: FormData) {
		return axios.post(`${event}/imageUpload`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
	imageDelete(fileName: string) {
		return axios.delete(`${event}/image?fileName=${fileName}`);
	},
	updateProfile(post: any) {
		return axios.patch(`${event}/profile`, post);
	},
	getActivityParticipant(activityId: string) {
		return axios.get(`${event}/activity/${activityId}/participants`);
	},
	userReview(ticketId: string, rating: number = 5, comment: string = "") {
		if (!ticketId || !(rating && comment)) return;
		return axios.post(`${event}/tickets/${ticketId}/rating`, {
			rating,
			comment,
		});
	},
});

export default organizerApi;
