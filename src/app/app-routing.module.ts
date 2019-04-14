import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from 'app.component';

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
    children: [
      {
        path: '',
        component: DashboardComponent
      }, {
        path: 'history',
        data: {
          title: 'Test History'
        },
        children: [
          {
            path: '',
            component: HistoryComponent
          }, {
            path: 'view/:id',
            component: HistoryComponent
          }
        ]
      }, {
        path: 'test',
        data: {
          title: 'Test'
        },
        children: [
          {
            path: '',
            component: TestComponent,
          }, {
            path: 'view/:id',
            component: TestViewComponent
          }
        ]
      }
    ]
  }
  , {
    path: 'login',
    loadChildren: 'login/login.module#LoginModule',
    data: {
      customLayout: true
    }
  }, {
    path: 'register',
    loadChildren: 'register/register.module#RegisterModule',
    data: {
      customLayout: true
    }
  }, {
    path: '**',
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
