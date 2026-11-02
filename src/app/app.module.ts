import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { TopbarComponent } from './shared/components/topbar/topbar.component';
import { StatCardComponent } from './shared/components/stat-card/stat-card.component';
import { StatusBadgeComponent } from './shared/components/status-badge/status-badge.component';
import { LoginComponent } from './features/auth/login/login.component';
import { OwnerDashboardComponent } from './features/owner/dashboard/owner-dashboard.component';
import { OwnerAppointmentsComponent } from './features/owner/appointments/owner-appointments.component';
import { BookAppointmentComponent } from './features/owner/book-appointment/book-appointment.component';
import { PetsComponent } from './features/owner/pets/pets.component';
import { AiAssistantComponent } from './features/owner/ai-assistant/ai-assistant.component';
import { AdminDashboardComponent } from './features/admin/dashboard/admin-dashboard.component';
import { AdminRequestsComponent } from './features/admin/requests/admin-requests.component';
import { AvailabilityComponent } from './features/admin/availability/availability.component';
import { AiCallingComponent } from './features/admin/ai-calling/ai-calling.component';
import { SettingsComponent } from './features/admin/settings/settings.component';
import { PortalPagesComponent } from './features/portal/portal-pages.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
@NgModule({ declarations: [AppComponent, SidebarComponent, TopbarComponent, StatCardComponent, StatusBadgeComponent, LoginComponent, OwnerDashboardComponent, OwnerAppointmentsComponent, BookAppointmentComponent, PetsComponent, AiAssistantComponent, AdminDashboardComponent, AdminRequestsComponent, AvailabilityComponent, AiCallingComponent, SettingsComponent, PortalPagesComponent], imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule], providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }], bootstrap: [AppComponent] })
export class AppModule {}
