import { Routes } from '@angular/router';
import { ZonesAdminComponent } from './pages/zones-admin/zones-admin.component';
import { ZoneEditComponent } from './pages/zone-edit/zone-edit.component';


export const ZONES_ROUTES: Routes = [
  {
    path: 'zones-admin',
    component: ZonesAdminComponent,
  },
  { path: 'zones-admin/edit/:id', 
    component: ZoneEditComponent }
];
