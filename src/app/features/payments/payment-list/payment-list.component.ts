import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';
import { LoadingSpinnerComponent } from '../../../shared/loading-spinner/loading-spinner.component';
import { NotificationService } from '../../../core/services/notification.service';

import {
  MatTableModule,
  MatTableDataSource
} from '@angular/material/table';

import {
  MatPaginator,
  MatPaginatorModule
} from '@angular/material/paginator';

import {
  MatSort,
  MatSortModule
} from '@angular/material/sort';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { PaymentService } from '../../../services/payment.service';
import { Payment } from '../../../models/payment.model';
import { AlertService } from '../../../core/services/alert.service';
import { ExportService } from '../../../services/export.service';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    EmptyStateComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss'
})
export class PaymentListComponent implements OnInit, AfterViewInit {

  private paymentService = inject(PaymentService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private exportService = inject(ExportService);
  private notification = inject(NotificationService);

  displayedColumns = [
    'paymentNumber',
    'billNumber',
    'consumerName',
    'amount',
    'paymentMethod',
    'status',
    'action'
  ];

  dataSource = new MatTableDataSource<Payment>();

  selectedMethod = '';

  loading = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {

    this.loadPayments();

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  loadPayments(): void {

    this.loading = true;

    this.paymentService.getAllPayments().subscribe({

      next: (data) => {

        this.dataSource.data = data;

        this.dataSource.filterPredicate = (
          payment: Payment,
          filter: string
        ): boolean => {

          const value = filter.trim().toLowerCase();

          return (

            String(payment.paymentNumber ?? '')
              .toLowerCase()
              .includes(value) ||

            String(payment.billNumber ?? '')
              .toLowerCase()
              .includes(value) ||

            String(payment.consumerName ?? '')
              .toLowerCase()
              .includes(value) ||

            String(payment.paymentMethod ?? '')
              .toLowerCase()
              .includes(value) ||

            String(payment.status ?? '')
              .toLowerCase()
              .includes(value)

          );

        };

        this.loading = false;

      },

      error: () => {

        this.loading = false;

        this.alert.error(
          'Error',
          'Unable to load payments.'
        );

      }

    });

  }

  applyFilter(event: Event): void {

    const value = (event.target as HTMLInputElement).value;

    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }

  filterMethod(): void {

    this.dataSource.filter = this.selectedMethod.trim().toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }

  addPayment(): void {

    this.router.navigate(['/payments/add']);

  }

  viewPayment(id: number): void {

    this.router.navigate(['/payments/view', id]);

  }

  async deletePayment(id: number): Promise<void> {

    const confirmed = await this.alert.confirmDelete(
      'Delete Payment?',
      'This action cannot be undone.'
    );

    if (!confirmed) {

      return;

    }

    this.paymentService.deletePayment(id).subscribe({

      next: () => {

        this.notification.warning(
          'Payment Deleted',
          'Payment record has been deleted successfully.'
        );


        this.alert.success(
          'Deleted',
          'Payment deleted successfully.'
        );

        this.loadPayments();

      },

      error: () => {

        this.alert.error(
          'Delete Failed',
          'Unable to delete payment.'
        );

      }

    });

  }
  // ==========================
// Export PDF
// ==========================

exportPDF(): void {

  const headers = [

    'Payment No',
    'Bill No',
    'Consumer',
    'Amount',
    'Method',
    'Status'

  ];

  const rows = this.dataSource.data.map(payment => [

    payment.paymentNumber,

    payment.billNumber,

    payment.consumerName,

    payment.amount,

    payment.paymentMethod,

    payment.status

  ]);

  this.exportService.exportToPDF(

    'Payment Report',

    headers,

    rows

  );

  this.notification.success(
  'PDF Exported',
  'Payment report exported to PDF successfully.'
);

}

// ==========================
// Export Excel
// ==========================

exportExcel(): void {

  const data = this.dataSource.data.map(payment => ({

    PaymentNumber: payment.paymentNumber,

    BillNumber: payment.billNumber,

    Consumer: payment.consumerName,

    Amount: payment.amount,

    PaymentMethod: payment.paymentMethod,

    Status: payment.status

  }));

  this.exportService.exportToExcel(
  data,
  'Payment_Report'
);

this.notification.success(
  'Excel Exported',
  'Payment report exported successfully.'
);

}

}