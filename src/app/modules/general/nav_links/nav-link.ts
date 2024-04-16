import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navlink',
  templateUrl: './nav-link.html',
  styleUrls: ['./nav-link.css']
})
export class NavLinkComponent implements OnInit{

  constructor( public sanitizer: DomSanitizer ) { }
  showweb:any
  isFullScreen: boolean = true;
  ngOnInit(): void {

  }

  showurliframe(){
    this.showweb = this.sanitizer.bypassSecurityTrustResourceUrl("https://cr.lsgkerala.gov.in/")
  }
  // fulll screen
  elem=document.documentElement ;
  fullscreen(){
    if(this.elem.requestFullscreen){
      this.elem.requestFullscreen();
      this.isFullScreen = false;
    }
  }

  // exit fullscreen
  exitfullscreen(){
    if(document.exitFullscreen){
      document.exitFullscreen();
      this.isFullScreen = true;
    }
  }

}
