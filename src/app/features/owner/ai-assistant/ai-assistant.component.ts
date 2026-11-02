import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AppointmentService } from '../../../core/services/appointment.service';
import { PetService } from '../../../core/services/pet.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ApiService } from '../../../core/services/api.service';

@Component({ selector: 'app-ai-assistant', templateUrl: './ai-assistant.component.html' })
export class AiAssistantComponent {
  chat = '';
  messages: string[] = ['Hello! Ask a general pet-care question or ask about appointments.'];
  constructor(public auth: AuthService, public appointments: AppointmentService, public pets: PetService, public notify: NotificationService, private router: Router, private api: ApiService) {}
  send() {
    const question = this.chat.trim();
    if (!question) return;
    this.messages.push(`You: ${question}`);
    this.chat = '';
    this.api.ownerChat(question).subscribe({ next: response => this.messages.push(`Assistant: ${response.answer}`), error: () => this.messages.push('Assistant: The assistant is temporarily unavailable.') });
  }
}
