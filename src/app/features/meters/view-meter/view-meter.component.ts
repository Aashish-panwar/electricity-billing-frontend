import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { MeterService } from '../../../services/meter.service';
import { Meter } from '../../../models/meter';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-view-meter',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './view-meter.component.html',
  styleUrl: './view-meter.component.scss'
})
export class ViewMeterComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private meterService = inject(MeterService);
  private alert = inject(AlertService);

  meter!: Meter;

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadMeter(id);

  }

  loadMeter(id: number): void {

    this.meterService.getMeter(id).subscribe({

      next: data => {

        this.meter = data;

      },

      error: (err) => {

        this.alert.error(
          'Error',
          'Unable to load meter details'
        );

        console.log(err);

      }

    });

  }

}