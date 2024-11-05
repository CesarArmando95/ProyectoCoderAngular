import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import { map } from 'rxjs';

export const autenticacionhGuard: CanActivateFn = (route, state) => {
  const autenticacionService = inject(AutenticacionService);
  const router = inject(Router);

  return autenticacionService
    .verifyToken()
    .pipe(map((isValid) => isValid || router.createUrlTree(['autenticacion', 'login'])));
};