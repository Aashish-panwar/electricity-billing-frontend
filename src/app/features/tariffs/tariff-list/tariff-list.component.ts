import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';
import { LoadingSpinnerComponent } from '../../../shared/loading-spinner/loading-spinner.component';

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

import { TariffService } from '../../../services/tariff.service';
import { Tariff } from '../../../models/tariff.model';
import { AlertService } from '../../../core/services/alert.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-tariff-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    EmptyStateComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './tariff-list.component.html',
  styleUrl: './tariff-list.component.scss'
})
export class TariffListComponent implements OnInit, AfterViewInit {

  private tariffService = inject(TariffService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private notification = inject(NotificationService);

  displayedColumns = [
    'id',
    'tariffName',
    'ratePerUnit',
    'fixedCharge',
    'effectiveFrom',
    'action'
  ];

  dataSource = new MatTableDataSource<Tariff>();

  loading = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {

    this.loadTariffs();

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  loadTariffs(): void {

    this.loading = true;

    this.tariffService.getAllTariffs().subscribe({

      next: (data) => {

        this.dataSource.data = data;

        this.dataSource.filterPredicate = (
          tariff: Tariff,
          filter: string
        ) => {

          const value = filter.trim().toLowerCase();

          return (

            String(tariff.id ?? '')
              .toLowerCase()
              .includes(value) ||

            String(tariff.tariffName ?? '')
              .toLowerCase()
              .includes(value) ||

            String(tariff.ratePerUnit ?? '')
              .toLowerCase()
              .includes(value) ||

            String(tariff.fixedCharge ?? '')
              .toLowerCase()
              .includes(value) ||

            String(tariff.effectiveFrom ?? '')
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
          'Unable to load tariffs.'
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

  addTariff(): void {

    this.router.navigate(['/tariffs/add']);

  }

  viewTariff(id: number): void {

    this.router.navigate(['/tariffs/view', id]);

  }

  editTariff(id: number): void {

    this.router.navigate(['/tariffs/edit', id]);

  }

  async deleteTariff(id: number): Promise<void> {

    const confirmed = await this.alert.confirmDelete(
      'Delete Tariff?',
      'This action cannot be undone.'
    );

    if (!confirmed) {

      return;

    }

    this.tariffService.deleteTariff(id).subscribe({

      next: () => {

        this.notification.warning(
          'Tariff Deleted',
          'Tariff has been removed.'
        );

        this.alert.success(
          'Deleted',
          'Tariff deleted successfully.'
        );

        this.loadTariffs();

      },

      error: () => {

        this.alert.error(
          'Delete Failed',
          'Unable to delete tariff.'
        );

      }

    });

  }

}