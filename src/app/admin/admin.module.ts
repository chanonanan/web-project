import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from 'admin/admin.component';

import { AdminRoutingModule } from 'admin/admin-routing.module';
import { CoreModule } from 'admin/core/core.module';

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgxEchartsModule } from 'ngx-echarts';
import { InputGroupModule, InputTextModule as mkInputTextModule, BoxModule, BoxInfoModule } from 'angular-admin-lte';
import { MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatProgressSpinnerModule, MatSelectModule } from '@angular/material';

import { adminLteConf } from 'admin/admin-lte.conf';
import { LayoutModule } from 'angular-admin-lte';
import { LoginStatisticComponent } from 'admin/login-statistic/login-statistic.component';
import { AreaComponent } from 'admin/graph/area/area.component';
import { DonutComponent } from 'admin/graph/donut/donut.component';
import { BarComponent } from 'admin/graph/bar/bar.component';
import { TrafficStatisticComponent } from 'admin/traffic-statistic/traffic-statistic.component';
import { DashboardComponent } from 'admin/dashboard/dashboard.component';

import { AuthGuard } from 'authorization/auth.guard';
import { AuthService } from 'service/auth.service';
import { TestComponent } from 'admin/test/test.component';
import { TestViewComponent } from './test/view/view.component';

@NgModule({
  declarations: [
    AdminComponent,
    LoginStatisticComponent,
    AreaComponent,
    DonutComponent,
    BarComponent,
    TrafficStatisticComponent,
    DashboardComponent,
    TestComponent,
    TestViewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxEchartsModule,
    LayoutModule.forRoot(adminLteConf),
    InputGroupModule,
    mkInputTextModule,
    BoxModule,
    BoxInfoModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
