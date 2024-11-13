import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { ApiService } from '../services/api.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const api = inject(ApiService);
  const router = inject(Router);

  if (api.haveAccess()) {
    return true;
  } else {
    router.navigate(['home']);
    return false;
  }
};
