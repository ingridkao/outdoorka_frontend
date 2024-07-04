const activity = (axios: any, event: any) => ({
	getActivityList() {
		return axios.get(`${event}/homelist`);
	},
	getHotActivityList() {
		return axios.get(`${event}/homelist?type=HOT`);
	},
	getNewActivityList() {
		return axios.get(`${event}/homelist?type=NEW`);
	},
	getActivitiesList() {
		return axios.get(`${event}/list`);
	},
	getActivityDetail(id: string) {
		return axios.get(`${event}/${id}`);
	},
});

export default activity;
