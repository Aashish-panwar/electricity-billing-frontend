import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormControl
} from '@angular/forms';
import { NotificationService } from '../../../core/services/notification.service';

import {
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';

import { MeterService } from '../../../services/meter.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-edit-meter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './edit-meter.component.html',
  styleUrl: './edit-meter.component.scss'
})
export class EditMeterComponent implements OnInit {

  private fb = inject(FormBuilder);
  private meterService = inject(MeterService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private alert = inject(AlertService);
  private notification = inject(NotificationService);
  

  meterId!: number;

  loading = false;

  meterForm = this.fb.group({

    meterNumber: [
      '',
      Validators.required
    ],

    manufacturer: [
      '',
      Validators.required
    ],

    model: [
      '',
      Validators.required
    ],

    installationYear: [
      new Date().getFullYear(),
      Validators.required
    ],

    status: [
      'ACTIVE',
      Validators.required
    ],

    currentReading: [
      0,
      Validators.required
    ],

    consumerId: new FormControl<number | null>(
      null,
      Validators.required
    )

  });

  ngOnInit(): void {

    this.meterId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadMeter();

  }

  loadMeter(): void {

    this.meterService.getMeter(this.meterId).subscribe({

      next: (data) => {

        this.meterForm.patchValue({

          meterNumber: data.meterNumber,
          manufacturer: data.manufacturer,
          model: data.model,
          installationYear: data.installationYear,
          status: data.status,
          currentReading: data.currentReading,
          consumerId: data.consumerId

        });

      },

      error: () => {

        this.alert.error(
          'Error',
          'Unable to load meter.'
        );

      }

    });

  }

  updateMeter(): void {

    if (this.meterForm.invalid) {

      this.meterForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.meterService.updateMeter(
      this.meterId,
      this.meterForm.value as any
    ).subscribe({

      next: () => {

        this.loading = false;

        this.notification.info(
          'Meter Updated',
          'Meter information has been updated.'
        );

        this.alert.success(
          'Success',
          'Meter Updated Successfully'
        );



        this.router.navigate(['/meters']);

      },

      error: (err) => {

        this.loading = false;

        this.alert.error(
          'Error',
          err?.error?.message || 'Unable to update meter.'
        );

      }

    });

  }

}