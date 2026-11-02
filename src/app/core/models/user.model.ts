export type UserRole='OWNER'|'ADMIN';
export interface User {id:string;name:string;email:string;role:UserRole;clinicName?:string;}
