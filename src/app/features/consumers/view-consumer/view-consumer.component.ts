import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { ConsumerService } from '../../../services/consumer.service';
import { Consumer } from '../../../models/consumer';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-view-consumer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './view-consumer.component.html',
  styleUrl: './view-consumer.component.scss'
})
export class ViewConsumerComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private consumerService = inject(ConsumerService);
  private alert = inject(AlertService);

  consumer!: Consumer;
  consumerId!: number;

  ngOnInit(): void {

    this.consumerId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadConsumer();

  }

  loadConsumer(): void {

    this.consumerService
      .getConsumer(this.consumerId)
      .subscribe({

        next: (data) => {

          this.consumer = data;

        },

        error: () => {

          this.alert.error(
            'Error',
            'Unable to load consumer details'
          );

        }

      });

  }

}