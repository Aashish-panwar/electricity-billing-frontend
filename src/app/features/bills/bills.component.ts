import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { BillService } from '../../services/bill.service';
import { Bill } from '../../models/bill.model';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.scss'
})
export class BillsComponent implements OnInit {

  private billService = inject(BillService);
  private router = inject(Router);
  private alert = inject(AlertService);

  bills: Bill[] = [];

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {

    this.billService.getAllBills().subscribe({

      next: (data) => {
        this.bills = data;
      },

      error: () => {

        this.alert.error(
          'Error',
          'Unable to load bills.'
        );

      }

    });

  }

  viewBill(id: number): void {

    this.router.navigate([
      '/bills/view',
      id
    ]);

  }

  downloadBill(id: number): void {

    this.billService.downloadBill(id).subscribe({

      next: (response) => {

        const blob = new Blob(
          [response],
          { type: 'application/pdf' }
        );

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');

        a.href = url;

        a.download = `Bill-${id}.pdf`;

        a.click();

        window.URL.revokeObjectURL(url);

      },

      error: () => {

        this.alert.error(
          'Error',
          'Unable to download bill.'
        );

      }

    });

  }

  async deleteBill(id: number): Promise<void> {

    const confirmed = await this.alert.confirmDelete(
      'Delete Bill?',
      'This action cannot be undone.'
    );

    if (!confirmed) {
      return;
    }

    this.billService.deleteBill(id).subscribe({

      next: () => {

        this.alert.success(
          'Deleted',
          'Bill deleted successfully.'
        );

        this.loadBills();

      },

      error: () => {

        this.alert.error(
          'Error',
          'Unable to delete bill.'
        );

      }

    });

  }

}