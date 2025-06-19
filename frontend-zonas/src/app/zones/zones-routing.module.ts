import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZonesAdminComponent } from './pages/zones-admin/zones-admin.component';
import { ZoneEditComponent } from './pages/zone-edit/zone-edit.component';

const routes: Routes = [
  { path: 'zones-admin', component: ZonesAdminComponent},
  { path: 'zones-admin/edit/:id', component: ZoneEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZonesRoutingModule {}
