import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  inject
} from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';
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

import { MeterService } from '../../../services/meter.service';
import { Meter } from '../../../models/meter';
import { AlertService } from '../../../core/services/alert.service';
import { LoadingSpinnerComponent } from '../../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-meter-list',
  standalone: true,
  imports: [
  CommonModule,
  RouterLink,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  EmptyStateComponent,
  LoadingSpinnerComponent
],
  templateUrl: './meter-list.component.html',
  styleUrl: './meter-list.component.scss'
})
export class MeterListComponent implements OnInit, AfterViewInit {

  private meterService = inject(MeterService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private notification = inject(NotificationService);


  displayedColumns = [
    'meterNumber',
    'manufacturer',
    'model',
    'status',
    'currentReading',
    'consumerName',
    'action'
  ];

  dataSource = new MatTableDataSource<Meter>();

  loading = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {
    this.loadMeters();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadMeters(): void {

  this.loading = true;

  this.meterService.getAllMeters().subscribe({

    next: (data) => {

      this.dataSource.data = data;

    },

    error: (err) => {

      console.error(err);

    },

    complete: () => {

      this.loading = false;

    }

  });

}

  applyFilter(event: Event): void {

    const value = (event.target as HTMLInputElement).value;

    this.dataSource.filter = value.trim().toLowerCase();

  }

  addMeter(): void {

    this.router.navigate(['/meters/add']);

  }

  editMeter(id: number): void {

    this.router.navigate(['/meters/edit', id]);

  }

  viewMeter(id: number): void {

    this.router.navigate(['/meters/view', id]);

  }

  async deleteMeter(id: number): Promise<void> {

    const confirmed = await this.alert.confirmDelete(
      'Delete Meter?',
      'You want to delete this meter.'
    );

    if (!confirmed) return;

    this.meterService.deleteMeter(id).subscribe({

      next: () => {

         this.notification.warning(
          'Meter Deleted',
          'Meter has been removed.'
        );

        this.alert.success(
          'Deleted',
          'Meter deleted successfully.'
        );

        this.loadMeters();

      },

      error: () => {

        this.alert.error(
          'Delete Failed',
          'Unable to delete meter.'
        );

      }

    });

  }

}