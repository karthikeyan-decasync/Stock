import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name = environment.application.name;
  version = environment.application.version;
  bootstrap = environment.application.bootstrap;
  fontawesome = environment.application.fontawesome;

  constructor(private meta: Meta , public dialog: MatDialog ,  private ps:NgxPermissionsService,private snackBar: MatSnackBar, private rs: Router) {
  }




  ngOnInit(): void {

    this.meta.updateTag(
      {
        name: 'description',
        content: 'This application was developed with Angular version 14.2.5 and bootstrap 5.2.2' +
          ' It applies Routing, Lazy loading, Server side rendering and Progressive Web App (PWA)'
      });

  }
  asset_view()
  {
  }
  add_book()
  {
    this.rs.navigate(['/new-book']);
  }
  add_to_store()
  {
    this.rs.navigate(['/new-book-store']);
  }

  view_book_store()
  {
    this.rs.navigate(['/new-book-store-view']);
  }

  add_user()
  {
    this.rs.navigate(['/signup']);
  }

  

  

}
