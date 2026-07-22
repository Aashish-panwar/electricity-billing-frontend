import { Component, OnInit, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';
import { AlertService } from '../../../core/services/alert.service';
import { ConsumerService } from '../../../services/consumer.service';
import { Consumer } from '../../../models/consumer';
import { LoadingSpinnerComponent } from '../../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-consumer-list',
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
  templateUrl: './consumer-list.component.html',
  styleUrl: './consumer-list.component.scss'
})
export class ConsumerListComponent implements OnInit, AfterViewInit {

  private consumerService = inject(ConsumerService);
  private router = inject(Router);
  private alert = inject(AlertService);

  displayedColumns = [
    'consumerNumber',
    'fullName',
    'mobileNumber',
    'email',
    'city',
    'consumerType',
    'action'
  ];

  dataSource = new MatTableDataSource<Consumer>();

  loading = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {
    this.loadConsumers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadConsumers(): void {

  this.loading = true;

  this.consumerService.getAllConsumers().subscribe({

    next: (data) => {

      this.dataSource.data = data;

      this.dataSource.filterPredicate = (
        consumer: Consumer,
        filter: string
      ) => {

        const value = filter.trim().toLowerCase();

        return (

          consumer.consumerNumber?.toLowerCase().includes(value) ||

          consumer.fullName?.toLowerCase().includes(value) ||

          consumer.mobileNumber?.toLowerCase().includes(value) ||

          consumer.email?.toLowerCase().includes(value) ||

          consumer.city?.toLowerCase().includes(value) ||

          consumer.consumerType?.toLowerCase().includes(value)

        );

      };

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

  edit(id: number): void {
    this.router.navigate(['/consumers/edit', id]);
  }

  view(id: number): void {
    this.router.navigate(['/consumers/view', id]);
  }

  async delete(id: number): Promise<void> {
    const confirmed = await this.alert.confirmDelete(
      'Delete Consumer?',
      'This action cannot be undone.'
    );

    if (!confirmed) {
      return;
    }

    this.consumerService.deleteConsumer(id).subscribe({
      next: () => {
        this.alert.success(
          'Deleted',
          'Consumer deleted successfully.'
        );

        this.loadConsumers();
      },

      error: () => {
        this.alert.error(
          'Delete Failed',
          'Unable to delete consumer.'
        );
      }
    });
  }
}