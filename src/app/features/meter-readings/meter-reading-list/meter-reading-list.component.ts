import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  inject
} from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';

import { MeterReadingService } from '../../../services/meter-reading.service';
import { MeterReading } from '../../../models/meter-reading';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-meter-reading-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    EmptyStateComponent
  ],
  templateUrl: './meter-reading-list.component.html',
  styleUrl: './meter-reading-list.component.scss'
})
export class MeterReadingListComponent implements OnInit, AfterViewInit {

  private meterReadingService = inject(MeterReadingService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private notification = inject(NotificationService);


  displayedColumns = [
    'meterNumber',
    'previousReading',
    'currentReading',
    'unitsConsumed',
    'billingMonth',
    'billingYear',
    'status',
    'action'
  ];

  dataSource = new MatTableDataSource<MeterReading>();

  loading = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {

    this.loadReadings();

    this.dataSource.filterPredicate = (
      reading: MeterReading,
      filter: string
    ): boolean => {

      const value = filter.trim().toLowerCase();

      return (
        String(reading.meterNumber ?? '').toLowerCase().includes(value) ||
        String(reading.billingMonth ?? '').toLowerCase().includes(value) ||
        String(reading.billingYear ?? '').toLowerCase().includes(value) ||
        String(reading.status ?? '').toLowerCase().includes(value)
      );

    };

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  loadReadings(): void {

    this.loading = true;

    this.meterReadingService.getAllReadings().subscribe({

      next: (data) => {

        this.dataSource.data = data;

      },

      error: () => {

        this.alert.error(
          'Error',
          'Unable to load meter readings.'
        );

      },

      complete: () => {

        this.loading = false;

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

  addReading(): void {
    this.router.navigate(['/meter-readings/add']);
  }

  viewReading(id: number): void {
    this.router.navigate(['/meter-readings/view', id]);
  }

  editReading(id: number): void {
    this.router.navigate(['/meter-readings/edit', id]);
  }

  generateBill(id: number): void {
    this.router.navigate(['/bills/generate', id]);
  }

  async deleteReading(id: number): Promise<void> {

    const confirmed = await this.alert.confirmDelete(
      'Delete Meter Reading?',
      'This action cannot be undone.'
    );

    if (!confirmed) {
      return;
    }

    this.meterReadingService.deleteReading(id).subscribe({

      next: () => {

        this.notification.warning(
          'Meter Reading Deleted',
          'Meter reading has been removed.'
        );

        this.alert.success(
          'Deleted',
          'Meter Reading deleted successfully.'
        );

        this.loadReadings();

      },

      error: () => {

        this.alert.error(
          'Delete Failed',
          'Unable to delete meter reading.'
        );

      }

    });

  }

}