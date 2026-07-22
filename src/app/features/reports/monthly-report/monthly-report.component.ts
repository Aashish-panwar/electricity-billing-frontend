import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReportService } from '../../../services/report.service';
import { ExportService } from '../../../services/export.service';

@Component({
  selector: 'app-monthly-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './monthly-report.component.html',
  styleUrl: './monthly-report.component.scss'
})
export class MonthlyReportComponent implements OnInit {

  private reportService = inject(ReportService);

  private exportService = inject(ExportService);
  
  reports: any[] = [];

  filteredReports: any[] = [];

  searchText = '';

  ngOnInit(): void {

    this.loadReport();

  }

  loadReport(): void {

    this.reportService
      .getMonthlyReport()
      .subscribe({

        next: (data: any[]) => {

          this.reports = data;

          this.filteredReports = data;

        },

        error: console.error

      });

  }

  applyFilter(): void {

    const value = this.searchText.trim().toLowerCase();

    if (!value) {

      this.filteredReports = this.reports;

      return;

    }

    this.filteredReports = this.reports.filter(report =>

      String(report.month).toLowerCase().includes(value)

    );

  }

  // =======================================
// Export PDF
// =======================================

exportPDF(): void {

  const headers = [

    'Month',

    'Total Bills',

    'Total Payments',

    'Total Revenue'

  ];

  const rows = this.filteredReports.map(report => [

    report.month,

    report.totalBills,

    report.totalPayments,

    report.totalRevenue

  ]);

  this.exportService.exportToPDF(

    'Monthly Revenue Report',

    headers,

    rows

  );

}

// =======================================
// Export Excel
// =======================================

exportExcel(): void {

  const data = this.filteredReports.map(report => ({

    Month: report.month,

    TotalBills: report.totalBills,

    TotalPayments: report.totalPayments,

    TotalRevenue: report.totalRevenue

  }));

  this.exportService.exportToExcel(

    data,

    'Monthly_Revenue_Report'

  );

}

}