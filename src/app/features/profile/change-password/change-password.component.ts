import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ProfileService } from '../../../services/profile.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  private fb = inject(FormBuilder);

  private profileService = inject(ProfileService);

  private alert = inject(AlertService);

  hideCurrent = true;

  hideNew = true;

  hideConfirm = true;

  passwordForm = this.fb.group({

    currentPassword: [

      '',

      [
        Validators.required
      ]

    ],

    newPassword: [

      '',

      [
        Validators.required,
        Validators.minLength(6)
      ]

    ],

    confirmPassword: [

      '',

      [
        Validators.required
      ]

    ]

  });

  changePassword(): void {

    if (this.passwordForm.invalid) {

      this.passwordForm.markAllAsTouched();

      return;

    }

    const {

      currentPassword,

      newPassword,

      confirmPassword

    } = this.passwordForm.getRawValue();

    if (newPassword !== confirmPassword) {

      this.alert.error(
        'Error',
        'New Password and Confirm Password do not match.'
      );

      return;

    }

    this.profileService.changePassword({

      currentPassword: currentPassword!,

      newPassword: newPassword!

    }).subscribe({

      next: () => {

        this.alert.success(
          'Success',
          'Password changed successfully.'
        );

        this.passwordForm.reset();

      },

      error: (err) => {

        console.log(err);

        this.alert.error(
          'Error',
          err.error?.message || 'Unable to change password.'
        );

      }

    });

  }

}