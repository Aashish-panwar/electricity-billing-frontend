import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.scss'
})
export class AccessDeniedComponent {
  private router = inject(Router);

  goHome() {
    const role = localStorage.getItem('role');
    if (role === 'ROLE_CONSUMER') {
      this.router.navigate(['/bills']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}