import axios from "@/plugins/api/axios";
const { activity } = axios;

export const fetchActivitiesData: any = async () => {
	const response = await activity.getActivityList();
	return response;
};
