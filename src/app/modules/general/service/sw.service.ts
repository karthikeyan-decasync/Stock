import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class Service_worker  {
  constructor(private Sw_update:SwUpdate,private _snackBar: MatSnackBar) {
      if(Sw_update.isEnabled)
      {
        console.log('Sw enabled & running')
      }
      else
      {
          console.log('Sw not running')
      }
  }

   check_for_update():void
  {
   this.Sw_update.versionUpdates.subscribe((result:any) => {
    if(result.type == 'NO_NEW_VERSION_DETECTED')
    {
      console.log('Already using latest Version..')
    }
    else
    {
      this.prompt_user()
    }
       
   })
  }
  
  private prompt_user():void{
      //  const snackbar = this._snackBar.open('Update available','Reload',{duration:10*1000})

      //  snackbar.onAction()
      //  .subscribe(() => {
      //    this.Sw_update.activateUpdate()
      //    .then(() => {
      //           window.location.reload();
      //    })
      //  })


      this.Sw_update.activateUpdate().then((update:any) => { 
       
         window.location.reload(); 
        
      
       //  this._snackBar.open('Updation completed','.. version beta..17',{duration:10*1000})

      }) 
 
   }

}