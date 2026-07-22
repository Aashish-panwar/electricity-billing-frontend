import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/reports`;

  getRevenueReport(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/revenue`
    );

  }

  getConsumerReport(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/consumer`
    );

  }

  getMonthlyReport(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/monthly`
    );

  }

}