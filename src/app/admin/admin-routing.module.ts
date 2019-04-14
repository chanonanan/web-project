import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from 'admin/admin.component';
import { DashboardComponent } from 'admin/dashboard/dashboard.component';
import { TestComponent } from 'admin/test/test.component';
import { TestViewComponent } from 'admin/test/view/view.component';
import { RegisterComponent } from 'register/register.component';
import { HistoryComponent } from 'admin/history/history.component';


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
      },{
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
      },{
        path: 'history',
        data: {
          title: 'Test History'
        },
        children: [
          {
            path: '',
            loadChildren: 'history/history.module#HistoryModule',
          }, {
            path: 'view/:id',
            component: HistoryComponent
          }
        ]
      },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
