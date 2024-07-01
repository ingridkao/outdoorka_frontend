import { Activity, ActivityState } from "@/types";

export enum TicketStatus {
	Unused = 0,
	Used = 1,
}
export interface OrganizerState {
	_id: string;
	name: string;
	photo: string;
	rating: number;
}

export interface TicketsState {
	ticketId: string;
	ticketStatus: number;
	ticketNote: string;
	ownerId: string;
	ownerName: string;
	assignedAt: string | null;
}
export interface PaymentState extends Activity {
	paymentId: string;
	status: number;
	ticketTotal: number;
	ticketAssign: number;
	ticketUse?: number;
}

export type CheckinTicketInfoProp = {
	_id: string;
	ticketStatus: number;
	ticketNote: string;
	payment: string;
	activity: ActivityState;
};

export interface TicketInfoState extends Activity {
	_id: string;
	organizer: OrganizerState;
	ticketStatus: number;
	ticketNote: string;
	ticketTotal: number;
	ticketInspect: TicketsState[];
	tickets: TicketsState[];
}
