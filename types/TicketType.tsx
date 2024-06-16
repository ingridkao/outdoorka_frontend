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
	_id: string;
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
};
