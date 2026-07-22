import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Consumer } from '../models/consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/consumers`;

  getAllConsumers(): Observable<Consumer[]> {
    return this.http.get<Consumer[]>(this.apiUrl);
  }

  getConsumer(id: number): Observable<Consumer> {
    return this.http.get<Consumer>(`${this.apiUrl}/${id}`);
  }

  addConsumer(consumer: Consumer): Observable<Consumer> {
    return this.http.post<Consumer>(this.apiUrl, consumer);
  }

  updateConsumer(id: number, consumer: Consumer): Observable<Consumer> {
    return this.http.put<Consumer>(`${this.apiUrl}/${id}`, consumer);
  }

  deleteConsumer(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text'
    });
  }
}