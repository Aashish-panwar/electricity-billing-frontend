import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ConsumerService } from '../../../services/consumer.service';
import { AlertService } from '../../../core/services/alert.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-add-consumer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './add-consumer.component.html',
  styleUrl: './add-consumer.component.scss'
})
export class AddConsumerComponent {

  private fb = inject(FormBuilder);
  private consumerService = inject(ConsumerService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private notification = inject(NotificationService);


  loading = false;

  consumerTypes = [
    'DOMESTIC',
    'COMMERCIAL',
    'INDUSTRIAL'
  ];

  consumerForm = this.fb.group({

    consumerNumber: ['', Validators.required],

    fullName: ['', Validators.required],

    mobileNumber: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    address: ['', Validators.required],

    city: ['', Validators.required],

    state: ['', Validators.required],

    pinCode: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{6}$')
      ]
    ],

    consumerType: ['', Validators.required],

    userId: [null, Validators.required]

  });

  saveConsumer(): void {

    if (this.consumerForm.invalid) {

      this.consumerForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.consumerService.addConsumer(
      this.consumerForm.value as any
    ).subscribe({

      next: () => {

        this.alert.success(
          'Success',
          'Consumer Added Successfully'
        );

        this.notification.success(
          'Consumer',
          'New consumer added successfully.'
        );

        this.router.navigate(['/consumers']);

      },

      error: (err) => {

        this.loading = false;

        this.alert.error(
          'Error',
          err?.error?.message || 'Unable to Save Consumer'
        );

        this.notification.error(
          'Consumer',
          err?.error?.message || 'Unable to save consumer.'
        );

        console.error(err);

      },

      complete: () => {

        this.loading = false;

      }

    });

  }

}