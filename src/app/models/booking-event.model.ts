import { CalendarEvent } from "angular-calendar";

export interface BookingEvent extends CalendarEvent {
    userId?: number;
    notes?: string;
    type?: string;
    name?: string;
    notifications?: any[];
  }
