import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Conceptos } from 'src/app/Models/conceptos';
import { Empleado } from 'src/app/Models/emplados';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import { PageService } from 'src/app/Services/page.service';

@Component({
  selector: 'app-baja-modal',
  templateUrl: './baja-modal.component.html',
  styleUrls: ['./baja-modal.component.css']
})
export class BajaModalComponent implements OnInit {

  constructor(
    public modalRef: MdbModalRef<BajaModalComponent>,
    private services:PageService,
    private ruta:Router,
    private _empleados:EmpleadosService,
    private _alerta:NotificacionService,
    private modalService: MdbModalService,
    ) {
    }
    
    nombre: string | null = null;
    apellidos: string | null = null;
    nEmpleado: any | null = null;
  
    ngOnInit(): void {
  
  }

fechaHoy:any;
anio:any;
fecha(){
  var f = new Date();
//  this.fechaHoy =  f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
 this.fechaHoy =  f.getFullYear() + '/' + (f.getMonth() +1) + "/" +  f.getDate() ;
  this.anio =f.getFullYear();
  }

  
  errorFecha:boolean=false;
 fechaBajaF(fechaBaja:any){
  this.fecha();
  let  fechaHoy = new Date(this.fechaHoy);
  let fechados = new Date(fechaBaja.value);


 if (fechaHoy.getTime() <= fechados.getTime()) {
   this.errorFecha= false;
   
 } else {
  this.errorFecha= true;

   
 }
   
     
  }
  aceptarB:boolean=false;
  estado(){
   
     if (this.aceptarB) {
       this.aceptarB = false;
     } else {
      this.aceptarB=true;
     }
  }


  aceptar:any;
  fechaBajas:any;
  baja(bajaOp:any ){
    let confirmar = confirm('¿ Aceptar?')
    if (confirmar) {
       this._empleados.bajaEmpleados(bajaOp.value)
       .subscribe(data=>{         
         if (data == 'success') {
         
           this.errorFecha = false;
           this._alerta.openToast1('Baja de' + this.nombre + ' ' + this.apellidos + ' fue exitosa ' , 'bg-success text-white' ,'Baja de operario');
           this.aceptar=null;
           setTimeout(()=>{
            location.reload();
           },1500)
          
         } else {
           alert('Error a dar de baja el operario' + this.nombre + ' ' + this.apellidos);
   
         }
       })
      
    }else{
      this.aceptar=null;
      this.estado();
      this.fechaBajas='';
      this.errorFecha = false;
    }
  }





}
