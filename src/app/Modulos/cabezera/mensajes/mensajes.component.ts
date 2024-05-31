import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/Services/config.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  constructor(
    private _config:ConfigService,
    private _empleados:EmpleadosService,
    private _alerta: NotificacionService,
    private ruta: Router,
  ) { }

  idServicio:any;
  ngOnInit() {
    let ser:any = localStorage.getItem(btoa('servicio'));
    this.idServicio = atob(ser);

    this.getComentarios();
  }

  vacio:boolean=false;
  mensajes:any;
  getComentarios(){
   
      this._config.getComentario(this.desde,this.hasta , this.idServicio)
      .subscribe(data=>{ 
       
        if (data != 'vacio') {
          this.mensajes = data;
          this.vacio = false;

        } else {
          this.vacio = true;
          
        }
      // console.log(this.mensajes);
      });
  
    }

    mostraMensaje:boolean=false;
    data:any;
    indexs:number = -1;
    verM(item:any,i:number){
       if ( this.indexs < 0 ) {
        this.indexs = this.indexs + 1;
       }
      this.indexs =i;
      this.data = item;
      this.mostraMensaje = true;
      this._config.abriM(item.nEmpleado,item.idMensaje)
      .subscribe(data=>{ 
        // this.getComentarios();
      });
    }


    me:any;
    enviarM(mensa:any,nEmpleado:number){
      
      if (mensa.value == '') {
        alert('Mensaje vacio!')
      } else {
        
        this._config.comentarM(this.data.nEmpleado,this.data.idMensaje,mensa.value)
        .subscribe(data=>{ 
          this.data = data;
         this.verM(data,this.indexs)
        //  this.getComentarios();
          this.me='';
        });
       
        
      }
      
    }

      
  desde:number=0;
  hasta:number=4;
  finData:boolean=false;
  up:boolean=false;
  scroll(){
   
    this.hasta +=4;
    this.desde +=4;
    this._config.getComentario(this.desde,this.hasta, this.idServicio)
    .subscribe(data=>{
      if (data == 'vacio') {
      
        this.finData = true;
        // console.error('fin...')
      } else {
        this.mensajes.push( ...data);
        console.log(this.mensajes);
        this.up=true;
        this.finData=false;
      }
     
    })
     
  }

 

    reload(){
      this.desde=0;
      this.hasta=4;
      this.finData=false;
      this.mostraMensaje=false;
      this.indexs = -1;
      
    this.getComentarios();

    }

}
