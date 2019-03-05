import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginStatisticComponent } from './login-statistic/login-statistic.component';
import { TrafficStatisticComponent } from './traffic-statistic/traffic-statistic.component';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { AdminComponent } from './admin.component';




const routes: Routes = [
  {
    path: '',
    data: {
        title: 'Kasetsart University Network  Usage Statistics'
    },
    component: AdminComponent,
    children: [
      {
        path: '',
        component: QuickViewComponent
      },{
        path: 'login-stat',
        data: {
            title: 'Login Statistic'
        },
        component: LoginStatisticComponent,
      },{
        path: 'traffic-stat',
        data: {
            title: 'Traffic Statistic'
        },
        component: TrafficStatisticComponent,
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
