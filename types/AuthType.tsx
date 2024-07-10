export interface RegisterForm {
  email: string;
  password: string;
  confirm?: string;
  name: string;
  mobile: string;
}

export interface RegisterOgForm {
  email: string;
  name: string;
  nickName: string;
  mobile: string;
  password: string;
  confirm?: string;
}

export interface LoginForm {
  account: string;
  password: string;
  remember?: boolean;
}

export interface AuthItem {
  access_token: string;
  refresh_token: string;
}

export interface AuthState {
  error: string | null;
}
export interface LikeState {
  likesList: { _id: string }[];
  likesCount: number;
  error: string | null;
}

export interface ProfileOgItem {
  _id: string;
  email: string;
  name: string;
  nickName: string;
  photo: string;
  mobile: string;
}

export interface LoginOrganizerForm {
  email: string;
  password: string;
  remember?: boolean;
}

export interface OgAuthState {
  token: AuthItem | null;
  profile: ProfileOgItem | null;
  error: string | null;
}
