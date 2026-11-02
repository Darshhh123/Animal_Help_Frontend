export type AppointmentStatus='PENDING'|'CONFIRMED'|'REJECTED';
export type BookingSource='FORM'|'AI';
export interface Appointment {id:string;petId:string;petName:string;ownerName:string;clinicName:string;reason:string;date:string;time:string;status:AppointmentStatus;bookingSource:BookingSource;createdAt:string;}
