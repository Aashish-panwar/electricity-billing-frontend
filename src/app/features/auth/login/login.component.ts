import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { NotificationService } from '../../../core/services/notification.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private notification = inject(NotificationService);


  hidePassword = true;

  loading = false;

  loginForm = this.fb.group({

    email: ['', [Validators.required, Validators.email]],

    password: ['', Validators.required]

  });

  login(): void {

    if (this.loginForm.invalid) {

      this.alert.error(
        'Validation Error',
        'Please enter valid credentials.'
      );

      return;

    }

    this.loading = true;

    this.authService.login(this.loginForm.value as any)
      .subscribe({

        next: (response) => {

          this.authService.saveAuth(response);

          this.alert.success(
            'Success',
            response.message
          );
          
          this.notification.success(
            'Login Successful',
            'Welcome back!'
          );

          this.router.navigate(['/dashboard']);

        },

        error: () => {

          this.loading = false;

          this.alert.error(
            'Login Failed',
            'Invalid email or password.'
          );

        },

        complete: () => {

          this.loading = false;

        }

      });

  }

}