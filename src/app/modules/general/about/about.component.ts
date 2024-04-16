import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent  implements OnInit {

    add_book_form : FormGroup;
    public list_avail  = ['Purchased','Grant','Sponsership'];
    push_disabled_enter : number = 1;
  constructor(private fb: FormBuilder,public api : ApiService) { }

  ngOnInit(): void {
   
  
  
  }

 
  

}
