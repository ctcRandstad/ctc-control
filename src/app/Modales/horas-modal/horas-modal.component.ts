import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { LoginService } from 'src/app/Services/login.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';

@Component({
  selector: 'app-horas-modal',
  templateUrl: './horas-modal.component.html',
  styleUrls: ['./horas-modal.component.css']
})
export class HorasModalComponent implements OnInit {
  optionsSelect: Array<any>;
  constructor(
    public modalRef: MdbModalRef<HorasModalComponent>,
    public _empleados :EmpleadosService,
    private _control : ControlHorasService,
    public _alerta :NotificacionService,
    public _login :LoginService,
  ) {
    this.optionsSelect = [
      { value: '8', label: '8 Horas' },
      { value: '7.75', label: '7.75 Horas' },
      { value: '7.50', label: '7.50 Horas' },
      { value: '7.25', label: '7.25 Horas' },
      { value: '7', label: '7 Horas' },
      { value: '6.75', label: '6.75 Horas' },
      { value: '6.50', label: '6.50 Horas' },
      { value: '6.25', label: '6.25 Horas' },
      { value: '6', label: '6 Horas' },
      { value: '5.75', label: '5.75 Horas' },
      { value: '5.50', label: '5.50 Horas' },
      { value: '5.25', label: '5.25 Horas' },
      { value: '5', label: '5 Horas' },
      { value: '4.75', label: '4.75 Horas' },
      { value: '4.50', label: '4.50 Horas' },
      { value: '4.25', label: '4.25 Horas' },
      { value: '4', label: '4 Horas' },
      { value: '3.75', label: '3.75 Horas' },
      { value: '3.50', label: '3.50 Horas' },
      { value: '3.25', label: '3.25 Horas' },
      { value: '3', label: '3 Horas' },
      { value: '2.75', label: '2.75 Horas' },
      { value: '2.50', label: '2.50 Horas' },
      { value: '2.25', label: '2.25 Horas' },
      { value: '2', label: '2 Horas' },
      { value: '1.75', label: '1.75 Horas' },
      { value: '1.50', label: '1.50 Horas' },
      { value: '1.25', label: '1.25 Horas' },
      { value: '1', label: '1 Horas' },
      { value: '0.75', label: '0.75 Horas' },
      { value: '0.50', label: '0.50 Horas' },
      { value: '0.25', label: '0.25 Horas' },

    
      ];
  }

  param: any | null = null;
  justi: any | null = null;
  valor:   any | null = null;
  horasAusentes:   any | null = null;
  horasNormales:   any | null = null;
  justiF:   any | null = null;
  idPlantillaF:   any | null = null;
  fechaTrabajo:   any | null = null;
  nEmpledo:   any | null = null;
  idServicio:   any | null = null;
  horario:   any | null = null;
  name:   any | null = null;
  lastName:   any | null = null;
  horarios:   any | null = null;
  nEmpleado:   any | null = null;
  fechaTra:   any | null = null;
  comentF:   any | null = null;
  puesto:   any | null = null;
  usuario:   any | null = null;
  puestos:   any | null = null;
  listTurno:   any | null = null;
  turnoOriginal:   any | null = null;
  idAlertaI:   any | null = null;
  numero:   any | null = null;
  


  ngOnInit(): void {
    this._empleados.getPuestos(this.idServicio)
    .subscribe(data=>{
     
      if (data != 'error') {
        this.puestos = data;
      }
    });
    this._empleados.getTurnos1A(this.idServicio)
      .subscribe(data=>{ 
        if (data != 'error') {
          this.listTurno = data;
        }
      });
      this.getT();
  }

  turno:any;
getT(){
  this._empleados.getTurnos1(this.idServicio)
    .subscribe(data=>{
    
      if (data != 'error') {
        this.turno =  data;
      }else{
        this.turno=[];
      }
      
      })
}



  close(): void {
    const closeMessage = 'closeMessage';
    this.modalRef.close(closeMessage)
  }


  selectedValue? :string;
  getSelectedValue(event:any){
    this.valor = event;
  }
  
  
  siCambiar(){

    
    if (this.valor > 0 ) {
      this.horasAusentes = this.valor;
      if (this.horasAusentes > this.horasNormales) {
        alert('Error de horas ausentes.')
      }else{
       this.siValidarJust(this.horasAusentes , this.horasNormales);
        this.selectedValue = '';
       
      }
      }else{
      this.modalRef.close('closeMessage');   
      }
  }

  salir(){
    this.modalRef.close('closeMessage');
  }


  siValidarJust(horasAusentes:any , horasNormales:any){
    this._control.editarJustificanteAdmin(this.justiF, this.idPlantillaF,this.fechaTrabajo, this.nEmpledo , horasAusentes , horasNormales,this.idServicio)
       .subscribe(res=>{ 
  
         if (res == 'success') {
           this._alerta.openToast1('Justificación asignada...' , 'bg-success text-white' , 'OK');
           
           this.modalRef.close('success');
         }else{
          this.modalRef.close('closeMessage');
         }
       });
     }


     addH(horario:any){
      this.horarios = horario;
      }

btn?:boolean;
camHorario(changeHorario:any){
  this.btn=true;
  this._empleados.cambiarHorario(changeHorario.value)
  .subscribe(data=>{ 
    if (data == 'success') {
      this._alerta.openToast1('CAMBIO DE HORARIO CORRECTO...' , 'bg-success text-white' , 'OK');
      this.modalRef.close('success');
      this.btn =false;
    }else{
      this._alerta.openToast1('ERROR AL CAMBIAR DE HORARIO...' , 'bg-danger text-white' , 'ERROR');
      this.modalRef.close('closeMessage');
    }
  });
  
}


addComent(cometario:any){
   

  this._empleados.addCometario(cometario.value)
  .subscribe(data=>{ 

     if (data == 'success') {
      this._alerta.openToast1('COMENTARIO GUARDADO...' , 'bg-success text-white' , 'OK');
      this.modalRef.close('success');
     
     } else {
       this._alerta.openToast1('Error en el sistema' , 'bg-danger text-white' , 'OK');
       this.modalRef.close('closeMessage');
     }
  });


 }

   
 puesto_id?:number;
 pu(event:any){
    this.puesto_id = event;
 }

 
camPuesto(changePuesto:any){

  this._control.cambioPuest(changePuesto.value)
  .subscribe(data=>{ 
      if (data == 'success') {
        this._alerta.openToast1('PUESTO CAMBIADO CORRECTAMENTE ...' , 'bg-success text-white' , 'OK');
        this.modalRef.close('success');
     
    } else {
      this._alerta.openToast1('Error en el sistema' , 'bg-danger text-white' , 'OK');
      this.modalRef.close('closeMessage');
    }  
  });
}


turno_id?:number;
tu(event:any){
   this.turno_id = event;
}

camTurno(changePuesto:any){
  // console.log(changePuesto.value);
  
    this._control.cambioTurno(changePuesto.value)
    .subscribe(data=>{ 
      if (data == 'success') {
        this._alerta.openToast1('CAMBIO DE TURNO CORRECTO...' , 'bg-success text-white' , 'OK');
        this.modalRef.close('success');
      } else {
        this._alerta.openToast1('Error en el sistema' , 'bg-danger text-white' , 'OK');
        this.modalRef.close('closeMessage');
        
      }  
  });
    // console.log(changePuesto.value);
    
  }

  filtarTuros:any;
filtrar(co:any){
  this.filtarTuros = co.value;
  this.modalRef.close(this.filtarTuros);
}

siValidar(){    
  this._control.validarEmpleado(this.fechaTrabajo,this.nEmpleado, this.idPlantillaF)
  .subscribe(res=>{ 
      if (res == 'success') {
        this._control.eliminarAlertaCambio(this.idPlantillaF)
        .subscribe(data=>{ 
          console.log(data);
          
             if (data == 'success') {
              this.modalRef.close('success');
               this._alerta.openToast1('Empleado validado correctamente...', 'bg-success text-white' , 'OK');   // this.getAlertas1();    
                
             }
        });
      } else {
        alert ('Error al validar!');
      }
      });
  
   }

   siValidarInfo(actionI:any){
    this._control.validarEmpleadoInfo(actionI.value)
    .subscribe(data=>{
       if (data == 'success') {
        this._alerta.openToast1('Empleado validado correctamente...', 'bg-success text-white' , 'OK');
        this.modalRef.close('success');
       }else{
        alert ('Error al validar!');
        this.modalRef.close('closeMessage');

       }
    });
    
  }

  validando?:Boolean;
  siValidarTodo(){
    this.validando=true;
    this._login.validarTodo(this.numero,this.idServicio)
    .subscribe(data=>{ 
   
       if (data == 'success') {
         this._alerta.openToast1('TODO LOS CAMPOS FUERON VALIDADOS...' , 'bg-success text-white' , 'OK');
         this.modalRef.close('success');
       }else{
        this._alerta.openToast1('ERROR AL VALIDAR...' , 'bg-danger text-white' , 'ERROR');
        this.modalRef.close('closeMessage');
        this.validando=false;
       }
    });
  }

}
