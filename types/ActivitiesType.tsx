import { AuthState, OgAuthState } from "@/types/AuthType";
import { ActivityTag, City } from "./enum/activity";
export interface ActivitiesState {
	items: any[];
	status: string | null;
	error: null | Error;
}

export interface RootState {
	activities: ActivitiesState;
	auth: AuthState;
	ogAuth: OgAuthState;
}

export interface IActivityLink {
	name: string;
	url: string;
}

export interface IGetActivity {
	status: number;
	sort?: string;
}

export interface ICreateActivity {
	title: string;
	subtitle: string;
	price: number;
	totalCapacity: number;
	city: City;
	address: string;
	location: string;
	activityDetail: string;
	activityNotice: string;
	activityTags: ActivityTag[];
	activityLinks: IActivityLink[];
	activityImageUrls: string[];
	isPublish: boolean;
	activitySignupStartTime: any;
	activitySignupEndTime: any;
	activityStartTime: any;
	activityEndTime: any;
}

export interface OrganizerState {
	_id: string;
	name: string;
	photo: string;
	rating: number;
}

export interface  OrganizerActivityState {
	_id: string;
	title: string;
	subtitle: string;
	price: number;
	totalCapacity: number; // 活動人數
	bookedCapacity: number; // 參加人數
	region: string;
	city: string;
	address: string;
	location: string; // 集合地點
	activityImageUrls: string[];
	isPublish: boolean;
	activityStartTime: string;
	activityEndTime: string;
}

export interface ActivityState {
	_id: string;
	organizer: OrganizerState;
	title: string;
	subtitle: string;
	region: string;
	city: string;
	activityImageUrls: string[];
	activityStartTime: string;
	activityEndTime: string;
	likers: number;
	bookedCapacity: number;
	popularity: number;
}
