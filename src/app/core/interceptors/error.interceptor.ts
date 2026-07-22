import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';

import { Router } from '@angular/router';

import {
  catchError,
  throwError
} from 'rxjs';

import { AlertService } from '../services/alert.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  const alert = inject(AlertService);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      switch (error.status) {

        case 400:

          alert.warning(
            'Bad Request',
            error.error?.message || 'Invalid request.'
          );

          break;

        case 401:

          // Avoid redirect loop on login API
          if (!req.url.includes('/auth/login')) {

            localStorage.clear();

            alert.warning(
              'Session Expired',
              'Your session has expired. Please login again.'
            );

            router.navigate(['/login']);

          }

          break;

        case 403:

          alert.error(
            'Access Denied',
            'You do not have permission to access this resource.'
          );

          router.navigate(['/access-denied']);

          break;

        case 404:

          alert.warning(
            'Not Found',
            'Requested resource not found.'
          );

          break;

        case 500:

          alert.error(
            'Server Error',
            'Something went wrong on the server.'
          );

          break;

        default:

          alert.error(
            'Error',
            error.error?.message || 'Unexpected error occurred.'
          );

      }

      return throwError(() => error);

    })

  );

};