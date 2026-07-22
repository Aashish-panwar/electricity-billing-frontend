import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportService } from '../../../services/report.service';
import { ExportService } from '../../../services/export.service';

@Component({
  selector: 'app-revenue-report',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './revenue-report.component.html',
  styleUrl: './revenue-report.component.scss'
})
export class RevenueReportComponent implements OnInit {

  private reportService = inject(ReportService);

  private exportService = inject(ExportService);

  report: any;

  loading = true;

  ngOnInit(): void {

    this.loadReport();

  }

  loadReport(): void {

    this.reportService
      .getRevenueReport()
      .subscribe({

        next: (data) => {

          this.report = data;

          this.loading = false;

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

        }

      });
  }
  // ===============================
// Export PDF
// ===============================

exportPDF(): void {

  if (!this.report) {

    return;

  }

  const headers = [

    'Particular',

    'Value'

  ];

  const rows = [

    ['Total Revenue', `₹ ${this.report.totalRevenue}`],

    ['Total Bills', this.report.totalBills],

    ['Total Payments', this.report.totalPayments],

    ['Pending Amount', `₹ ${this.report.pendingAmount}`]

  ];

  this.exportService.exportToPDF(

    'Revenue Report',

    headers,

    rows

  );

}

// ===============================
// Export Excel
// ===============================

exportExcel(): void {

  if (!this.report) {

    return;

  }

  const data = [

    {

      TotalRevenue: this.report.totalRevenue,

      TotalBills: this.report.totalBills,

      TotalPayments: this.report.totalPayments,

      PendingAmount: this.report.pendingAmount

    }

  ];

  this.exportService.exportToExcel(

    data,

    'Revenue_Report'

  );

}

}