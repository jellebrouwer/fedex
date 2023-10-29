import { Route } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const authRoutes: Route[] = [
  { path: 'sign-up', component: SignUpComponent },
];
