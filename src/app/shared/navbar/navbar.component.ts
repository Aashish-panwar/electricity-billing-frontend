import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { SystemNotificationService, SystemNotification } from '../../services/system-notification.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(SystemNotificationService);
  private profileService = inject(ProfileService);

  email = this.authService.getEmail();
  role = this.authService.getRole();
  consumerId?: number;

  notifications: SystemNotification[] = [];
  unreadCount = 0;

  ngOnInit(): void {
    if (this.role === 'ROLE_CONSUMER') {
      this.profileService.getProfile().subscribe({
        next: (profile) => {
          this.consumerId = profile.id;
          this.loadNotifications();
        }
      });
    }
  }

  loadNotifications(): void {
    if (!this.consumerId) return;
    this.notificationService.getUnreadNotifications(this.consumerId).subscribe({
      next: (data) => {
        this.notifications = data;
        this.unreadCount = data.length;
      }
    });
  }

  markAsRead(notificationId: number): void {
    this.notificationService.markAsRead(notificationId).subscribe(() => {
      this.loadNotifications();
    });
  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}