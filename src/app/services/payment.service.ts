import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Payment } from '../models/payment.model';
import { PaymentRequest } from '../models/payment-request';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/payments`;

  getAllPayments(): Observable<Payment[]> {

    return this.http.get<Payment[]>(this.apiUrl);

  }

  getPayment(id: number): Observable<Payment> {

    return this.http.get<Payment>(
      `${this.apiUrl}/${id}`
    );

  }

  makePayment(request: PaymentRequest): Observable<Payment> {

    return this.http.post<Payment>(
      this.apiUrl,
      request
    );

  }

  deletePayment(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

}