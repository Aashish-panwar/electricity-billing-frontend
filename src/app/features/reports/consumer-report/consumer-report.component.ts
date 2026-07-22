import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReportService } from '../../../services/report.service';
import { ExportService } from '../../../services/export.service';

@Component({
  selector: 'app-consumer-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './consumer-report.component.html',
  styleUrl: './consumer-report.component.scss'
})
export class ConsumerReportComponent implements OnInit {

  private reportService = inject(ReportService);

  private exportService = inject(ExportService);

  consumers: any[] = [];

  filteredConsumers: any[] = [];

  searchText = '';

  ngOnInit(): void {

    this.loadReport();

  }

  loadReport(): void {

    this.reportService
      .getConsumerReport()
      .subscribe({

        next: (data: any[]) => {

          this.consumers = data;

          this.filteredConsumers = data;

        },

        error: console.error

      });

  }

  applyFilter(): void {

    const value = this.searchText.trim().toLowerCase();

    if (!value) {

      this.filteredConsumers = this.consumers;

      return;

    }

    this.filteredConsumers = this.consumers.filter(c =>

      String(c.consumerNumber).toLowerCase().includes(value) ||

      String(c.consumerName).toLowerCase().includes(value) ||

      String(c.meterNumber).toLowerCase().includes(value) ||

      String(c.status).toLowerCase().includes(value)

    );

  }

  // ===============================
// Export PDF
// ===============================

exportPDF(): void {

  const headers = [

    'Consumer No',

    'Consumer Name',

    'Meter Number',

    'Total Units',

    'Total Bill',

    'Status'

  ];

  const rows = this.filteredConsumers.map(consumer => [

    consumer.consumerNumber,

    consumer.consumerName,

    consumer.meterNumber,

    consumer.totalUnits,

    consumer.totalAmount,

    consumer.status

  ]);

  this.exportService.exportToPDF(

    'Consumer Report',

    headers,

    rows

  );

}

// ===============================
// Export Excel
// ===============================

exportExcel(): void {

  const data = this.filteredConsumers.map(consumer => ({

    ConsumerNumber: consumer.consumerNumber,

    ConsumerName: consumer.consumerName,

    MeterNumber: consumer.meterNumber,

    TotalUnits: consumer.totalUnits,

    TotalBill: consumer.totalAmount,

    Status: consumer.status

  }));

  this.exportService.exportToExcel(

    data,

    'Consumer_Report'

  );

}

}