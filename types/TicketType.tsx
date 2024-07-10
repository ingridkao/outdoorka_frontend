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
  mobile?: string;
  email?: string;
}

export interface OwnerState {
  _id: string;
  name: string;
  photo: string;
  mobile?: string;
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
  status?: number;
  ticketStatu?: number;
  ticketTotal: number;
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
  tickets: TicketsState[];
  ratingList?: { ticketId: string }[];
}
