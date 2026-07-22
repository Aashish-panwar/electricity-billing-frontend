import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Bill } from '../models/bill.model';
import { MeterReading } from '../models/meter-reading';
import { BillRequest } from '../models/bill-request';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/bills`;

  getAllBills(): Observable<Bill[]> {

    return this.http.get<Bill[]>(this.apiUrl);

  }

  getBill(id: number): Observable<Bill> {

    return this.http.get<Bill>(
      `${this.apiUrl}/${id}`
    );

  }

  generateBill(request: BillRequest): Observable<Bill> {

    return this.http.post<Bill>(
      this.apiUrl,
      request
    );

  }

  deleteBill(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

  downloadBill(id: number): Observable<Blob> {

    return this.http.get(
      `${this.apiUrl}/${id}/download`,
      {
        responseType: 'blob'
      }
    );

  }

  getMeterReadings(): Observable<MeterReading[]> {

    return this.http.get<MeterReading[]>(
      `${environment.apiUrl}/meter-readings`
    );

  }

}