import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {

  @Input() icon = 'fa-regular fa-folder-open';

  @Input() title = 'No Records Found';

  @Input() message = 'There are no records to display.';

  @Input() buttonText = '';

  @Input() buttonLink = '';

}