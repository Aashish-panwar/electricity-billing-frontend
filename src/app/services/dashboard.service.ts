import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Dashboard } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/dashboard`;

  getStatistics(): Observable<Dashboard> {

    return this.http.get<Dashboard>(
      `${this.apiUrl}/statistics`
    );

  }

  getMonthlyRevenue(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/monthly-revenue`
    );

  }

  getMonthlyUnits() {

  return this.http.get<any[]>(

    `${environment.apiUrl}/dashboard/monthly-units`

  );

}

getMonthlyBills() {

  return this.http.get<any[]>(

    `${environment.apiUrl}/dashboard/monthly-bills`

  );

}



}