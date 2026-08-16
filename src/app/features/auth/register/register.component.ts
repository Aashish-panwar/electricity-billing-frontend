import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { NotificationService } from '../../../core/services/notification.service';

import { RegisterRequest } from '../../../models/register-request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
  CommonModule,
  ReactiveFormsModule,
  RouterLink
],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private notification = inject(NotificationService);

  hidePassword = true;

  loading = false;

  registerForm = this.fb.group({

    fullName: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],

    mobileNumber: [
      '',
      [
        Validators.required,
        Validators.pattern('^[6-9]\\d{9}$')
      ]
    ],

    role: [
      'ROLE_CONSUMER',
      Validators.required
    ]

  });

  register(): void {

    if (this.registerForm.invalid) {

      this.alert.error(
        'Validation Error',
        'Please fill all required fields correctly.'
      );

      return;

    }

    this.loading = true;

    this.authService
      .register(this.registerForm.value as RegisterRequest)
      .subscribe({

        next: (response: any) => {

          this.alert.success(
            'Registration Successful',
            response.message
          );

          this.notification.success(
            'Account Created',
            'Please login to continue.'
          );

          this.router.navigate(['/login']);

        },

        error: (error) => {

          this.loading = false;

          this.alert.error(
            'Registration Failed',
            error?.error?.message || 'Unable to register.'
          );

        },

        complete: () => {

          this.loading = false;

        }

      });

  }

}