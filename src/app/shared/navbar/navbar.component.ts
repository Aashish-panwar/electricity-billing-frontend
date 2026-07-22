import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  private authService = inject(AuthService);

  private router = inject(Router);

  email = this.authService.getEmail();

  role = this.authService.getRole();

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}