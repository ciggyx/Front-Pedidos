import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZonesAdminComponent } from './pages/zones-admin/zones-admin.component';

const routes: Routes = [
  { path: 'zones-admin', component: ZonesAdminComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZonesRoutingModule {}
