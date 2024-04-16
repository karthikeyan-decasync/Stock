import { Component, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { ApiService } from '../../general/service/api.service';
import { Service_worker } from '../../general/service/sw.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class navbarComponent implements OnInit {
    title = 'angular-bootstrap';
    footerUrl = 'https://www.csweb.in/';
    footerLink = 'csweb.in';
  
    constructor(
      @Inject(PLATFORM_ID) private platformId: object, public api :ApiService,private ps:NgxPermissionsService, private rs: Router,private Sw_:Service_worker) {
        Sw_.check_for_update()
    }
  
    ngOnInit(): void {
  
      if (isPlatformBrowser(this.platformId)) {
        const navMain = document.getElementById('navbarCollapse');
        if (navMain) {
          navMain.onclick = function onClick() {
            if (navMain) {
              navMain.classList.remove("show");
            }
          }
        }
      }
    }
    logout()
    {
      this.rs.navigate(['/home']);
      this.ps.flushPermissions(); 
      this.api.logged_in = false;
    }
}  