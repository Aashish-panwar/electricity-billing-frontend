import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

import { MeterReadingService } from '../../../services/meter-reading.service';
import { MeterReading } from '../../../models/meter-reading';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-view-meter-reading',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './view-meter-reading.component.html',
  styleUrl: './view-meter-reading.component.scss'
})
export class ViewMeterReadingComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private meterReadingService = inject(MeterReadingService);
  private alert = inject(AlertService);

  reading?: MeterReading;

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadReading(id);

  }

  loadReading(id: number): void {

    this.meterReadingService
      .getReading(id)
      .subscribe({

        next: data => {

          this.reading = data;

        },

        error: (err) => {

          console.log(err);

          this.alert.error(
            'Error',
            'Unable to load meter reading.'
          );

        }

      });

  }

  back(): void {

    this.router.navigate([
      '/meter-readings'
    ]);

  }

}