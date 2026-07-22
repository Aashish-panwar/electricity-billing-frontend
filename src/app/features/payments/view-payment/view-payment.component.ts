import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { PaymentService } from '../../../services/payment.service';
import { Payment } from '../../../models/payment.model';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-view-payment',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './view-payment.component.html',
  styleUrl: './view-payment.component.scss'
})
export class ViewPaymentComponent implements OnInit {

  private paymentService = inject(PaymentService);

  private route = inject(ActivatedRoute);

  private alert = inject(AlertService);

  payment?: Payment;

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadPayment(id);

  }

  loadPayment(id: number): void {

    this.paymentService
      .getPayment(id)
      .subscribe({

        next: (data) => {

          this.payment = data;

        },

        error: (err) => {

          console.error(err);

          this.alert.error(
            'Error',
            'Unable to load payment details.'
          );

        }

      });

  }

}