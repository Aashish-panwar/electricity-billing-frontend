import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MeterService } from '../../../services/meter.service';
import { ConsumerService } from '../../../services/consumer.service';
import { Consumer } from '../../../models/consumer';
import { AlertService } from '../../../core/services/alert.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-add-meter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './add-meter.component.html',
  styleUrl: './add-meter.component.scss'
})
export class AddMeterComponent implements OnInit {

  private fb = inject(FormBuilder);
  private meterService = inject(MeterService);
  private consumerService = inject(ConsumerService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private notification = inject(NotificationService);


  consumers: Consumer[] = [];

  loading = false;

  meterForm = this.fb.group({

    meterNumber: ['', Validators.required],

    manufacturer: ['', Validators.required],

    model: ['', Validators.required],

    installationYear: [new Date().getFullYear(), Validators.required],

    status: ['ACTIVE', Validators.required],

    currentReading: [0, Validators.required],

    consumerId: [null, Validators.required]

  });

  ngOnInit(): void {
    this.loadConsumers();
  }

  loadConsumers(): void {

    this.consumerService.getAllConsumers().subscribe({

      next: data => this.consumers = data,

      error: err => console.log(err)

    });

  }

  saveMeter(): void {

    if (this.meterForm.invalid) {

      this.meterForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.meterService.addMeter(this.meterForm.value as any)

      .subscribe({

        next: () => {
          
          this.loading = false;
          this.notification.success(
            'Meter Added',
            'New meter has been added successfully.'
          );
          
          this.alert.success(
            'Success',
            'Meter Added Successfully'
          );
          
          this.router.navigate(['/meters']);
        
        },

        error: (err) => {

          this.loading = false;

          this.alert.error(
            'Error',
            err?.error?.message || 'Unable to add meter'
          );

        }

      });

  }

}