import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-report-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './report-dashboard.component.html',
  styleUrl: './report-dashboard.component.scss'
})
export class ReportDashboardComponent {

}