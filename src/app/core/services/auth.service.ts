import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, UserRole } from '../models/user.model';

interface ApiUser { id: number; full_name: string; email: string; phone?: string; role: string; }
interface AuthResponse { access_token: string; token_type: string; user: ApiUser; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userKey = 'animalcare_user';
  private readonly tokenKey = 'animalcare_access_token';
  private readonly subject = new BehaviorSubject<User | null>(this.read());
  user$ = this.subject.asObservable();

  constructor(private http: HttpClient) {}

  get currentUser() { return this.subject.value; }
  get isLoggedIn() { return !!this.currentUser; }

  login(role: UserRole = 'OWNER', email = '', password = ''): Observable<User> {
    if (!email || !password) {
      return throwError(() => new Error('Email and password are required.'));
    }
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, { email, password }).pipe(
      tap(response => this.saveTokenAndUser(response)),
      switchMap(response => [this.mapUser(response.user)]),
    );
  }

  register(name: string, email: string, password = ''): Observable<User> {
    return this.http.post<{ user: ApiUser }>(`${environment.apiUrl}/auth/register`, {
      full_name: name,
      email,
      password,
    }).pipe(
      switchMap(() => this.login('OWNER', email, password)),
    );
  }

  logout() {
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.tokenKey);
    this.subject.next(null);
  }

  private saveTokenAndUser(response: AuthResponse) {
    localStorage.setItem(this.tokenKey, response.access_token);
    const user = this.mapUser(response.user);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.subject.next(user);
  }

  private mapUser(user: ApiUser): User {
    return {
      id: String(user.id),
      name: user.full_name,
      email: user.email,
      role: user.role === 'clinic_staff' ? 'ADMIN' : 'OWNER',
    };
  }

  private read(): User | null {
    try { return JSON.parse(localStorage.getItem(this.userKey) || 'null'); } catch { return null; }
  }
}
