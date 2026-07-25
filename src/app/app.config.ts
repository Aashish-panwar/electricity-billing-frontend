import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';

import { authInterceptor } from './interceptors/auth.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import {
  provideCharts,
  withDefaultRegisterables
} from 'ng2-charts';

export const appConfig: ApplicationConfig = {

  providers: [

  provideRouter(routes),

  provideAnimations(),

  provideHttpClient(

    withInterceptors([
      authInterceptor,
      loadingInterceptor,
      errorInterceptor
    ])

  ),

  provideCharts(withDefaultRegisterables()),

  provideToastr({

    positionClass: 'toast-top-right',

    timeOut: 3000,

    closeButton: true,

    progressBar: true,

    preventDuplicates: true

  })

]

};
