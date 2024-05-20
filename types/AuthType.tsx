export interface RegisterForm {
	email: string;
	password: string;
	confirm?: string;
	name: string;
	mobile: string;
}

export interface LoginForm {
	account: string;
	password: string;
}

export interface AuthItem {
	access_token: string;
	refresh_token: string;
}

export interface ProfileItem {
	email: string;
	name: string;
}
export interface AuthState {
	profile: ProfileItem | null;
	error: string | null;
}

export interface ProfileOgItem {
	_id: string;
	email: string;
	username: string;
	nickName: string;
	photo: string;
	mobile: string;
}

export interface LoginOrganizerForm {
	email: string;
	password: string;
}

export interface OgAuthState {
	token: AuthItem | null;
	profile: ProfileOgItem | null;
}
