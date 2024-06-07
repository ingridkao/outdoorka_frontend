export interface OrganizerState {
	_id: string;
	name: string;
	photo: string;
	rating: number;
}
export interface TicketState {
	_id: string;
	ticketStatus: number;
	organizer: OrganizerState;
	subtitle: string;
	region: string;
	city: string;
	activityImageUrls: string[];
	activityStartTime: string;
	activityEndTime: string;
	bookedCapacity: number;
}

type TicketProp = {
	title: string;
	location: string;
	startTime: string;
	endTime: string;
	photo: string;
	avatar: string;
	name: string;
	rating: number;
	capacity: number;
	status: number;
};

export interface CardTicketProps {
	type?: "sm" | "lg";
	tickets: TicketProp;
}
