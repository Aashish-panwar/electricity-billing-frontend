import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { MeterReading } from '../models/meter-reading';

@Injectable({
  providedIn: 'root'
})
export class MeterReadingService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/meter-readings`;

  getAllReadings(): Observable<MeterReading[]> {
    return this.http.get<MeterReading[]>(this.apiUrl);
  }

  getReading(id: number): Observable<MeterReading> {
    return this.http.get<MeterReading>(
      `${this.apiUrl}/${id}`
    );
  }

  getReadingsByMeter(meterId: number): Observable<MeterReading[]> {
    return this.http.get<MeterReading[]>(
      `${this.apiUrl}/meter/${meterId}`
    );
  }

  addReading(reading: MeterReading): Observable<MeterReading> {
    return this.http.post<MeterReading>(
      this.apiUrl,
      reading
    );
  }

  updateReading(
    id: number,
    reading: MeterReading
  ): Observable<MeterReading> {

    return this.http.put<MeterReading>(
      `${this.apiUrl}/${id}`,
      reading
    );
  }

  deleteReading(id:number){

   return this.http.delete<void>(
      `${this.apiUrl}/${id}`
   );

}

  

}