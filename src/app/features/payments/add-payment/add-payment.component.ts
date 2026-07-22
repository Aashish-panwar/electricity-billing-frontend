import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { BillService } from '../../../services/bill.service';
import { PaymentService } from '../../../services/payment.service';
import { AlertService } from '../../../core/services/alert.service';

import { Bill } from '../../../models/bill.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-add-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.scss'
})
export class AddPaymentComponent implements OnInit {

  private fb = inject(FormBuilder);

  private billService = inject(BillService);

  private paymentService = inject(PaymentService);

  private router = inject(Router);

  private alert = inject(AlertService);

  private notification = inject(NotificationService);


  bills: Bill[] = [];

  paymentForm = this.fb.group({

    billId: this.fb.control<number | null>(
      null,
      Validators.required
    ),

    amount: this.fb.control<number | null>(
      null,
      Validators.required
    ),

    paymentMethod: this.fb.control<string>(
      'CASH',
      Validators.required
    ),

    remarks: this.fb.control<string>('')

  });

  ngOnInit(): void {

    this.loadBills();

  }

  loadBills(): void {

    this.billService
      .getAllBills()
      .subscribe({

        next: (data) => {

          this.bills = data;

        },

        error: (err) => {

          console.error(err);

          this.alert.error(
            'Error',
            'Unable to load bills.'
          );

        }

      });

  }

  savePayment(): void {

    if (this.paymentForm.invalid) {

      this.paymentForm.markAllAsTouched();

      return;

    }

    this.paymentService
      .makePayment(this.paymentForm.getRawValue() as any)
      .subscribe({

        next: () => {

          this.notification.success(
            'Payment Successful',
            'Payment has been completed successfully.'
          );


          this.alert.success(
            'Success',
            'Payment Completed Successfully'
          );

          this.router.navigate([
            '/payments'
          ]);

        },

        error: (err) => {

          console.error(err);

          this.alert.error(
            'Error',
            err?.error?.message || 'Unable to make payment.'
          );

        }

      });

  }

}