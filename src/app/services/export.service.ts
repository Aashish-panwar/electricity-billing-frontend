import { Injectable } from '@angular/core';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  // ==========================
  // Export PDF
  // ==========================

  exportToPDF(
    title: string,
    headers: string[],
    rows: any[][]
  ): void {

    const pdf = new jsPDF();

    pdf.setFontSize(18);

    pdf.text(title, 14, 20);

    autoTable(pdf, {

      head: [headers],

      body: rows,

      startY: 30,

      theme: 'grid',

      headStyles: {

        fillColor: [41, 128, 185]

      }

    });

    pdf.save(`${title}.pdf`);

  }

  // ==========================
  // Export Excel
  // ==========================

  exportToExcel(
    data: any[],
    fileName: string
  ): void {

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Sheet1'
    );

    XLSX.writeFile(
      workbook,
      `${fileName}.xlsx`
    );

  }

}