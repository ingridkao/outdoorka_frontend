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

export interface Activity {
	title: string;
	subtitle?: string;
	region: string;
	city: string;
	price?: number;
	activityImageUrl: string;
	activityStartTime: string;
	activityEndTime: string;
	activityNotice?: string;

	activityExpired?: boolean;
	bookedCapacity?: number; // 參加人數
	totalCapacity?: number; // 參加人數上限
	likeCount?: number;
	likers?: number; // TODO 待後端移除
	organizerId?: string;
	organizerRating?: number;
	organzierName?: string;
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

export interface OrganizerActivityState extends Activity {
	_id: string;
	totalCapacity: number; // 活動人數
	address: string;
	location: string; // 集合地點
	activityImageUrls: string[];
	isPublish: boolean;
}

export interface ActivityState extends Activity {
	_id?: string;
	activityImageUrls: string[];
	organizer?: OrganizerState;
	popularity?: number;

	isLike?: boolean;
}
