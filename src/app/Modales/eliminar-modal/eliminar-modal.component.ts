import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { PefilModalComponent } from '../pefil-modal/pefil-modal.component';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import { ConfigService } from 'src/app/Services/config.service';

@Component({
  selector: 'app-eliminar-modal',
  templateUrl: './eliminar-modal.component.html',
  styleUrls: ['./eliminar-modal.component.css']
})
export class EliminarModalComponent implements OnInit {

  constructor(
    public modalRef: MdbModalRef<PefilModalComponent>,
    public _empleados:EmpleadosService,
    public _config:ConfigService,
    public _alerta:NotificacionService,

  ) { }

  eliminar: any | null = null;
  justi: any | null = null;
  nombre: any | null = null;
  apellidos: any | null = null;

  nEmpleado:  any | null = null;
  fechaInicioJ: any | null = null;
  fechaFinJ: any | null = null;
  idJE: any | null = null;
  idServicio:  any | null = null;
  detallesJ: any | null = null;
  tit: any | null = null;
  idDocumento: any | null = null;
  idHora:  any | null = null;
  desc:any | null = null;
  contratos:any | null = null;
  idContrato:any | null = null;
  name:any | null = null;
  idContratoBaja:any | null = null;
  ngOnInit(): void {
    console.log(this.idContrato);
    
  }

  no(){
    this.modalRef.close('success1');
  }

  idJustificacion:number=0;
  plus:number=0;
  btn:boolean=false;
  addChangeJu(event:any){
    
    
    let nombres = event.target.value.split("-");

    this.idJustificacion = nombres[0];
    this.plus = nombres[1];
 }

 addJus(formi:any){
   this.btn = true;
  this._empleados.cambioJUsti(formi.value)
  .subscribe(data=>{ 
    
   if (data == 'success') {
     this._alerta.openToast1('JUSTIFICACIÓN ELIMINADA CORRECTAMENTE' , 'bg-success text-white' , ' Justificación');
     location.reload();
    this.modalRef.close('success');
   } else {
    this.btn = false;
     this._alerta.openToast1('ERROR AL ELIMINAR LA JUSTIFICACIÓN' , 'bg-danger text-white' , 'Error Justificación');
   }
  
  });
  
  }

 // eliminar 2

 btnExitos:boolean=false;
 nor:any=8;
 ini:any;
 alta(action:any){
   this.btnExitos = true;
   this._empleados.alta(action.value)
   .subscribe(data=>{ 
 
     if (data == 'success') {
     this._alerta.openToast1('FECHA DE ALTA AGREGADA.' , 'bg-success text-white' , 'OK');
     this._empleados.vacacionesNoDis(action.value)
     .subscribe(resp=>{ 
      

     if (resp== 'si') {
      this.modalRef.close('success');
     }else{
      location.reload();
     }
     });

    
   } else {
     this._alerta.openToast1('ERROR AL COLOCAR FECHA  DE ALTA' , 'bg-danger text-white' , 'Error');
     this.modalRef.close('error');
   }
   this.btnExitos = false;
   
 });
 
 }


 si:boolean= false;
 borrarAhora(nEmpleado:any , fechaInicioJ:any,fechaFinJ:any ,idJE:any){
this.si = true;
  this._empleados.borrarJust(nEmpleado , fechaInicioJ,fechaFinJ ,idJE)
  .subscribe(data=>{ 

    if (data == 'success') {
      this._alerta.openToast1('JUSTIFICACIÓN ELIMINADA CORRECTAMENTE' , 'bg-success text-white' , 'OK');
    location.reload();
    } else if(data == 'no'){
      this._alerta.openToast1('ERROR: LA FECHA DE ALTA ES MENOR A LA DE HOY.' , 'bg-danger text-white' , 'Error');
      this.modalRef.close('error');
      this.si = false;
      this.modalRef.close('error');
    }else{
      this._alerta.openToast1('ERROR AL ELIMINAR LA JUSTIFICACIÓN' , 'bg-danger text-white' , 'Error');
      this.si = false;
      this.modalRef.close('error');
      
    }
  });
}

eliminarD(){
  this._empleados.eliminarD(this.idDocumento)
  .subscribe(data=>{ 
   if(data == 'success'){
    
    this._alerta.openToast1('Asignación eliminada.', 'bg-success text-white' , 'OK');
    this.modalRef.close('success');
   }else{
    this._alerta.openToast1('No se ha podido eliminar la asignación.', 'bg-danger text-white' , 'ERROR');
    this.modalRef.close('error');
     
   }
  });
}

addDEsc(des:any){
    
  this._config.editarDesHoras(des.value)
  .subscribe(res=>{
    if (res == 'success') {
      this._alerta.openToast1('Campo editado!', 'bg-success text-white' , 'OK');
      this.modalRef.close('success');
    } else {
      this._alerta.openToast1('Error al editar el campo!', 'bg-danger text-white' , 'ERROR');
      this.modalRef.close('error');
    }
  })
  
}

addContratos(contrato:any ){
  this.contratos = contrato.value;
  
  this._config.addContratos(this.contratos)
  .subscribe(res=>{

    if (res == 'success') {
      this._alerta.openToast1('Tipo de contrato agregado con éxito!', 'bg-success text-white' , 'OK');
      this.modalRef.close('success');
    } else {
      this._alerta.openToast1('ERROR:: en el servidor', 'bg-success text-white' , 'OK');
      this.modalRef.close('error');
    }
  })
  
}

bajaE(){
  this._config.bajaContratos(this.idContratoBaja)
  .subscribe(data=>{
    if (data == 'success') {
      this._alerta.openToast1('La empresa fue dado de baja' , 'bg-success text-white'  , 'OK');
      this.modalRef.close('success');
    } else {
      this._alerta.openToast1('ERROR:: en el servidor' , 'bg-danger text-white' , 'ERROR');
      this.modalRef.close('error');
    }
  })
  }


  coment:string='';
  borrarAhora1(ac:any ){
    this.si = true;
    
    this._empleados.borrarJust1(ac.value)
    .subscribe(data=>{ 
      console.log(data);
      
      
      if (data == 'success') {
        alert('Borrado excepcional. Por favor revisa al trabajador, si todo está correcto.');
        this._alerta.openToast1('JUSTIFICACIÓN ELIMINADA CORRECTAMENTE' , 'bg-success text-white' , 'OK');
        location.reload();
        this.coment='';
      } else if(data == 'Distinto'){
        this._alerta.openToast1('ERROR: NO PUEDE BORRAR UN JUSTIFICACIÓN QUE NO SEA DEL AÑO EN CURSO.', 'bg-danger text-white' , 'Error');
        this.si = false;
      }else{
        this._alerta.openToast1('ERROR AL ELIMINAR LA JUSTIFICACIÓN', 'bg-danger text-white' , 'Error');
        this.si = false;
      }
    });
  }


}
