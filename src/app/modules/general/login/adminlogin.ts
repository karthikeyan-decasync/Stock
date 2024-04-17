import { Component,OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { HttpHeaders } from '@angular/common/http';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  templateUrl: './adminlogin.html',
  styleUrls: ['./adminlogin.css']
})
export class Adminlogin implements OnInit {
  push_disabled_enter : number = 0;
  submitted :boolean = false;
  loginForm : FormGroup;
  view : number = 0;
  fa2: string = '';

  constructor(public api : ApiService, private fb: FormBuilder, private ps:NgxPermissionsService, private rs: Router) { }

  

  ngOnInit(): void {
   
    this.push_disabled_enter = 1;
    this.loginForm = this.fb.group({
      admin:['admin',[Validators.required,Validators.minLength(3)]],
      passwd : ['86asp',[Validators.required,Validators.minLength(3)]],
    });
  }

  onForm(login_dets: any) {
    this.push_disabled_enter = 2;
    
    this.submitted = true;
    
      this.get_res_login();
    
  }
  get_res_login()
  {

    
    if (this.loginForm.controls['admin'].value == 'admin' && this.loginForm.controls['passwd'].value == '86asp')
       {  
                
              this.view = 1;
        }
        else
        {
          alert('Invalid creds')
          this.push_disabled_enter = 1;
          this.view = 0;

        }
      }

      fa22(){
        const samp = {
          "fa2" : this.fa2.toString()
        }
        this.api.login_shoonya(samp).subscribe((data) => {
          console.log(data)
        })
      }
    }
    

