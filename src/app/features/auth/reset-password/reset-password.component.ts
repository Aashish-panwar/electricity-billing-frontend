import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div class="card shadow p-4" style="width: 400px; border-radius: 10px;">
        <div class="text-center mb-4">
          <i class="fa-solid fa-lock text-warning fs-1 mb-2"></i>
          <h4>Reset Password</h4>
          <p class="text-muted small">Enter your new password below</p>
        </div>

        <div *ngIf="!token" class="alert alert-danger text-center">
          Invalid or missing reset token.
        </div>

        <form *ngIf="token" (ngSubmit)="onSubmit()" #form="ngForm">
          <div class="mb-3">
            <label class="form-label fw-semibold">New Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Min 6 characters"
              [(ngModel)]="newPassword"
              name="newPassword"
              required
              minlength="6"
              #passwordInput="ngModel"
              [ngClass]="{ 'is-invalid': passwordInput.invalid && (passwordInput.dirty || passwordInput.touched) }"
            >
            <div class="invalid-feedback">
              Password must be at least 6 characters long.
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary w-100 mb-3"
            [disabled]="form.invalid || loading"
          >
            <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  `
})
export class ResetPasswordComponent implements OnInit {
  newPassword = '';
  token: string | null = null;
  loading = false;
  
  private authService = inject(AuthService);
  private alert = inject(AlertService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  onSubmit(): void {
    if (!this.token || !this.newPassword) return;
    
    this.loading = true;
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: (msg) => {
        this.loading = false;
        this.alert.success('Password Reset', msg);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading = false;
        this.alert.error('Error', 'Unable to reset password. Token may be expired.');
      }
    });
  }
}
