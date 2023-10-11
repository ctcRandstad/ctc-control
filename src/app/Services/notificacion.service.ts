import { Injectable } from '@angular/core';
import { MdbNotificationRef ,MdbNotificationService} from 'mdb-angular-ui-kit/notification';
import { AlertComponent } from '../Component/Services/alert/alert.component';
import { ToastComponent } from '../Component/Services/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  notificationRef: MdbNotificationRef<ToastComponent> | null = null;
  notificationRefAlert: MdbNotificationRef<AlertComponent> | null = null;
  constructor(
    private notificationService: MdbNotificationService,
  ) { }

  openToast(text:string,color:string,cabezera:string ) {
      this.notificationRef = this.notificationService.open(ToastComponent,  
        {
          data: 
          {
              text, 
              color,
              cabezera
          } ,
        });
        setTimeout(()=>{
          this.notificationRef?.close();
        },2000)
    }

    openAlert(text:string,color:string,positions:any){
      this.notificationRefAlert = this.notificationService.open(AlertComponent,  
        {
          position: positions,
          data: 
          {
          text, 
              color
          } ,
        });
        setTimeout(()=>{
          this.notificationRefAlert?.close();
        },2000)
    }

    

    openToast1(text:string,color:string,cabezera:string ) {

      this.notificationRef = this.notificationService.open(ToastComponent,  
        {
          data: 
          {
              text, 
              color,
              cabezera
          } ,
          position: 'top-center'
        });
    
    }
}
