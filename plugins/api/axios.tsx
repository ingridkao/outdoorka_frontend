import instance, { ogInstance } from "./instance";
import activities from "@/api/activity";
import user from "@/api/user";
import auth from "@/api/auth";
import organizerApi from "@/api/organizer";

// export const URL = {
// 	OUTDOORKA_URL:
// 		process.env.NEXT_PUBLIC_BASE_URL_USER || "http://localhost:3006",
// };

const api = {
	activity: activities(instance, "/api/v1/activity"),
	user: user(instance, "/api/v1/users"),
	auth: auth(instance, "/api/v1"),
	organizer: organizerApi(ogInstance, "/api/v1/organizer"),
	// activities: activities(instance, "/posts")
};

export default api;
