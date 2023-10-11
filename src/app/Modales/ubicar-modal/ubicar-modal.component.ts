import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import { PageService } from 'src/app/Services/page.service';
import { PefilModalComponent } from '../pefil-modal/pefil-modal.component';

@Component({
  selector: 'app-ubicar-modal',
  templateUrl: './ubicar-modal.component.html',
  styleUrls: ['./ubicar-modal.component.css']
})
export class UbicarModalComponent implements OnInit {
 
  constructor(
    public modalRef: MdbModalRef<PefilModalComponent>,
    private services:PageService,
    private _noti:NotificacionService,

    ) {}
 
    item: any | null = null;
    ubi: any | null = null;
  
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
    // location.reload();
    // console.log('salir');
    this.modalRef.close();
    
  }

  action:boolean=false;
  public activeLang:any;
    si(){
      this.action=true;
      this.services.ubicarBobinas(this.item.of, this.item.anch_real, this.item.idUbicacion,this.item.instruccion,this.user)
      .subscribe(data=>{ 
     
      if (data == 'error') {
            this.action = false;
            let a ='';
            if( this.activeLang == 'es'){
              a = 'Error of y ancho no encontrada.'
          }else{
              a = "Error of i ample no trobada.";
          }
        
          this._noti.openToast(a, 'bg-danger' , 'ERROR');
          setTimeout(()=>{
            // location.reload();
          },2500);
      }else if(data == 'error1'){
          this.action = false;
          let a ='';
          if( this.activeLang == 'es'){
            a = 'Bobinas no insertadas en la ubicación.'
        }else{
            a = "Bobines no inserides a la ubicació.";
        }

          this._noti.openToast(a, 'bg-danger' , 'ERROR');
          setTimeout(()=>{
            // location.reload();
          },2500);
      }else{
        // OK....
        // this.modalRef.close();
        let a ='';
        if( this.activeLang == 'ca'){
            a = 'BOBINA COLOCADA EN LA UBICACIÓ PROPUESTA.'
        }else{
            a = "BOBINA COLOCADA EN LA UBICACIÓN PROPUESTA.";
        }
       
        this._noti.openToast(a, 'bg-success' , 'OK');
        setTimeout(()=>{
          this.no();
        },800);
      }
    
    });
   
    // this.modalRef.close();
  }

  

  a(event:any){
   this.item = event.value;
 
   this.si();
   
   
  }

}
