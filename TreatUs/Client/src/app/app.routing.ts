import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule,Router } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BasicInfoComponent} from 'app/basic-info/basic-info.component';
import { UserLoginComponent} from 'app/user-login/user-login.component';
import{ChangePasswordComponent} from 'app/change-password/change-password.component';
import { AuthGuard } from 'app/auth/auth.guard';

const routes: Routes = [
 {
     path: 'login', component: UserLoginComponent
 },
 { path: 'changePassword',component: ChangePasswordComponent},
 /* {
    path: 'home',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },*/
 /* {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },*/
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
