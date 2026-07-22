import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Profile } from '../models/profile.model';
import { ChangePassword } from '../models/change-password.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/profile`;

  getProfile(): Observable<Profile> {

    return this.http.get<Profile>(this.apiUrl);

  }

  updateProfile(profile: Profile): Observable<Profile> {

    return this.http.put<Profile>(
      this.apiUrl,
      profile
    );

  }

  changePassword(request: ChangePassword) {

  return this.http.put(
    `${this.apiUrl}/change-password`,
    request
  );

}

}