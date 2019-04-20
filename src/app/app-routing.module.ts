import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from 'app.component';

import { DashboardComponent } from 'admin/dashboard/dashboard.component';
import { TestComponent } from 'admin/test/test.component';
import { TestViewComponent } from 'admin/test/view/view.component';
import { RegisterComponent } from 'register/register.component';
import { HistoryComponent } from 'admin/history/history.component';
import { HistoryViewComponent } from './admin/history/view/view.component';

import { ProfileComponent } from 'admin/profile/profile.component';


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
          title: 'Test History',
          breadcrumbs: 'History'
        },
        children: [
          {
            path: '',
            component: HistoryComponent,
            data: {
              title: 'Test History',
              breadcrumbs: 'History'
            },
          }, {
            path: 'view/:id',
            component: HistoryViewComponent,
            data: {
              title: 'Test History',
              breadcrumbs: 'View'
            },
          }
        ]
      }, {
        path: 'test',
        data: {
          title: 'Test',
          breadcrumbs: 'Test'
        },
        children: [
          {
            path: '',
            component: TestComponent,
            data: {
              title: 'Test',
              breadcrumbs: 'Test'
            },
          }, {
            path: 'view/:id',
            component: TestViewComponent,
            data: {
              title: 'Test View',
              breadcrumbs: 'View'
            },
          }
        ]
      }, {
        path: 'profile',
        data: {
          title: 'Profile'
        },
        children: [
          {
            path: '',
            component: ProfileComponent,
            data: {
              title: 'Profile',
              breadcrumbs: 'View'
            },
          }, {
            path: ':id',
            component: ProfileComponent,
            data: {
              title: 'Profile',
              breadcrumbs: 'View'
            },
          }
        ]
      }
    ]
  },{
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
