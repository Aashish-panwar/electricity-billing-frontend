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



  login(request: LoginRequest): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      request
    );

  }



  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');

  }



  saveAuth(response: AuthResponse): void {

    localStorage.setItem('token', response.token);
    localStorage.setItem('email', response.email);
    localStorage.setItem('role', response.role);

  }



  getToken(): string | null {

    return localStorage.getItem('token');

  }



  getRole(): string | null {

    return localStorage.getItem('role');

  }



  getEmail(): string | null {

    return localStorage.getItem('email');

  }



  isLoggedIn(): boolean {

    return this.getToken() !== null;

  }

}