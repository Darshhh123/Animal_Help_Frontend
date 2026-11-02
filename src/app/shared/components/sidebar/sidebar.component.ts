import {Component,Input} from '@angular/core';import {AuthService} from '../../../core/services/auth.service';
@Component({selector:'app-sidebar',templateUrl:'./sidebar.component.html'})export class SidebarComponent{@Input()role:'OWNER'|'ADMIN'='OWNER';constructor(public auth:AuthService){}logout(){this.auth.logout();location.href='/login';}}
