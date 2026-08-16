import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div class="card shadow p-4" style="width: 400px; border-radius: 10px;">
        <div class="text-center mb-4">
          <i class="fa-solid fa-bolt text-warning fs-1 mb-2"></i>
          <h4>Forgot Password</h4>
          <p class="text-muted small">Enter your email to receive a reset link</p>
        </div>

        <form (ngSubmit)="onSubmit()" #form="ngForm">
          <div class="mb-3">
            <label class="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              class="form-control"
              placeholder="name@example.com"
              [(ngModel)]="email"
              name="email"
              required
              #emailInput="ngModel"
              [ngClass]="{ 'is-invalid': emailInput.invalid && (emailInput.dirty || emailInput.touched) }"
            >
            <div class="invalid-feedback">
              Please provide a valid email.
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary w-100 mb-3"
            [disabled]="form.invalid || loading"
          >
            <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
            Send Reset Link
          </button>

          <div class="text-center">
            <a routerLink="/login" class="text-decoration-none small">
              <i class="fa-solid fa-arrow-left me-1"></i> Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  email = '';
  loading = false;
  
  private authService = inject(AuthService);
  private alert = inject(AlertService);
  private router = inject(Router);

  onSubmit(): void {
    if (!this.email) return;
    
    this.loading = true;
    this.authService.forgotPassword(this.email).subscribe({
      next: (msg) => {
        this.loading = false;
        this.alert.success('Email Sent', msg);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading = false;
        this.alert.error('Error', 'Unable to send reset link. Please try again.');
      }
    });
  }
}
