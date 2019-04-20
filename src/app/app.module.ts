import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from 'app-routing.module';
import { AppComponent } from 'app.component';
import { CoreModule } from 'admin/core/core.module';

import { HttpClientModule } from '@angular/common/http';

import { adminLteConf } from 'admin-lte.conf';
import { LayoutModule } from 'angular-admin-lte';

import { DashboardComponent } from 'admin/dashboard/dashboard.component';
import { HistoryComponent } from 'admin/history/history.component';
import { TestComponent } from 'admin/test/test.component';

import { TestViewComponent } from 'admin/test/view/view.component';
import { AreaComponent } from 'admin/graph/area/area.component';
import { DonutComponent } from 'admin/graph/donut/donut.component';
import { BarComponent } from 'admin/graph/bar/bar.component';

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgxEchartsModule } from 'ngx-echarts';
import { InputGroupModule, InputTextModule as mkInputTextModule, BoxModule, BoxInfoModule } from 'angular-admin-lte';
import { MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule } from '@angular/material';

import { AuthGuard } from 'authorization/auth.guard';
import { AuthService } from 'service/auth.service';
import { ProfileComponent } from 'admin/profile/profile.component';
import { HistoryViewComponent } from './admin/history/view/view.component';

import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HistoryComponent,
    TestComponent,
    TestViewComponent,
    AreaComponent,
    DonutComponent,
    BarComponent,
    ProfileComponent,
    HistoryViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
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
    MatSelectModule,
    NgxEchartsModule,
    MatSortModule,
    NgxPaginationModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
