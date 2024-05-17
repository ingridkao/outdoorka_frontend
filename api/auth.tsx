import { LoginForm, LoginOrganizerForm, RegisterForm } from "@/types/AuthType";

const auth = (axios: any, event: any) => ({
	registerUser(post: RegisterForm) {
		return axios.post(`${event}/register`, post);
	},
	loginEndUser(post: LoginForm) {
		return axios.post(`${event}/login`, {
			email: post.account,
			password: post.password,
		});
	},
	loginOrganizer(post: LoginOrganizerForm) {
		return axios.post(`${event}/organizer/login`, {
			email: post.email,
			password: post.password,
		});
	},
});

export default auth;
