import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly url = environment.apiUrl;
  constructor(private http: HttpClient) {}
  health() { return this.http.get<{ status: string }>(`${this.url}/health/status`); }
  databaseHealth() { return this.http.get<{ status: string; database: string }>(`${this.url}/health/db`); }
  currentUser() { return this.http.get<unknown>(`${this.url}/auth/me`); }
  clinics() { return this.http.get<unknown[]>(`${this.url}/clinics/`); }
  services(clinicId?: number) { return this.http.get<unknown[]>(`${this.url}/services/`, { params: clinicId ? { clinic_id: clinicId } : {} }); }
  patients(search?: string, species?: string) { return this.http.get<unknown[]>(`${this.url}/patients/`, { params: { ...(search ? { search } : {}), ...(species ? { species } : {}) } }); }
  patientHistory(petId: string) { return this.http.get<unknown>(`${this.url}/patients/${petId}/history`); }
  ownerDashboard() { return this.http.get<unknown>(`${this.url}/dashboard/owner`); }
  clinicDashboard() { return this.http.get<unknown>(`${this.url}/dashboard/clinic`); }
  ownerChat(message: string) { return this.http.post<{ answer: string }>(`${this.url}/assistant/owner-chat`, { message }); }
  clinicChat(message: string) { return this.http.post<{ answer: string; data: unknown[] }>(`${this.url}/assistant/clinic-chat`, { message }); }
  vaccinations() { return this.http.get<unknown[]>(`${this.url}/vaccinations/`); }
  analytics() { return this.http.get<{ total_pets: number; total_visits: number; total_vaccinations: number }>(`${this.url}/analytics/overview`); }
}
