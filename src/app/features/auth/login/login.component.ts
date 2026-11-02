import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({ selector: 'app-login', templateUrl: './login.component.html' })
export class LoginComponent {
  mode: 'signin' | 'register' = 'signin';
  email = '';
  password = '';
  name = '';
  registerEmail = '';
  registerPassword = '';
  confirmPassword = '';

  constructor(private auth: AuthService, private router: Router, private notify: NotificationService) {}

  signIn(role: 'OWNER' | 'ADMIN' = 'OWNER') {
    if (!this.email.trim() || !this.password.trim() || this.password.length < 8) {
      this.notify.show('Enter a valid email and a password with at least 8 characters.');
      return;
    }
    this.auth.login(role, this.email.trim(), this.password).subscribe({
      next: user => this.router.navigate([user.role === 'ADMIN' ? '/clinic/dashboard' : '/owner/dashboard']),
      error: error => this.notify.show(error.error?.detail || 'Unable to sign in. Check your credentials.'),
    });
  }

  register() {
    if (!this.name.trim() || !this.registerEmail.trim() || this.registerPassword.length < 8 || this.registerPassword !== this.confirmPassword) {
      this.notify.show('Complete all fields and use a password with at least 8 characters.');
      return;
    }
    this.auth.register(this.name.trim(), this.registerEmail.trim(), this.registerPassword).subscribe({
      next: () => { this.notify.show('Account created. Welcome to AnimalCare!'); this.router.navigate(['/owner/dashboard']); },
      error: error => this.notify.show(error.error?.detail || 'Unable to create the account.'),
    });
  }

  useDemo(role: 'OWNER' | 'ADMIN') {
    this.email = role === 'ADMIN' ? 'admin@greenpaws.demo' : 'owner@animalcare.demo';
    this.password = 'demo123';
    this.notify.show('Use a registered account to sign in.');
  }
}
