import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { BillService } from '../../../services/bill.service';
import { MeterReading } from '../../../models/meter-reading';
import { AlertService } from '../../../core/services/alert.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-generate-bill',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './generate-bill.component.html',
  styleUrl: './generate-bill.component.scss'
})
export class GenerateBillComponent implements OnInit {

  private fb = inject(FormBuilder);
  private billService = inject(BillService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private notification = inject(NotificationService);
  

  readings: MeterReading[] = [];

  billForm = this.fb.group({

    meterReadingId: this.fb.control<number | null>(
      null,
      Validators.required
    )

  });

  ngOnInit(): void {

    this.loadReadings();

  }

  loadReadings(): void {

    this.billService
      .getMeterReadings()
      .subscribe({

        next: (data) => {

          this.readings = data;

        },

        error: (err) => {

          console.error(err);

          this.alert.error(
            'Error',
            'Unable to load meter readings.'
          );

        }

      });

  }

  generateBill(): void {

    if (this.billForm.invalid) {

      this.billForm.markAllAsTouched();

      return;

    }

    this.billService
      .generateBill(this.billForm.getRawValue() as any)
      .subscribe({

        next: () => {

          this.notification.success(
            'Bill Generated',
            'Electricity bill has been generated successfully.'
          );

          this.alert.success(
            'Success',
            'Bill Generated Successfully'
          );

          this.router.navigate(['/bills']);

        },

        error: (err) => {

          console.error(err);

          this.alert.error(
            'Error',
            err?.error?.message || 'Unable to Generate Bill'
          );

        }

      });

  }

}