import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LoginComponent,
    
    
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
  ],
})
export class LoginModule { }