import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (!token) {

    router.navigate(['/login']);

    return false;

  }

  try {

    const payload = JSON.parse(
      atob(token.split('.')[1])
    );

    const expiry = payload.exp * 1000;

    if (Date.now() >= expiry) {

      localStorage.clear();

      router.navigate(['/login']);

      return false;

    }

    return true;

  } catch {

    localStorage.clear();

    router.navigate(['/login']);

    return false;

  }

};