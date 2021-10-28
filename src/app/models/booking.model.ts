export class Booking{
    id: number;
    userId: number;
    type: string;
    title: string
    desc?: string;
    start: Date;
    end: Date;
    allDay: boolean;
    notes: string;
    name: string;
    notifications: any[];
}

