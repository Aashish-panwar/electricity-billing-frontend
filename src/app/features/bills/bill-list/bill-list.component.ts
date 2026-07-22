import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
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

import {
  MatFormFieldModule
} from '@angular/material/form-field';

import {
  MatInputModule
} from '@angular/material/input';

import {
  MatSelectModule
} from '@angular/material/select';

import { Bill } from '../../../models/bill.model';
import { BillService } from '../../../services/bill.service';
import { AlertService } from '../../../core/services/alert.service';
import { ExportService } from '../../../services/export.service';

@Component({
  selector: 'app-bill-list',
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
  templateUrl: './bill-list.component.html',
  styleUrl: './bill-list.component.scss'
})
export class BillListComponent implements OnInit, AfterViewInit {

  private billService = inject(BillService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private exportService = inject(ExportService);
  private notification = inject(NotificationService);

  displayedColumns = [
    'billNumber',
    'consumerName',
    'meterNumber',
    'totalAmount',
    'billDate',
    'dueDate',
    'status',
    'action'
  ];

  dataSource = new MatTableDataSource<Bill>();

  selectedStatus = '';

  loading = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {

    this.loadBills();

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  loadBills(): void {

    this.loading = true;

    this.billService.getAllBills().subscribe({

      next: (data) => {

        this.dataSource.data = data;

        this.dataSource.filterPredicate = (
          bill: Bill,
          filter: string
        ): boolean => {

          const value = filter.trim().toLowerCase();

          return (

            String(bill.billNumber ?? '')
              .toLowerCase()
              .includes(value) ||

            String(bill.consumerName ?? '')
              .toLowerCase()
              .includes(value) ||

            String(bill.meterNumber ?? '')
              .toLowerCase()
              .includes(value) ||

            String(bill.status ?? '')
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
          'Unable to load bills.'
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

  filterStatus(): void {

    this.dataSource.filter = this.selectedStatus.trim().toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }

  generateBill(): void {

    this.router.navigate(['/bills/generate']);

  }

  viewBill(id: number): void {

    this.router.navigate(['/bills/view', id]);

  }

  downloadBill(id: number): void {

    this.billService.downloadBill(id).subscribe({

      next: (data: Blob) => {

        const url = window.URL.createObjectURL(data);

        const a = document.createElement('a');

        a.href = url;

        a.download = `Bill-${id}.pdf`;

        a.click();

        window.URL.revokeObjectURL(url);
        this.notification.info(
          'PDF Downloaded',
          'Bill PDF downloaded successfully.'
        );

      },

      error: () => {

        this.alert.error(
          'Download Failed',
          'Unable to download bill PDF.'
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

        this.notification.warning(
          'Bill Deleted',
          'Bill has been removed successfully.'
        );

        this.alert.success(
          'Deleted',
          'Bill deleted successfully.'
        );

        this.loadBills();

      },

      error: () => {

        this.alert.error(
          'Delete Failed',
          'Unable to delete bill.'
        );

      }

    });

  }

  // =========================
// Export PDF
// =========================

exportPDF(): void {

  const headers = [

    'Bill No',
    'Consumer',
    'Meter',
    'Amount',
    'Bill Date',
    'Due Date',
    'Status'

  ];

  const rows = this.dataSource.data.map(bill => [

    bill.billNumber,

    bill.consumerName,

    bill.meterNumber,

    bill.totalAmount,

    bill.billDate,

    bill.dueDate,

    bill.status

  ]);

  this.exportService.exportToPDF(

    'Electricity Bills Report',

    headers,

    rows

  );

  this.notification.success(
  'PDF Exported',
  'Bills exported to PDF successfully.'
);

}

// =========================
// Export Excel
// =========================

exportExcel(): void {

  const data = this.dataSource.data.map(bill => ({

    BillNumber: bill.billNumber,

    Consumer: bill.consumerName,

    Meter: bill.meterNumber,

    Amount: bill.totalAmount,

    BillDate: bill.billDate,

    DueDate: bill.dueDate,

    Status: bill.status

  }));

  this.exportService.exportToExcel(

    data,

    'Electricity_Bills'

  );

  this.notification.success(
  'Excel Exported',
  'Bills exported to Excel successfully.'
);

}

}