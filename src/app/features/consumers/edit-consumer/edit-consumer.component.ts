import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ConsumerService } from '../../../services/consumer.service';
import { AlertService } from '../../../core/services/alert.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-edit-consumer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './edit-consumer.component.html',
  styleUrl: './edit-consumer.component.scss'
})
export class EditConsumerComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private consumerService = inject(ConsumerService);
  private alert = inject(AlertService);
  private notification = inject(NotificationService);

  consumerId!: number;

  loading = false;

  consumerTypes = [
    'DOMESTIC',
    'COMMERCIAL',
    'INDUSTRIAL'
  ];

  consumerForm = this.fb.group({

    consumerNumber: [
      { value: '', disabled: true }
    ],

    fullName: [
      '',
      Validators.required
    ],

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

    address: [
      '',
      Validators.required
    ],

    city: [
      '',
      Validators.required
    ],

    state: [
      '',
      Validators.required
    ],

    pinCode: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{6}$')
      ]
    ],

    consumerType: [
      '',
      Validators.required
    ]

  });

  ngOnInit(): void {

    this.consumerId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadConsumer();

  }

  loadConsumer(): void {

    this.consumerService
      .getConsumer(this.consumerId)
      .subscribe({

        next: (data) => {

          this.consumerForm.patchValue({

            consumerNumber: data.consumerNumber,
            fullName: data.fullName,
            mobileNumber: data.mobileNumber,
            email: data.email,
            address: data.address,
            city: data.city,
            state: data.state,
            pinCode: data.pinCode,
            consumerType: data.consumerType

          });

        },

        error: () => {

          this.alert.error(
            'Error',
            'Unable to load consumer'
          );

        }

      });

  }

  updateConsumer(): void {

    if (this.consumerForm.invalid) {

      this.consumerForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    const request = this.consumerForm.getRawValue();

    this.consumerService
      .updateConsumer(
        this.consumerId,
        request as any
      )
      .subscribe({

        next: () => {

          this.alert.success(
            'Success',
            'Consumer Updated Successfully'
          );

          this.notification.success(
            'Consumer',
            'Consumer updated successfully.'
          );

          this.router.navigate([
            '/consumers'
          ]);

        },

        error: (err) => {

          this.loading = false;

          this.alert.error(
            'Error',
            err?.error?.message || 'Update failed'
          );

          this.notification.error(
            'Consumer',
            err?.error?.message || 'Unable to update consumer.'
          );

        },

        complete: () => {

          this.loading = false;

        }

      });

  }

}