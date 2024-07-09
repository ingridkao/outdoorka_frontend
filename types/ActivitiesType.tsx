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

export interface OrganizerState {
	_id: string;
	name: string;
	photo: string;
	rating: number;
	email?: number;
}
export interface Activity {
	title: string;
	subtitle: string;
	region: string;
	city: City;
	activityStartTime: any;
	activityEndTime: any;
	price?: number;
	
	bookedCapacity?: number; // 參加人數
	totalCapacity?: number; // 參加人數上限
	
	activityNotice?: string;
	activityImageUrl?: string;
	activityImageUrls?: string[];
	activityTags: ActivityTag[];

	likeCount?: number;
	likers?: number; // TODO 待後端移除
	organizerId?: string;
	organizerRating?: number;
	organzierName?: string;
	popularity?: number;

}
/**
 *         {
            "_id": "664cb717ae8e74de4ae74882",
            "organizer": {
                "_id": "66598f65af59cba1d15a2448",
                "name": "ingridHeader123",
                "photo": "https://firebasestorage.googleapis.com/v0/b/node-project-f7e1a.appspot.com/o/images%2FShiromaro.png?alt=media&token=2d3267c3-041d-41ec-9e92-cfa39b08b723",
                "rating": 3
            },
            "title": "大屯溪古道上小觀音山｜戶外生活 X 山旅戶外",
            "subtitle": "大屯溪古道上小觀音山｜戶外生活 X 山旅戶外",
            "region": "北部",
            "city": "新北市",
            "activityImageUrls": [
                "https://media.istockphoto.com/id/891408558/photo/male-and-woman-couples-asia-travelers-travel-nature-forests-mountains-waterfalls.jpg?s=612x612&w=0&k=20&c=_lZBEwoNODR8NcgmLSvHTF79o6eQGNWY6dejpD9PvOs=",
                "https://media.istockphoto.com/id/648802984/photo/businessman-with-backpack-and-laptop-and-phone-at-waterfall-the-forest.jpg?s=612x612&w=0&k=20&c=73imKgvhulPgnskKTcwdKgnZueP07dmnj_u--JB0qyw=",
                "https://media.istockphoto.com/id/481072273/photo/rainforest.jpg?s=612x612&w=0&k=20&c=HK0t1fI4-LPgCQKzFeMpVW0LvwTn91Paq52c0HfE1OM="
            ],
            "activityStartTime": "2024-12-09T01:00:00.537Z",
            "activityEndTime": "2024-12-09T12:00:00.000Z",
            "bookedCapacity": 18,
            "popularity": 0.9
        },
 */
export interface HomeActivityState extends Activity {
	_id?: string;
	organizer?: OrganizerState;
	title: string;
	subtitle: string;
	region: string;
	city: City;
	activityImageUrls: string[];
	activityStartTime: any;
	activityEndTime: any;
	bookedCapacity?: number; // 參加人數
	popularity?: number;
	// isLike?: boolean;
}

export interface FavoritesActivityState extends Activity {
	_id?: string;
	organizer?: OrganizerState;
	title: string;
	subtitle: string;
	region: string;
	city: City;
	activityImageUrls: string[];
	activityStartTime: any;
	activityEndTime: any;
	activityTags: ActivityTag[];
	bookedCapacity?: number; // 參加人數
	likeCount?: number;
}

export interface ActivityState extends Activity {
	_id?: string;
	activityImageUrls: string[];
	organizer?: OrganizerState;
	popularity?: number;
	isLike?: boolean;
}
export interface IActivityLink {
	name: string;
	url: string;
}

export interface IGetActivity {
	status: number;
	sort?: string;
}

export interface ICreateActivity extends Activity {
	address: string;
	location: string;
	activityDetail: string;
	activityLinks: IActivityLink[];
	isPublish: boolean;
	activitySignupStartTime: any;
	activitySignupEndTime: any;
}

export interface OrganizerActivityState extends Activity {
	_id: string;
	totalCapacity: number; // 活動人數
	address: string;
	location: string; // 集合地點
	activityImageUrls: string[];
	isPublish: boolean;
}


