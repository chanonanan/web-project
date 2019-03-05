import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { NgxEchartsModule } from 'ngx-echarts';

import { adminLteConf } from './admin-lte.conf';   //Import the layout configuration.
import { LayoutModule } from 'angular-admin-lte';   //Import the layout module.


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxEchartsModule,
    LayoutModule.forRoot(adminLteConf)
  ]
})
export class AdminModule { }
