import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { NotificationService } from '../../../core/services/notification.service';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { MeterService } from '../../../services/meter.service';
import { MeterReadingService } from '../../../services/meter-reading.service';
import { AlertService } from '../../../core/services/alert.service';

import { Meter } from '../../../models/meter';

@Component({
  selector: 'app-edit-meter-reading',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-meter-reading.component.html',
  styleUrls: ['./edit-meter-reading.component.scss']
})
export class EditMeterReadingComponent implements OnInit {

  private fb = inject(FormBuilder);

  private meterService = inject(MeterService);

  private meterReadingService = inject(MeterReadingService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private alert = inject(AlertService);

  private notification = inject(NotificationService);


  id!: number;

  meters: Meter[] = [];

  readingForm = this.fb.group({

    meterId: this.fb.control<number | null>(
      null,
      Validators.required
    ),

    currentReading: this.fb.control<number | null>(
      null,
      Validators.required
    ),

    billingMonth: this.fb.control<number | null>(
      null,
      Validators.required
    ),

    billingYear: this.fb.control<number | null>(
      null,
      Validators.required
    ),

    readingDate: this.fb.control<string | null>(
      '',
      Validators.required
    ),

    remarks: this.fb.control<string | null>('')

  });

  ngOnInit(): void {

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadMeters();

    this.loadReading();

  }

  loadMeters(): void {

    this.meterService.getAllMeters()
      .subscribe({

        next: (data: Meter[]) => {

          this.meters = data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  loadReading(): void {

    this.meterReadingService
      .getReading(this.id)
      .subscribe({

        next: (data) => {

          this.readingForm.patchValue({

            meterId: data.meterId,

            currentReading: data.currentReading,

            billingMonth: data.billingMonth,

            billingYear: data.billingYear,

            readingDate: data.readingDate,

            remarks: data.remarks

          });

        },

        error: (err) => {

          console.log(err);

          this.alert.error(
            'Error',
            'Unable to load meter reading.'
          );

        }

      });

  }

  updateReading(): void {

    if (this.readingForm.invalid) {

      this.readingForm.markAllAsTouched();

      return;

    }

    this.meterReadingService
      .updateReading(
        this.id,
        this.readingForm.getRawValue() as any
      )
      .subscribe({

        next: () => {

          this.notification.info(
            'Meter Reading Updated',
            'Meter reading has been updated successfully.'
          );

          this.alert.success(
            'Success',
            'Meter Reading Updated Successfully'
          );

          this.router.navigate([
            '/meter-readings'
          ]);

        },

        error: (err) => {

          console.log(err);

          this.alert.error(
            'Error',
            err?.error?.message ?? 'Unable to update meter reading.'
          );

        }

      });

  }

}