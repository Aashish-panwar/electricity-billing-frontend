import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private getPayload(): any {

    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Invalid JWT Token', error);
      return null;
    }
  }

  getRole(): string | null {

    const payload = this.getPayload();

    if (!payload) {
      return null;
    }

    console.log('JWT Payload:', payload);

    // Case 1
    if (typeof payload.role === 'string') {
      return payload.role;
    }

    // Case 2
    if (Array.isArray(payload.roles) && payload.roles.length > 0) {
      return payload.roles[0];
    }

    // Case 3
    if (Array.isArray(payload.authorities) && payload.authorities.length > 0) {
      return payload.authorities[0];
    }

    return null;
  }

  hasRole(role: string): boolean {
    return this.getRole() === role;
  }

  hasAnyRole(roles: string[]): boolean {

    const currentRole = this.getRole();

    console.log('Current Role:', currentRole);
    console.log('Allowed Roles:', roles);

    return currentRole ? roles.includes(currentRole) : false;
  }
}
