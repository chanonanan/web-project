import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginStatisticComponent } from 'admin/login-statistic/login-statistic.component';
import { TrafficStatisticComponent } from 'admin/traffic-statistic/traffic-statistic.component';
import { AdminComponent } from 'admin/admin.component';
import { DashboardComponent } from 'admin/dashboard/dashboard.component';
import { TestComponent } from 'admin/test/test.component';
import { TestViewComponent } from './test/view/view.component';


import { AuthGuard } from 'authorization/auth.guard';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard'
    },
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      }, {
        path: 'login-stat',
        data: {
          title: 'Login Statistic'
        },
        component: LoginStatisticComponent,
      }, {
        path: 'traffic-stat',
        data: {
          title: 'Traffic Statistic'
        },
        component: TrafficStatisticComponent,
      }, {
        path: 'test',
        data: {
          title: 'Test'
        },
        children: [
          {
            path: '',
            component: TestComponent
          }, {
            path: 'view/:id',
            component: TestViewComponent
          }
        ]
      },
    ]
  },

  { path: '**', redirectTo: 'login' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
