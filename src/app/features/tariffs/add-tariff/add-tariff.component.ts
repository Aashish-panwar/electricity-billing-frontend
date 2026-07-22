import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { TariffService } from '../../../services/tariff.service';
import { AlertService } from '../../../core/services/alert.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-add-tariff',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-tariff.component.html',
  styleUrl: './add-tariff.component.scss'
})
export class AddTariffComponent {

  private fb = inject(FormBuilder);
  private tariffService = inject(TariffService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private notification = inject(NotificationService);


  tariffForm = this.fb.group({

    tariffName: ['', Validators.required],

    ratePerUnit: [0, Validators.required],

    fixedCharge: [0, Validators.required],

    electricityDuty: [0],

    fuelSurcharge: [0],

    effectiveFrom: ['', Validators.required],

    effectiveTo: [''],

    description: ['']

  });

  saveTariff(): void {

    if (this.tariffForm.invalid) {

      this.tariffForm.markAllAsTouched();

      return;

    }

    this.tariffService
      .addTariff(this.tariffForm.getRawValue() as any)
      .subscribe({

        next: () => {

          this.notification.success(
            'Tariff Added',
            'New tariff has been added successfully.'
          );

          this.alert.success(
            'Success',
            'Tariff Added Successfully'
          );

          this.router.navigate(['/tariffs']);

        },

        error: (err) => {

          this.alert.error(
            'Error',
            err?.error?.message || 'Unable to add tariff'
          );

        }

      });

  }

}