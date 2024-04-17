

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpResponse } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { catchError, map, tap,shareReplay } from 'rxjs/operators';



import { User , Book_list} from './model';



export interface Req_model {
  id: number;
  req_type: string;
  user : any;
  options : string;
 
}





export interface Share_model {
  id: number;
  cuc_id : number;
  booth_id : number;
  family_id : number;
  member_id : number;
  status : number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {


    private bUrl = 'http://127.0.0.1:3000/';
    private cUrl = 'http://127.0.0.1:9011/api/';
    private publicUrl = 'http://127.0.0.1:9011/public/';

  //  private bUrl = 'https://ysgk.in/lib-api/';
  //  private cUrl = 'https://ysgk.in/lib-api/private/';
  //  private publicUrl = 'https://ysgk.in/lib-api/public/';

  

  
   public isMobileResolution: boolean = false;
   public logged_in : boolean = false;
 
    user : User;

  figure_grand : string= '';


 


  public post_demo : any = {invo_string : "",is_b2b:false,com_id:null,e_no:0,num_to_string:0}  
   
  
  public navtoken:boolean=false;
  public showModal:string;
  public displayModal:string;
  public edit_mode:boolean=false;

  public token: string = 'Happy';
 
  public query_demo : any = {invo_string : "",is_b2b:false,com_id:null,e_no:0}

 
 


  httpOptions1 = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

   httpOptions2 = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',  Authorization: `Bearer ${this.token}` }),
  };



    httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  };
  

  constructor(private http: HttpClient) {
    this.showModal = 'none';
    this.displayModal = 'none';
  }

 
 
  login(model: any) { 
    let body = JSON.stringify(model);  
    console.log(body)
    return this.http.post(this.publicUrl + 'user_login', body, this.httpOptions1).pipe(catchError(this.handleError<any>('login', body)));

  }

  login_shoonya(model: any) { 
    let body = JSON.stringify(model);  
    console.log(body)
    return this.http.post(this.bUrl + 'login', body, this.httpOptions1).pipe(catchError(this.handleError<any>('login', body)));

  }
  g_q_shoonya(model: any) { 
    let body = JSON.stringify(model);  
    console.log(body)
    return this.http.post(this.bUrl + 'g_q', body, this.httpOptions1).pipe(catchError(this.handleError<any>('login', body)));

  }

  add_new_book(model: any) { 
   
    let body = JSON.stringify(model); 
    return this.http.post(this.cUrl + 'add_new_book', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_new_book', body)));

  }

  update_book(model: any) {    
    let body = JSON.stringify(model);  
    return this.http.post(this.cUrl + 'update_book', body, this.httpOptions).pipe(catchError(this.handleError<any>('update_book', body)));
  }

  add_book_to_store(model: any) { 
   
    let body = JSON.stringify(model);  
    return this.http.post(this.cUrl + 'add_book_to_store', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_book_to_store', body)));

  }

  get_book_hire_details_using_book_store_id(id:number)
  {
    
    const url = `${this.cUrl + 'get_book_hire_details_using_book_store_id'}/${id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_book_hire_details_using_book_store_id')));  
    
  }

  update_book_return(model: any) { 
   
    let body = JSON.stringify(model);  
    return this.http.post(this.cUrl + 'update_book_return', body, this.httpOptions).pipe(catchError(this.handleError<any>('update_book_return', body)));

  }

  

  add_new_user(model: any) { 
   
    let body = JSON.stringify(model);  
    return this.http.post(this.cUrl + 'add_new_user', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_new_user', body)));

  }

  update_user(model: any) { 
   
    let body = JSON.stringify(model); 
    return this.http.post(this.cUrl + 'update_user', body, this.httpOptions).pipe(catchError(this.handleError<any>('update_user', body)));

  }

  get_all_user_list(){ 
   
    const url = `${this.cUrl + 'get_all_user_list'}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_user_list')));  
    
  }

  add_new_category(model: any) { 
   
    let body = JSON.stringify(model);  
    return this.http.post(this.cUrl + 'add_new_category', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_new_category', body)));

  }

  add_new_entry_in_income_expense(model: any) { 
   
    let body = JSON.stringify(model);  
    return this.http.post(this.cUrl + 'add_new_entry_in_income_expense', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_new_entry_in_income_expense', body)));

  }


  update_category(model: any) { 
   
    let body = JSON.stringify(model);  
    return this.http.post(this.cUrl + 'update_category', body, this.httpOptions).pipe(catchError(this.handleError<any>('update_category', body)));

  }

  add_new_book_to_store(model: any) {    
    let body = JSON.stringify(model);  
    return this.http.post(this.cUrl + 'add_new_book_to_store', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_new_book_to_store', body)));
  } 

  update_book_store (model: any) {    
    let body = JSON.stringify(model);  
    return this.http.post(this.cUrl + 'update_book_store', body, this.httpOptions).pipe(catchError(this.handleError<any>('update_book_store', body)));
  } 

  add_new_book_hire (model: any) {    
    let body = JSON.stringify(model);  
    return this.http.post(this.cUrl + 'add_new_book_hire', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_new_book_hire', body)));
  } 

  add_new_in_exp_head (model: any) {    
    let body = JSON.stringify(model);  
    return this.http.post(this.cUrl + 'add_new_in_exp_head', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_new_in_exp_head', body)));
  } 

  add_new_party (model: any) {    
    let body = JSON.stringify(model); 
    return this.http.post(this.cUrl + 'add_new_party', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_new_party', body)));
  } 

  get_all_book_category(search:string) { 
    const url = `${this.cUrl + 'get_all_book_category'}/${search}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_book_category')));      
  }



  get_dash_counts(id:number) { 
   
    const url = `${this.cUrl + 'get_dash_counts'}/${id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_dash_counts')));  
    
  }

  get_book_availability(id:number) { 
   
    const url = `${this.cUrl + 'get_book_availability'}/${id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_book_availability')));  
    
  }

  get_holding_book_status(id:number) { 
   
    const url = `${this.cUrl + 'get_holding_book_status'}/${id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_holding_book_status')));  
    
  }
  get_book_tran_history_of_a_member(id:number) { 
   
    const url = `${this.cUrl + 'get_book_tran_history_of_a_member'}/${id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_book_tran_history_of_a_member')));  
    
  }
  get_my_payments(id:number) { 
   
    const url = `${this.cUrl + 'get_my_payments'}/${id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_my_payments')));  
    
  }
  

  get_all_income_head_list() { 
   
    const url = `${this.cUrl + 'get_all_income_head_list'}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_income_head_list')));  
    
   }

   get_all_party_list()
   {
    const url = `${this.cUrl + 'get_all_party_list'}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_party_list')));  
   }

   get_all_expense_head_list()
   {

    const url = `${this.cUrl + 'get_all_expense_head_list'}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_expense_head_list')));  

   }


   get_all_book_list() { 
   
    const url = `${this.cUrl + 'get_all_book_list'}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_book_list')));  
    
   }

  get_all_book_list_like(b_n:string) { 
   
    const url = `${this.cUrl + 'get_all_book_list_like'}/${b_n}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_book_list_like')));  
    
  }

  get_all_book_store_like(b_c:string) { 
   
    const url = `${this.cUrl + 'get_all_book_store_like'}/${b_c}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_book_store_like')));  
    
  }

  get_all_user_list_like(b_n:string) { 
   
    const url = `${this.cUrl + 'get_all_user_list_like'}/${b_n}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_user_list_like')));  
    
  }

  get_all_book_from_store() { 
   
    const url = `${this.cUrl + 'get_all_book_from_store'}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_book_from_store')));  
    
  }

  get_allotted_only_transaction()
  {
    const url = `${this.cUrl + 'get_allotted_only_transaction'}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_allotted_transaction_from_store'))); 
  }




  upload_file(file:any)
  {
    return this.http.post<any>(this.bUrl + 'upload_file', file, this.httpOptions).pipe(catchError(this.handleError<any>('upload_file', {"success":false,"msg":"Offline..Check internet status"} )));

  }
 
  get_active_notifications_list(id:number)
  {   

   
    const url = `${this.cUrl + 'get_active_notifications_list'}/${id}`;
   
      return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_active_notifications_list', {"success":false,"msg":"Offline..Check internet status"}  )));


  }

  add_new_notification(model:any)
  {   
   let body = JSON.stringify(model); 
   return this.http.post<any>(this.cUrl + 'add_new_notification', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_new_notification', {"success":false,"msg":"Offline..Check internet status"} )));
  }

  update_notification(model:any)
  {   
   let body = JSON.stringify(model);   
   return this.http.post<any>(this.cUrl + 'update_notification', body, this.httpOptions).pipe(catchError(this.handleError<any>('update_notification', {"success":false,"msg":"Offline..Check internet status"} )));
  }





   get_whatsapp_url(model:any)
   {   
    let body = JSON.stringify(model);    
    return this.http.post<any>(this.cUrl + 'get_whatsapp_url', body, this.httpOptions).pipe(catchError(this.handleError<any>('get_whatsapp_url', {"success":false,"msg":"Offline..Check internet status"} )));
   }
   change_whatsapp_url(model:any)
   {   
    let body = JSON.stringify(model);   
    return this.http.post<any>(this.cUrl + 'change_whatsapp_url', body, this.httpOptions).pipe(catchError(this.handleError<any>('change_whatsapp_url', {"success":false,"msg":"Offline..Check internet status"} )));
   }
   
   add_new_member(model:any)
   {   
    let body = JSON.stringify(model);  
    return this.http.post<any>(this.cUrl + 'add_new_member', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_new_member', {"success":false,"msg":"Offline..Check internet status"} )));
   }

   update_member(model:any)
   {   
    let body = JSON.stringify(model);      
    return this.http.post<any>(this.cUrl + 'update_member', body, this.httpOptions).pipe(catchError(this.handleError<any>('update_member', {"success":false,"msg":"Offline..Check internet status"} )));
   }

  





 


  upload_logo(model: any) {
    let body = JSON.stringify(model);
   
    return this.http
      .post(this.cUrl + 'upload_logo', body,this.httpOptions)
      .pipe(catchError(this.handleError<any>('gst_report_common', body)));
  }
  logout() :void {
    localStorage.setItem('isLoggedIn','false');
    localStorage.removeItem('token');
  }











  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
