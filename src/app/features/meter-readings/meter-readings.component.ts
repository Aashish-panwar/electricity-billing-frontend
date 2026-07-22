import { Component } from '@angular/core';

import { MeterReadingListComponent } from './meter-reading-list/meter-reading-list.component';

@Component({
  selector: 'app-meter-readings',
  standalone: true,
  imports: [
    MeterReadingListComponent
  ],
  templateUrl: './meter-readings.component.html',
  styleUrl: './meter-readings.component.scss'
})
export class MeterReadingsComponent {

}