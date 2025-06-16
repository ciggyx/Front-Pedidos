import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ZonesRoutingModule } from './zones-routing.module';
import { ZonesAdminComponent } from './pages/zones-admin/zones-admin.component'


@NgModule({
  declarations: [ZonesAdminComponent],
  imports: [
    CommonModule,
    ZonesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ZonesModule { }
