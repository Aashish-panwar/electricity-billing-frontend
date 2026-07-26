import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AccessDeniedComponent } from './shared/access-denied/access-denied.component';

import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],

    children: [

      // ================= Dashboard =================

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },

      // ================= Consumers =================

      {
        path: 'consumers',
        canActivate: [roleGuard],
        data: {
          roles: ['ROLE_ADMIN']
        },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/consumers/consumer-list/consumer-list.component')
                .then(m => m.ConsumerListComponent)
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/consumers/add-consumer/add-consumer.component')
                .then(m => m.AddConsumerComponent)
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./features/consumers/edit-consumer/edit-consumer.component')
                .then(m => m.EditConsumerComponent)
          },
          {
            path: 'view/:id',
            loadComponent: () =>
              import('./features/consumers/view-consumer/view-consumer.component')
                .then(m => m.ViewConsumerComponent)
          }
        ]
      },

      // ================= Meters =================

      {
        path: 'meters',
        canActivate: [roleGuard],
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']
        },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/meters/meter-list/meter-list.component')
                .then(m => m.MeterListComponent)
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/meters/add-meter/add-meter.component')
                .then(m => m.AddMeterComponent)
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./features/meters/edit-meter/edit-meter.component')
                .then(m => m.EditMeterComponent)
          },
          {
            path: 'view/:id',
            loadComponent: () =>
              import('./features/meters/view-meter/view-meter.component')
                .then(m => m.ViewMeterComponent)
          }
        ]
      },

      // ================= Meter Readings =================

      {
        path: 'meter-readings',
        canActivate: [roleGuard],
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']
        },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/meter-readings/meter-reading-list/meter-reading-list.component')
                .then(m => m.MeterReadingListComponent)
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/meter-readings/add-meter-reading/add-meter-reading.component')
                .then(m => m.AddMeterReadingComponent)
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./features/meter-readings/edit-meter-reading/edit-meter-reading.component')
                .then(m => m.EditMeterReadingComponent)
          },
          {
            path: 'view/:id',
            loadComponent: () =>
              import('./features/meter-readings/view-meter-reading/view-meter-reading.component')
                .then(m => m.ViewMeterReadingComponent)
          }
        ]
      },

      // ================= Tariffs =================

      {
        path: 'tariffs',
        canActivate: [roleGuard],
        data: {
          roles: ['ROLE_ADMIN']
        },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/tariffs/tariff-list/tariff-list.component')
                .then(m => m.TariffListComponent)
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/tariffs/add-tariff/add-tariff.component')
                .then(m => m.AddTariffComponent)
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./features/tariffs/edit-tariff/edit-tariff.component')
                .then(m => m.EditTariffComponent)
          },
          {
            path: 'view/:id',
            loadComponent: () =>
              import('./features/tariffs/view-tariff/view-tariff.component')
                .then(m => m.ViewTariffComponent)
          }
        ]
      },

      // ================= Bills =================

      {
        path: 'bills',
        canActivate: [roleGuard],
        data: {
          roles: [
            'ROLE_ADMIN',
            'ROLE_EMPLOYEE',
            'ROLE_CONSUMER'
          ]
        },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/bills/bill-list/bill-list.component')
                .then(m => m.BillListComponent)
          },
          {
            path: 'generate',
            loadComponent: () =>
              import('./features/bills/generate-bill/generate-bill.component')
                .then(m => m.GenerateBillComponent)
          },
          {
            path: 'view/:id',
            loadComponent: () =>
              import('./features/bills/view-bill/view-bill.component')
                .then(m => m.ViewBillComponent)
          }
        ]
      },

      // ================= Payments =================

      {
        path: 'payments',
        canActivate: [roleGuard],
        data: {
          roles: [
            'ROLE_ADMIN',
            'ROLE_EMPLOYEE',
            'ROLE_CONSUMER'
          ]
        },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/payments/payment-list/payment-list.component')
                .then(m => m.PaymentListComponent)
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/payments/add-payment/add-payment.component')
                .then(m => m.AddPaymentComponent)
          },
          {
            path: 'view/:id',
            loadComponent: () =>
              import('./features/payments/view-payment/view-payment.component')
                .then(m => m.ViewPaymentComponent)
          }
        ]
      },

      // ================= Reports =================

      {
        path: 'reports',
        canActivate: [roleGuard],
        data: {
          roles: [
            'ROLE_ADMIN',
            'ROLE_EMPLOYEE'
          ]
        },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/reports/report-dashboard/report-dashboard.component')
                .then(m => m.ReportDashboardComponent)
          },
          {
            path: 'revenue',
            loadComponent: () =>
              import('./features/reports/revenue-report/revenue-report.component')
                .then(m => m.RevenueReportComponent)
          },
          {
            path: 'consumer',
            loadComponent: () =>
              import('./features/reports/consumer-report/consumer-report.component')
                .then(m => m.ConsumerReportComponent)
          },
          {
            path: 'monthly',
            loadComponent: () =>
              import('./features/reports/monthly-report/monthly-report.component')
                .then(m => m.MonthlyReportComponent)
          }
        ]
      },

      // ================= Profile =================

      {
        path: 'profile',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/profile/profile.component')
                .then(m => m.ProfileComponent)
          },
          {
            path: 'change-password',
            loadComponent: () =>
              import('./features/profile/change-password/change-password.component')
                .then(m => m.ChangePasswordComponent)
          }
        ]
      }

    ]
  },

  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },

  {
    path: '**',
    component: NotFoundComponent
  }

];
