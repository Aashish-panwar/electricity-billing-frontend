import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { BillService } from '../../../services/bill.service';
import { Bill } from '../../../models/bill.model';
import { AlertService } from '../../../core/services/alert.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-view-bill',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './view-bill.component.html',
  styleUrl: './view-bill.component.scss'
})
export class ViewBillComponent implements OnInit {

  private billService = inject(BillService);
  private route = inject(ActivatedRoute);
  private alert = inject(AlertService);
  private notification = inject(NotificationService);

  bill?: Bill;

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadBill(id);

  }

  loadBill(id: number): void {

    this.billService
      .getBill(id)
      .subscribe({

        next: (data) => {

          this.bill = data;

        },

        error: (err) => {

          console.error(err);

          this.alert.error(
            'Error',
            'Unable to load bill details.'
          );

        }

      });

  }

}