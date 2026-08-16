import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5 text-center">
      <div class="card shadow p-5">
        <i class="fa-solid fa-circle-check text-success" style="font-size: 5rem;"></i>
        <h2 class="mt-4">Payment Successful!</h2>
        <p class="text-muted">Thank you. Your bill payment has been securely processed via Stripe.</p>
        <p *ngIf="billId">Bill ID: <strong>{{ billId }}</strong></p>
        <button class="btn btn-primary mt-4" (click)="goToDashboard()">
          Return to Dashboard
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class PaymentSuccessComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  billId: string | null = null;

  ngOnInit(): void {
    this.billId = this.route.snapshot.queryParamMap.get('bill_id');
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
