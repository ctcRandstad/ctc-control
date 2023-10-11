import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import { PageService } from 'src/app/Services/page.service';


@Component({
  selector: 'app-reubicar-modal',
  templateUrl: './reubicar-modal.component.html',
  styleUrls: ['./reubicar-modal.component.css']
})
export class ReubicarModalComponent implements OnInit {

  constructor(
    public modalRef: MdbModalRef<ReubicarModalComponent>,
    private services:PageService,
    private _noti:NotificacionService,
    private ruta:Router

    ) {}
 
    item: any | null = null;
    ubi: any | null = null;

    @Output() messageEvent:any;
    message: string = "Hola Mundo!"
  
    ubicaciones:boolean=false;
    user:any='';
    ngOnInit(): void {
    this.activeLang =  localStorage.getItem('idioma' )
    this.user =  localStorage.getItem('operario')

     if (this.ubi == 0) {
      this.ubicaciones = false;
     } else {
      this.ubicaciones = true;
      this.getUbicacione(3);
     
     }
  }

  // get(){
  //   this.getUbicacione();
  // }

  select:boolean= false;
  getUbi(param:number){
    this.getUbicacione(param)
    
  }
  
  
  data:any;
  getUbicacione(param:number){
    this.select = true;
  this.services.getUbicacionesParam(param)
  .subscribe(data=>{ 
     this.data = data;   
    
  });
  }


  no(){
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }

  action:boolean=false;
  public activeLang:any;
    si(){
      
      this.action=true;
      this.services.setReubicarBobina(this.item)
      .subscribe(data=>{  
     if (data == 'success') {
      let a ='';
      let b ='';
         if( this.activeLang == 'ca'){
            a = 'CANVI REALITZAT!'
            b= "BOBINA REUBICADA";
          }else{
              a = "CAMBIO REALIZADO!";
              b = 'BOBINA REUBICADA';
          }
      this._noti.openToast( a ,'bg-success', b)
     }else{
      let a ='';
      let b ='';
      if( this.activeLang == 'ca'){
       a = 'SI US PLAU VERIFIQUEU LES DADES!'
       b= "ERROR AMB LA REUBICACIÓ";
   }else{
       a = "POR FAVOR VERIFIQUE LOS DATOS!";
       b = 'ERROR CON LA REUBICACIÓN';
   }
      this._noti.openToast( a ,'bg-danger', b)
     }
           
        });
      
    this.modalRef.close('success');
  }

  a(event:any){
   this.item = event.value;

 if (!this.mostrarInput) {
    if (this.item.cantidad < 1) {
      alert('Número 0 o negativo');
    }else if(this.item.cantidad == this.item.total){
      alert('Cantidad igual a todas.');
    }else if(this.item.cantidad > this.item.total){
      alert('Cantidad mayor a todas.');
    }else{
    this.si();
    }
 }else{
   this.si();
 }
 
   
   
  }


  mostrarInput:boolean = true;
  todasB(){
    this.mostrarInput = !this.mostrarInput;
   

  }

}
