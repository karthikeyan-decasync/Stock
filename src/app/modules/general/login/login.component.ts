import { Component,OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { HttpHeaders } from '@angular/common/http';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  push_disabled_enter : number = 0;
  submitted :boolean = false;
  loginForm : FormGroup;
  registerForm : FormGroup;
  registerclick : boolean = false
  constructor(public api : ApiService, private fb: FormBuilder, private ps:NgxPermissionsService, private rs: Router) { }

  ngOnInit(): void {
   
    this.push_disabled_enter = 1;
    this.loginForm = this.fb.group({
      agency_code:['',[Validators.required,Validators.minLength(3)]],
      passwd : ['',[Validators.required,Validators.minLength(3)]],
    });
  }

  onForm(login_dets: any) {
    this.push_disabled_enter = 2;
    this.submitted = true;
    this.api.login(login_dets).subscribe((data) => {
      this.get_res_login(data);
    });
  }
  get_res_login(data: any)
  {

    
    if (data.success == true) {  
      if (data.status == true) {  

       this.api.user = data.user;
       this.api.token = data.token;
       this.api.logged_in = true;
       this.api.httpOptions = {
           headers: new HttpHeaders({ 'Content-Type': 'application/json',  Authorization: this.api.token }),
         };

        // this.httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json',  Authorization: this.token }),
    // };
        
        this.ps.loadPermissions([this.api.user.role_of_user]);   

        if (this.api.user.role_of_user == 'Admin' ||  this.api.user.role_of_user == 'Staff' ||  this.api.user.role_of_user == 'Member' ) {       
              this.rs.navigate(['']);
        }
      }

      else
      {
        alert('Invalid creds')
        this.push_disabled_enter = 1;
      }
  }

  else
  {
    alert('Error')
    this.push_disabled_enter = 1;
  }


}
}
