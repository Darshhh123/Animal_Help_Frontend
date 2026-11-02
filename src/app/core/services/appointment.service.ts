import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Appointment, AppointmentStatus, BookingSource } from '../models/appointment.model';

interface ApiAppointment { id: number; pet_id: number; appointment_date: string; start_time: string; reason?: string; status?: string; created_at?: string; }

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private readonly subject = new BehaviorSubject<Appointment[]>([]);
  appointments$ = this.subject.asObservable();

  constructor(private http: HttpClient) { this.load(); }

  get appointments() { return this.subject.value; }

  load() {
    this.http.get<ApiAppointment[]>(`${environment.apiUrl}/appointments/`).subscribe({
      next: rows => this.subject.next(rows.map(row => this.toAppointment(row))),
      error: () => this.subject.next([]),
    });
  }

  create(data: { petId: string; petName: string; reason: string; date: string; time: string; bookingSource: BookingSource }) {
    this.http.post<ApiAppointment>(`${environment.apiUrl}/appointments/`, {
      clinic_id: 1,
      pet_id: Number(data.petId),
      appointment_date: data.date,
      start_time: data.time,
      reason: data.reason,
    }).subscribe({ next: row => this.subject.next([this.toAppointment(row, data.petName), ...this.appointments]) });
  }

  updateStatus(id: string, status: AppointmentStatus) {
    this.http.patch<ApiAppointment>(`${environment.apiUrl}/appointments/${id}/status`, { status: status.toLowerCase() }).subscribe({
      next: row => this.subject.next(this.appointments.map(item => item.id === id ? this.toAppointment(row, item.petName) : item)),
    });
  }

  private toAppointment(row: ApiAppointment, petName = `Pet #${row.pet_id}`): Appointment {
    return {
      id: String(row.id), petId: String(row.pet_id), petName, ownerName: '', clinicName: '',
      reason: row.reason || '', date: row.appointment_date, time: row.start_time.slice(0, 5),
      status: (row.status || 'pending').toUpperCase() as AppointmentStatus,
      bookingSource: 'FORM', createdAt: row.created_at || '',
    };
  }
}
