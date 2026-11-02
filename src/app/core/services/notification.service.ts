import {Injectable} from '@angular/core';import {BehaviorSubject} from 'rxjs';
@Injectable({providedIn:'root'}) export class NotificationService{private s=new BehaviorSubject('');message$=this.s.asObservable();show(m:string){this.s.next(m);}clear(){this.s.next('');}}
