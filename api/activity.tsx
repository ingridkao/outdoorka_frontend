import {
	getCookie,
	OG_TOK0N_COOKIE,
	USER_T0KEN_COOKIE,
} from "@/utils/cookieHandler";

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
		let token = getCookie(USER_T0KEN_COOKIE) ?? "";
		if (!token && getCookie(OG_TOK0N_COOKIE)) {
			token = getCookie(OG_TOK0N_COOKIE) ?? "";
		}

		return axios.get(`${event}/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
});

export default activity;
