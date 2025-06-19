import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DeliveryComponent } from './pages/delivery/delivery.component'

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'home/deliveryList',
    component: DeliveryComponent
  },
  {
    path: 'zones',
    loadChildren: () =>
      import('./zones/zones.routes').then((m) => m.ZONES_ROUTES),
  },
];
