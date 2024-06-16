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
});

export default activity;
