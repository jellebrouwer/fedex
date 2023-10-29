import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('@fedex/auth').then((mod) => mod.authRoutes),
  },
];
