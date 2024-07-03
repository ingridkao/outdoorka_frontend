import instance, { ogInstance } from "./instance";
import activities from "@/api/activity";
import ticket from "@/api/ticket";
import user from "@/api/user";
import auth from "@/api/auth";
import organizerApi from "@/api/organizer";
import organizerTicket from "@/api/organizerTicket";
import favorite from "@/api/favorite";
const api = {
	activity: activities(instance, "/api/v1/activity"),
	ticket: ticket(instance, "/api/v1/tickets"),
	user: user(instance, "/api/v1/users"),
	auth: auth(instance, "/api/v1"),
	organizer: organizerApi(ogInstance, "/api/v1/organizer"),
	organizerTicket: organizerTicket(ogInstance, "/api/v1/tickets"),
	// activities: activities(instance, "/posts")
	favorite: favorite(instance, "/api/v1/liked-list"),
};

export default api;
