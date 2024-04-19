import { NgModule } from '@angular/core';
import {ngxPermissionsGuard} from 'ngx-permissions'
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/general/home/home.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';
import { DashComponent } from './modules/general/dash/dash.component';
import { ReportMainComponent } from './modules/general/reports/main-page/main';
import { NavLinkComponent } from './modules/general/nav_links/nav-link';


const routes: Routes = [
  {path: '',   redirectTo: '/login', pathMatch: 'full'},
  

  {path: 'login',  loadChildren: () => import('./modules/general/login/login.module')
  .then(mod => mod.LoginModule)},
  { path: 'home', component: HomeComponent, },
  { path: 'dash', component: DashComponent }, 
  { path: 'nav-links' ,component:NavLinkComponent} ,
  //  canActivate: [ngxPermissionsGuard], data: { permissions: {  only: ['Staff', 'Admin','Member'] } }  
  { path: 'reports', component: ReportMainComponent, canActivate: [ngxPermissionsGuard], data: { permissions: {  only: ['Staff', 'Admin'] } }   },  
  {
    path: 'about',
    loadChildren: () => import('./modules/general/about/about.module')
      .then(mod => mod.AboutModule)
  },  
  {
    path: 'signupss',
    loadChildren: () => import('./modules/general/signup/signup.module')
      .then(mod => mod.SignupModule)
  },
  
  {
    path: 'contact',
    loadChildren: () => import('./modules/general/contact/contact.module')
      .then(mod => mod.ContactModule)
  },
  {
    path: 'bootstrap',
    loadChildren: () => import('./modules/application/example-bootstrap/tutorial.module')
      .then(mod => mod.TutorialModule)
  },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }