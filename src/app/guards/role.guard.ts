import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router
} from '@angular/router';

import { RoleService } from '../core/services/role.service';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {

  const roleService = inject(RoleService);

  const router = inject(Router);

  const allowedRoles =
    route.data['roles'] as string[];

  if (!allowedRoles) {

    return true;

  }

  if (roleService.hasAnyRole(allowedRoles)) {

    return true;

  }

  router.navigate(['/access-denied']);

  return false;

};