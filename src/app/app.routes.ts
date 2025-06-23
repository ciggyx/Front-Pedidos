// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { DeliveryFormComponent } from '../app/delivery-form/delivery-form';
import { AuthGuard } from './guards/auth.guard';
AuthGuard;
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    redirectTo: 'auth', // Redirige a 'auth' para que el login sea lo primero
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home/deliveryList',
    component: DeliveryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-delivery',
    component: DeliveryFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'zones',
    loadChildren: () =>
      import('./zones/zones.routes').then((m) => m.ZONES_ROUTES),
    canActivate: [AuthGuard], // Protege esta ruta perezosa también
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

