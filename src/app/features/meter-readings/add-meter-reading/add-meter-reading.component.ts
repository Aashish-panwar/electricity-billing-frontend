import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterModule } from '@angular/router';

import { MeterService } from '../../../services/meter.service';
import { MeterReadingService } from '../../../services/meter-reading.service';
import { AlertService } from '../../../core/services/alert.service';

import { Meter } from '../../../models/meter';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-add-meter-reading',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './add-meter-reading.component.html',
  styleUrl: './add-meter-reading.component.scss'
})
export class AddMeterReadingComponent implements OnInit {

  private fb = inject(FormBuilder);
  private meterService = inject(MeterService);
  private meterReadingService = inject(MeterReadingService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private notification = inject(NotificationService);


  meters: Meter[] = [];

  loading = false;

  readingForm = this.fb.group({

    meterId: [
      null,
      Validators.required
    ],

    currentReading: [
      null,
      Validators.required
    ],

    billingMonth: [
      new Date().getMonth() + 1,
      Validators.required
    ],

    billingYear: [
      new Date().getFullYear(),
      Validators.required
    ],

    readingDate: [
      new Date().toISOString().substring(0, 10),
      Validators.required
    ],

    remarks: ['']

  });

  ngOnInit(): void {

    this.loadMeters();

  }

  loadMeters(): void {

    this.meterService.getAllMeters().subscribe({

      next: data => this.meters = data,

      error: err => console.log(err)

    });

  }

  saveReading(): void {

    if (this.readingForm.invalid) {

      this.readingForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.meterReadingService
      .addReading(this.readingForm.value as any)
      .subscribe({

        next: () => {

          this.loading = false;

          this.notification.success(
            'Meter Reading Added',
            'New meter reading has been recorded successfully.'
          );

          this.alert.success(
            'Success',
            'Meter Reading Added Successfully'
          );

          this.router.navigate([
            '/meter-readings'
          ]);

        },

        error: err => {

          this.loading = false;

          this.alert.error(
            'Error',
            err.error?.message ?? 'Unable to save reading.'
          );

        }

      });

  }

}