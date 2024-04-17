import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { Adminlogin } from './adminlogin';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin_login', component: Adminlogin },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }