import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { TariffService } from '../../../services/tariff.service';
import { Tariff } from '../../../models/tariff.model';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-view-tariff',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './view-tariff.component.html',
  styleUrl: './view-tariff.component.scss'
})
export class ViewTariffComponent implements OnInit {

  private tariffService = inject(TariffService);
  private route = inject(ActivatedRoute);
  private alert = inject(AlertService);

  tariff!: Tariff;

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.tariffService
      .getTariff(id)
      .subscribe({

        next: (data) => {

          this.tariff = data;

        },

        error: (err) => {

          console.error(err);

          this.alert.error(
            'Error',
            'Unable to load tariff details.'
          );

        }

      });

  }

}