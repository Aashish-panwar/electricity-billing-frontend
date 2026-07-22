import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { TariffService } from '../../../services/tariff.service';
import { Tariff } from '../../../models/tariff.model';
import { AlertService } from '../../../core/services/alert.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-edit-tariff',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-tariff.component.html',
  styleUrl: './edit-tariff.component.scss'
})
export class EditTariffComponent implements OnInit {

  private fb = inject(FormBuilder);
  private tariffService = inject(TariffService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private alert = inject(AlertService);
  private notification = inject(NotificationService);
  

  id!: number;

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

  ngOnInit(): void {

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadTariff();

  }

  loadTariff(): void {

    this.tariffService
      .getTariff(this.id)
      .subscribe({

        next: (data: Tariff) => {

          this.tariffForm.patchValue(data);

        },

        error: (err) => {

          console.log(err);

          this.alert.error(
            'Error',
            'Unable to load tariff'
          );

        }

      });

  }

  updateTariff(): void {

    if (this.tariffForm.invalid) {

      this.tariffForm.markAllAsTouched();

      return;

    }

    this.tariffService
      .updateTariff(
        this.id,
        this.tariffForm.getRawValue() as Tariff
      )
      .subscribe({

        next: () => {

          this.notification.info(
            'Tariff Updated',
            'Tariff has been updated successfully.'
          );

          this.alert.success(
            'Success',
            'Tariff Updated Successfully'
          );

          this.router.navigate([
            '/tariffs'
          ]);

        },

        error: (err) => {

          this.alert.error(
            'Error',
            err?.error?.message || 'Unable to update tariff'
          );

        }

      });

  }

}