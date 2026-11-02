import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../core/services/appointment.service';
import { NotificationService } from '../../core/services/notification.service';
import { PetService } from '../../core/services/pet.service';
import { ApiService } from '../../core/services/api.service';

type Page = 'care' | 'profile' | 'patients' | 'vaccinations' | 'analytics' | 'assistant';

@Component({ selector: 'app-portal-pages', templateUrl: './portal-pages.component.html' })
export class PortalPagesComponent {
  page: Page = 'care'; query = ''; answer = '';
  profile = { name: 'Pet Owner', email: '', phone: '' };
  clinic = { name: 'Clinic', hours: '09:00 - 19:00', duration: 30 };
  vaccinations: { pet: string; vaccine: string; last: string; due: string; status: string }[] = [];
  analyticsData = { total_pets: 0, total_visits: 0, total_vaccinations: 0 };
  careCards = [
    { icon: 'DOG', title: 'Puppy care', text: 'Build a gentle routine with safe play, balanced meals and regular wellness visits.' },
    { icon: 'CAT', title: 'Kitten care', text: 'Create a calm home, schedule vaccinations and introduce grooming gradually.' },
    { icon: 'FOOD', title: 'Nutrition', text: 'Choose food for your pet’s life stage and keep clean water available.' },
    { icon: 'CARE', title: 'Dental hygiene', text: 'Use pet-safe dental products and ask your veterinarian about oral checks.' },
    { icon: 'GROOM', title: 'Grooming', text: 'Brush regularly and check ears, paws and skin for changes.' },
    { icon: 'URGENT', title: 'Warning signs', text: 'Breathing trouble, collapse, poisoning or severe bleeding need urgent veterinary help.' },
  ];

  constructor(route: ActivatedRoute, public pets: PetService, public appointments: AppointmentService, private notify: NotificationService, private api: ApiService) {
    route.data.subscribe(data => { this.page = data['page'] as Page; this.loadPageData(); });
  }
  get pending() { return this.appointments.appointments.filter(a => a.status === 'PENDING').length; }
  get completed() { return this.appointments.appointments.filter(a => a.status === 'CONFIRMED').length; }
  saveProfile() { this.notify.show('Profile updates are not available from the current backend API.'); }
  saveClinic() { this.notify.show('Clinic settings are not available from the current backend API.'); }
  markVaccinated(item: { status: string }) { this.notify.show('Vaccination records are managed by the clinic backend.'); }
  ask() {
    const question = this.query.trim();
    if (!question) return;
    this.query = '';
    this.api.clinicChat(question).subscribe({ next: response => this.answer = response.answer, error: () => this.answer = 'The clinic assistant is temporarily unavailable.' });
  }
  private loadPageData() {
    if (this.page === 'vaccinations') {
      this.api.vaccinations().subscribe({ next: rows => this.vaccinations = (rows as any[]).map(row => ({ pet: `Pet #${row.pet_id}`, vaccine: row.vaccine_name, last: row.administered_date || '', due: row.next_due_date || '', status: row.next_due_date && row.next_due_date < new Date().toISOString().slice(0, 10) ? 'Overdue' : 'Up to date' })) });
    }
    if (this.page === 'analytics') this.api.analytics().subscribe({ next: data => this.analyticsData = data });
  }
}
