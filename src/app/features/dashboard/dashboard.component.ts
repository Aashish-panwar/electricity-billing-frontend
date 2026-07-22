import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseChartDirective } from 'ng2-charts';

import {
  ChartConfiguration,
  ChartOptions
} from 'chart.js';

import { DashboardService } from '../../services/dashboard.service';
import { Dashboard } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  private dashboardService = inject(DashboardService);

  dashboard?: Dashboard;

  // ================= BAR CHART =================

  public barChartData: ChartConfiguration<'bar'>['data'] = {

    labels: [],

    datasets: [

      {

        label: 'Monthly Revenue (₹)',

        data: []

      }

    ]

  };

  public barChartOptions: ChartOptions<'bar'> = {

    responsive: true,

    plugins: {

      legend: {

        display: true

      }

    }

  };

  // ================= PIE CHART =================

  public pieChartData: ChartConfiguration<'pie'>['data'] = {

    labels: [

      'Paid Bills',

      'Pending Bills',

      'Overdue Bills'

    ],

    datasets: [

      {

        data: []

      }

    ]

  };

  // ================= Units Line Chart =================

public lineChartData: ChartConfiguration<'line'>['data'] = {

  labels: [],

  datasets: [

    {

      label: 'Monthly Units Consumed',

      data: []

    }

  ]

};

public lineChartOptions: ChartOptions<'line'> = {

  responsive: true

};

// ================= Bills Chart =================

public billsChartData: ChartConfiguration<'line'>['data'] = {

  labels: [],

  datasets: [

    {

      label: 'Bills Generated',

      data: []

    }

  ]

};

public billsChartOptions: ChartOptions<'line'> = {

  responsive: true

};

  public pieChartOptions: ChartOptions<'pie'> = {

    responsive: true,

    plugins: {

      legend: {

        position: 'bottom'

      }

    }

  };

  ngOnInit(): void {

  this.loadStatistics();

  this.loadRevenueChart();

  this.loadUnitsChart();

  this.loadBillsChart();

}

  // ================= Dashboard Statistics =================

  loadStatistics(): void {

    this.dashboardService
      .getStatistics()
      .subscribe({

        next: (data) => {

          this.dashboard = data;

          this.pieChartData = {

            labels: [

              'Paid Bills',

              'Pending Bills',

              'Overdue Bills'

            ],

            datasets: [

              {

                data: [

                  data.paidBills,

                  data.pendingBills,

                  data.overdueBills

                ]

              }

            ]

          };

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ================= Revenue Chart =================

  loadRevenueChart(): void {

    this.dashboardService
      .getMonthlyRevenue()
      .subscribe({

        next: (data: any[]) => {

          this.barChartData = {

            labels: data.map(item => item.month),

            datasets: [

              {

                label: 'Monthly Revenue (₹)',

                data: data.map(item => item.revenue)

              }

            ]

          };

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  loadUnitsChart(): void {

  this.dashboardService

    .getMonthlyUnits()

    .subscribe({

      next: (data: any[]) => {

        this.lineChartData = {

          labels: data.map(item => item.month),

          datasets: [

            {

              label: 'Monthly Units',

              data: data.map(item => item.units)

            }

          ]

        };

      },

      error: err => console.log(err)

    });

}

loadBillsChart(): void {

  this.dashboardService

    .getMonthlyBills()

    .subscribe({

      next: (data: any[]) => {

        this.billsChartData = {

          labels: data.map(item => item.month),

          datasets: [

            {

              label: 'Bills Generated',

              data: data.map(item => item.bills)

            }

          ]

        };

      },

      error: err => console.log(err)

    });

}

}