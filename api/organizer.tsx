import { ICreateActivity, IGetActivity } from "@/types";

const organizerApi = (axios: any, event: any) => ({
	getOrganizer() {
		return axios.get(`${event}/profile`);
	},
	getActivity(params: IGetActivity) {
		return axios.get(`${event}/activity`, { params });
	},
	getActivityById(id: string) {
		return axios.post(`${event}/${id}/activities`);
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
});

export default organizerApi;
