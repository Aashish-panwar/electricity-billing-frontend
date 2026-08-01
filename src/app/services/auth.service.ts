import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { LoginRequest } from '../models/login-request';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/auth`;

  // =========================
  // Login
  // =========================

  login(request: LoginRequest): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      request
    );

  }

  // =========================
  // Register
  // =========================

  register(request: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/register`,
      request
    );

  }

  // =========================
  // Logout
  // =========================

  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');

  }

  // =========================
  // Save Login Details
  // =========================

  saveAuth(response: AuthResponse): void {

    localStorage.setItem('token', response.token);
    localStorage.setItem('email', response.email);
    localStorage.setItem('role', response.role);

  }

  // =========================
  // Get Token
  // =========================

  getToken(): string | null {

    return localStorage.getItem('token');

  }

  // =========================
  // Get Role
  // =========================

  getRole(): string | null {

    return localStorage.getItem('role');

  }

  // =========================
  // Get Email
  // =========================

  getEmail(): string | null {

    return localStorage.getItem('email');

  }

  // =========================
  // Is Logged In
  // =========================

  isLoggedIn(): boolean {

    return this.getToken() !== null;

  }

}