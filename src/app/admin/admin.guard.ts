import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AdminAuthService } from './admin-auth.service';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const adminAuth = inject(AdminAuthService);

  return adminAuth.adminState$.pipe(
    take(1),
    map((state) => {
      if (state.status === 'admin') return true;
      router.navigateByUrl('/admin/login');
      return false;
    })
  );
};

