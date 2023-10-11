import {  Component, Inject, OnInit } from '@angular/core';
import { LoginService } from './Services/login.service';
import { NotificacionService } from './Services/notificacion.service';


import { EliminarModalComponent } from './Modales/eliminar-modal/eliminar-modal.component';
import { PageService } from './Services/page.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  
  modalUbicar : MdbModalRef<EliminarModalComponent> | null = null;

  
  constructor(
  
    private _noti:NotificacionService,
    private _se: LoginService,
    private _service : PageService, 
    private modalService: MdbModalService,

  ) { }

  user:any='';
  ngOnInit(): void {
  
    this.user =  localStorage.getItem('nombrePerfil');
  
    if (this.user == 'operario buma') {
      this.enviarMsj();
    }
    if (this.user == 'carretillero') {
      this.enviarMsj1();
      
    }
  
  }

  
  enviarMsj(){  
    this._se.emit('event' ,  '1')
    .subscribe(data=>{ 
      if (data == 'success') {
        this._noti.openToast1('PRONTO TE LLEGARA LA ESTRAZA SOLICITADA.', 'bg-success' , 'OK');
        setTimeout(()=>{
          let a = confirm('Recargar página?');
          if (a) {
            location.reload()
          }
        },2000)
      }else if(data == 'trash'){
        this._noti.openToast1('SOLICITUD ELIMINADA, NO TRAERÁ LA ESTRAZA.', 'bg-danger' , 'Eliminada');
        setTimeout(()=>{
          let a = confirm('Recargar página?');
          if (a) {
            location.reload()
          }
        },2000)
      }
     
    
    });
   }



   datos:any;
   enviarMsj1(){
    this._se.emit('event' , '1')
    .subscribe(data=>{ 
   
      this.datos = data;
     
        if (this.datos['o_f'] > 0) {
          // this._noti.openToast1('ELIMINADA OF: ' + this.datos['o_f'], 'bg-warning' , ' Maquina ' + this.datos['maquina'] );

        this.ubicar(this.datos, 17);
       
        }else if(data == 'trash'){
          this._noti.openToast1('SOLICITUD ELIMINADA, NO TRAERÁ LA ESTRAZA.', 'bg-danger' , 'Eliminada');
        }
        
        
      });
    
    
   }

  async ubicar(item:any,ubi:any){

   
    this.modalUbicar =    this.modalService.open(EliminarModalComponent, {
        ignoreBackdropClick: true,
        data: {item:item, ubi:ubi},
      
        modalClass: 'modal-lg'
      });
    this.modalUbicar.onClose.subscribe((message: any) => {
       
    });
  }




}
