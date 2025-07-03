import { Routes } from '@angular/router';
import { ZonesAdminComponent } from './pages/zones-admin/zones-admin.component';
import { ZoneEditComponent } from './pages/zone-edit/zone-edit.component';
import { AuthGuard } from '../guards/auth.guard'; 

export const ZONES_ROUTES: Routes = [
  {
    path: 'zones-admin',
    component: ZonesAdminComponent,
    canActivate: [AuthGuard], 
    data: { requiredPermissions: ['getZone'] }
  },
  {
    path: 'zones-admin/edit/:id',
    component: ZoneEditComponent,
    canActivate: [AuthGuard], 
    data: { requiredPermissions: ['getZoneById', 'updateZone'] }
  }
];