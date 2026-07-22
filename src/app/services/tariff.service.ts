import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Tariff } from '../models/tariff.model';

@Injectable({
  providedIn: 'root'
})
export class TariffService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/tariffs`;

  getAllTariffs(): Observable<Tariff[]> {
    return this.http.get<Tariff[]>(this.apiUrl);
  }

  getTariff(id: number): Observable<Tariff> {
    return this.http.get<Tariff>(
      `${this.apiUrl}/${id}`
    );
  }

  addTariff(tariff: Tariff): Observable<Tariff> {
    return this.http.post<Tariff>(
      this.apiUrl,
      tariff
    );
  }

  updateTariff(
    id: number,
    tariff: Tariff
  ): Observable<Tariff> {

    return this.http.put<Tariff>(
      `${this.apiUrl}/${id}`,
      tariff
    );
  }

  deleteTariff(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

}