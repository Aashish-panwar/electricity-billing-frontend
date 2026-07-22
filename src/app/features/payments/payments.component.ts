import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit {

  private paymentService = inject(PaymentService);

  payments: Payment[] = [];

  loading = false;

  ngOnInit(): void {

    this.loadPayments();

  }

  loadPayments(): void {

    this.loading = true;

    this.paymentService.getAllPayments().subscribe({

      next: (data) => {

        this.payments = data;

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      }

    });

  }

}