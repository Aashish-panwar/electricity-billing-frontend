import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SystemNotification {
  id: number;
  message: string;
  isRead: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class SystemNotificationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/notifications`;

  getNotifications(consumerId: number): Observable<SystemNotification[]> {
    return this.http.get<SystemNotification[]>(`${this.apiUrl}/consumer/${consumerId}`);
  }

  getUnreadCount(consumerId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/consumer/${consumerId}/unread-count`);
  }

  getUnreadNotifications(consumerId: number): Observable<SystemNotification[]> {
    return this.http.get<SystemNotification[]>(`${this.apiUrl}/consumer/${consumerId}/unread`);
  }

  markAsRead(notificationId: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${notificationId}/read`, {}, { responseType: 'text' as 'json' });
  }

  deleteNotification(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`, { responseType: 'text' as 'json' });
  }
}
