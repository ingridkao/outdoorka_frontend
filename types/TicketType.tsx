import { ActivityState } from "@/types";

export interface OrganizerState {
	_id: string;
	name: string;
	photo: string;
	rating: number;
}

export interface TicketsState {
	ticketId: string;
	ticketStatus: number;
	ticketOwnerId?: string;
}
export interface TicketState {
	_id: string; // activityId
	paymentId: string;
	title: string;
	status: number;
	region: string;
	city: string;
	activityImageUrl: string;
	activityStartTime: string;
	activityEndTime: string;
	likers: number;
	ticketCount: number;
	tickets: TicketsState[];
	bookedCapacity: number;
	totalCapacity?: number;
	organizer?: OrganizerState;
	ticketStatus?: number;
}

export type TicketProp = {
	title: string;
	location: string;
	startTime: string;
	endTime: string;
	photo: string;
	capacity: number;
	status: number;
	ticketCount: number;
	tickets: TicketsState[];
	ticketStatus?: number;
};

export type CheckinTicketInfoProp = {
	_id: string;
	ticketStatus: number;
	ticketNote: string;
	payment: string;
	activity: ActivityState;
};

export type TicketInfoState = {
	_id: string;
	ticketStatus: number;
	ticketNote: string;
	organizer: {
		_id: string;
		name: string;
		photo: string;
		rating: number;
	};
	activity: {
		title: string;
		subtitle: string;
		region: string;
		city: string;
		activityStartTime: string;
		activityEndTime: string;
		cbookedCapacityapacity: number;
	};
};
