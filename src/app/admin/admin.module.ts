import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';

import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from './core/core.module';

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxEchartsModule } from 'ngx-echarts';
import { InputGroupModule, InputTextModule as mkInputTextModule, BoxModule, BoxInfoModule } from 'angular-admin-lte';

import { adminLteConf } from './admin-lte.conf';
import { LayoutModule } from 'angular-admin-lte';
import { LoginStatisticComponent } from './login-statistic/login-statistic.component';
import { AreaComponent } from './graph/area/area.component';
import { DonutComponent } from './graph/donut/donut.component';
import { BarComponent } from './graph/bar/bar.component';
import { TrafficStatisticComponent } from './traffic-statistic/traffic-statistic.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from '../authorization/auth.guard';
import { AuthService } from '../service/auth.service';

@NgModule({
  declarations: [
    AdminComponent,
    LoginStatisticComponent,
    AreaComponent,
    DonutComponent,
    BarComponent,
    TrafficStatisticComponent,
    DashboardComponent
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
    CoreModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
