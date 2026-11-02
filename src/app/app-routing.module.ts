import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './core/guards/role.guard';
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
const clinicChildren: Routes = [{ path: 'dashboard', component: AdminDashboardComponent }, { path: 'requests', component: AdminRequestsComponent }, { path: 'availability', component: AvailabilityComponent }, { path: 'ai-calling', component: AiCallingComponent }, { path: 'settings', component: SettingsComponent }, { path: 'patients', component: PortalPagesComponent, data: { page: 'patients' } }, { path: 'vaccinations', component: PortalPagesComponent, data: { page: 'vaccinations' } }, { path: 'analytics', component: PortalPagesComponent, data: { page: 'analytics' } }, { path: 'assistant', component: PortalPagesComponent, data: { page: 'assistant' } }, { path: '', redirectTo: 'dashboard', pathMatch: 'full' }];
const routes: Routes = [{ path: 'login', component: LoginComponent }, { path: 'owner', canActivate: [RoleGuard], data: { role: 'OWNER' }, children: [{ path: 'dashboard', component: OwnerDashboardComponent }, { path: 'appointments', component: OwnerAppointmentsComponent }, { path: 'book-appointment', component: BookAppointmentComponent }, { path: 'pets', component: PetsComponent }, { path: 'pet-care', component: PortalPagesComponent, data: { page: 'care' } }, { path: 'profile', component: PortalPagesComponent, data: { page: 'profile' } }, { path: 'ai-assistant', component: AiAssistantComponent }, { path: '', redirectTo: 'dashboard', pathMatch: 'full' }] }, { path: 'clinic', canActivate: [RoleGuard], data: { role: 'ADMIN' }, children: clinicChildren }, { path: 'admin', canActivate: [RoleGuard], data: { role: 'ADMIN' }, children: clinicChildren }, { path: '', redirectTo: 'login', pathMatch: 'full' }, { path: '**', redirectTo: 'login' }];
@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] }) export class AppRoutingModule {}
