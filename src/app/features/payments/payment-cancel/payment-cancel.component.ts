import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-cancel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5 text-center">
      <div class="card shadow p-5">
        <i class="fa-solid fa-circle-xmark text-danger" style="font-size: 5rem;"></i>
        <h2 class="mt-4">Payment Cancelled</h2>
        <p class="text-muted">You cancelled the payment process. No charges were made.</p>
        <button class="btn btn-primary mt-4" (click)="goToBills()">
          Return to Bills
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class PaymentCancelComponent {
  private router = inject(Router);

  goToBills(): void {
    this.router.navigate(['/bills']);
  }
}
