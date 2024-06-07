
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbTableDirective } from 'mdb-angular-ui-kit/table';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { LoginService } from 'src/app/Services/login.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import { HorasModalComponent } from '../horas-modal/horas-modal.component';



@Component({
  selector: 'app-reubicar-modal',
  templateUrl: './alerta-modal.component.html',
  styleUrls: ['./alerta-modal.component.css']
})
export class AlertaModalComponent implements OnInit {
  @ViewChild('tableHoras') tableHoras!: MdbTableDirective<any>;
  constructor(
    private modalRef: MdbModalRef<AlertaModalComponent>,
    private _empleados :EmpleadosService,
    private _login : LoginService,
    private _control : ControlHorasService,
    private _alerta :NotificacionService,
    private ruta:Router,
    private modalService: MdbModalService,

    ) {}
 
    item: any | null = null;
    param: any | null = null;
    nEmpleado: any | null = null;
    fecha_inicio: any | null = null;
    fecha_fin: any | null = null;
    idServicio: any | null = null;
    usuario: any | null = null;
    idEvento:number | null = null;
    estado:number | null = null;
    telefono:any | null = null;


    
 
    ngOnInit(): void {
   
  if (this.param == 1) {
    this.cHorario();
    this.getContolHoras();
    this.getJustificaciones();
  }
  }
















  // alerta 6
  horas:any;
  columnasHora?:any[];
  // horas disponibles
  hora1?:boolean;
  hora2?:boolean;
  hora3?:boolean;
  hora4?:boolean;
  hora5?:boolean;
  hora6?:boolean;
  hora7?:boolean;
  hora8?:boolean;
  hora9?:boolean;

  //bolsa de horas
  bolsa1?:boolean;
  bolsa2?:boolean;
  bolsa3?:boolean;
  bolsa4?:boolean;
  bolsa5?:boolean;
  //plus
  plus1?:boolean;
  plus2?:boolean;
  plus3?:boolean;

  getContolHoras(){
    this._control.configHoras(this.idServicio)
    .subscribe(data=>{
      this.horas = data;
  
  for (let i = 0; i < this.horas.length; i++) {
    
            if (this.horas[i].columna == 'hora1') {
              this.hora1 = true;
            }
            
            if (this.horas[i].columna == 'hora2') {
            this.hora2 = true;
            }
            if (this.horas[i].columna == 'hora3') {
            this.hora3 = true;
            }
            if (this.horas[i].columna == 'hora4') {
            this.hora4 = true;
            }
            if (this.horas[i].columna == 'hora5') {
            this.hora5 = true;
            }
            
            if (this.horas[i].columna == 'hora6') {
            this.hora6 = true;
            }
            if (this.horas[i].columna == 'hora7') {
            this.hora7 = true;
            }
            if (this.horas[i].columna == 'hora8') {
            this.hora8 = true;
            }
            if (this.horas[i].columna == 'hora9') {
            this.hora9 = true;
            }
            if (this.horas[i].columna == 'bolsa1') {
              this.bolsa1 = true;
            }
            if (this.horas[i].columna == 'bolsa2') {
              this.bolsa2 = true;
            }
            if (this.horas[i].columna == 'bolsa3') {
              this.bolsa3 = true;
            }
            if (this.horas[i].columna == 'bolsa4') {
              this.bolsa4 = true;
            }
            if (this.horas[i].columna == 'bolsa5') {
              this.bolsa5 = true;
            }
  
            if (this.horas[i].columna == 'plus1') {
              this.plus1 = true;
            }
            if (this.horas[i].columna == 'plus2') {
              this.plus2 = true;
            }
            if (this.horas[i].columna == 'plus3') {
              this.plus3 = true;
            }
        
      }
  
       })
    }
  

  dataSource:any;
  loadingHoras:boolean=true;
  cHorario(){
    this._login.controlHorarioByEmpleado(this.nEmpleado,this.fecha_inicio,this.fecha_fin,this.idServicio)
    .subscribe(data=>{ 
    //  console.log(data);
     
      if (data != 'error') {
        this.dataSource=data;
        setTimeout(()=>{
        this.loadingHoras = false
        },2000)
       
      }else{
        alert('error')
      }
   
    });
  }

  comentF?:string;
  nombre?:string;
  apellidos?:string;
  modalM:any;
  fechaTrabajo:any;

  addCo( item:any){
    this.comentF = item.comentarios
    this.nEmpleado = item.nEmpleado
    this.fechaTrabajo = item.fechaTrabajo
    this.nombre = item.nombre,
    this.apellidos = item.apellidos,
    this.fechaTrabajo = item.fechaTrabajo;

    this.modalM =  this.modalService.open(HorasModalComponent, {
      containerClass: 'right',
      modalClass: 'modal-side modal-top-right',
      ignoreBackdropClick: true,
      data: {
       param:5,
       nEmpleado:this.nEmpleado,
       fechaTrabajo:this.fechaTrabajo,
       idServicio:this.idServicio,
       name:this.nombre,
       lastName:this.apellidos,
       comentF: this.comentF
    
      },
    });
    this.modalM.onClose.subscribe((message: any) => {
     
      if(message == 'closeMessage' ||  message == 'success'){
       
      }
   });
  }


  justifi:any;
  getJustificaciones(){
  this._control.getJustificaciones(this.idServicio)
  .subscribe(justifi=>{ 
  this.justifi = justifi;
  });
  }

  valor:number=0;
  justiF?:number;
  emplJus?:boolean;
  idPlantillaF?:number;
  nEmpledo:any;
  horasNormales:number=0;
  horasAusentes:any;
  modalB:any;
  justi(justificante:any,idPlantilla:any ,empleado:any){
   
    this.justiF = justificante.target.value;
    this.horasNormales = empleado.normal;
    this.fechaTrabajo = empleado.fechaTrabajo;
    this.nEmpledo = empleado.nEmpleado;

  
    this.emplJus = true;

   this.idPlantillaF = idPlantilla;
   
   if (this.justiF == 100) {
     this.valor =  this.horasNormales;
     this.horasAusentes = this.valor;
   
    } else {
    
      this.modalM =  this.modalService.open(HorasModalComponent, {
        containerClass: 'right',
        modalClass: 'modal-side modal-top-right',
        ignoreBackdropClick: true,
        data: {
         param:2,
         idPlantillaF:this.idPlantillaF,
         nEmpledo:this.nEmpledo,
         horasNormales:this.horasNormales,
         horasAusentes:this.horasAusentes,
         fechaTrabajo:this.fechaTrabajo,
         justiF:this.justiF,
         idServicio:this.idServicio,
         valor:this.valor,
      
        },
      });
      this.modalM.onClose.subscribe((message: any) => {
        console.log(message);
        
        if(message == 'closeMessage' ||  message == 'success'){
        //   this._empleados.consultaProgramacionAdmin(this.fechas)
        //   .subscribe(res=>{
        //     this.dataSource = res;
        //     this.datas = true;
          
        //  })
        }
     });
    }
    
  }
  datosVN:any;
  hNormal(nNormal:any,idPlantilla:any,i:any,horario:any){

    let turno = horario.toLowerCase();
    this.datosVN = nNormal.value;
    if (this.datosVN == undefined) {
      this.datosVN = null;
    }else if (this.datosVN == "") {
     this.datosVN = null;
   }
    
    this._control.editarHNormales(this.datosVN, idPlantilla,this.usuario)
    .subscribe(res=>{ 

       
      if (res == 'success') {
        this._alerta.openToast1('Hora normal editada...' , 'bg-success text-white' , 'OK');
        // this.horasMostrar = false;
        //   this.indice = -1;

        // this.habilitarE1=false;
      }

    });
     
   }

   datosVNP:any;
   hAusentes(hAus:any,idPlantilla:any,i:any,horario:any){
 
     let turno = horario.toLowerCase();
     this.datosVNP = hAus.value;
     if (this.datosVNP == undefined) {
       this.datosVNP = null;
     }else if (this.datosVNP == "") {
      this.datosVNP = null;
    }
     
     this._control.editarHAusentes(this.datosVNP, idPlantilla,this.usuario)
     .subscribe(res=>{ 
 
        
       if (res == 'success') {
        this._alerta.openToast1('Hora ausente editada...' , 'bg-success text-white' , 'OK');
         // this.habilitarE1=false;
        //  this.horasMostrar = false;
        // this.indice = -1;

       }
 
     });
      
    }

    
   dat:any;
   datosV:any;
   onClick(fechaTrabajo:any , nEmpleado:any , datos:any , columna:any,idPlantilla:any,is:any){
     
       this.datosV = datos.value;
    
     if (this.datosV == undefined) {
       this.datosV = null;
     }else if (this.datosV == "") {
      this.datosV = null;
    }
     
    //  alert('dato guardado')
     this._control.editplantillasColumn(fechaTrabajo , nEmpleado , this.datosV , columna,idPlantilla,this.usuario, this.idServicio)
     .subscribe(res=>{ 
      
       if (res == 'success') {
        this._alerta.openToast1('Campo editado...' , 'bg-success text-white' ,  'OK');
        // this.horasMostrar = false;
        // this.indice = -1;

      }
     });
 
   
   }
 
   



horario?:string;
horarios?:string;
fechaTra:any;
name:any;
lastName:any;
idPla?:number;
puesto:any
// Sin justificación
changeTurno(item:any  ){
  this.puesto = item.puesto;
  this.horario = item.horario;
  this.idPla = item.idPalntilla;
  this.name = item.nombre;
  this.lastName = item.apellidos;
  this.fechaTra = item.fechaTrabajo;
  this.nEmpleado = item.nEmpleado;
  this.modalM =  this.modalService.open(HorasModalComponent, {
    containerClass: 'right',
    modalClass: 'modal-side modal-top-right',
    ignoreBackdropClick: true,
    data: {
     param:3,
     name:this.name,
     horario:this.horario,
     lastName:this.lastName,
     fechaTra:this.fechaTra,
     nEmpleado:this.nEmpleado,
     idServicio:this.idServicio,
  
    },
  });
  this.modalM.onClose.subscribe((message: any) => {
    console.log(message);
    
    if(message == 'closeMessage' ||  message == 'success'){
      this.cHorario();
    }
 });

}

validarSolicitud(idEvento:any,estado:any){
  let confirmar = confirm("¿Desea validar la solicitud?");

  if (confirmar) {
    this._login.getCreditos()
    .subscribe(data=>{ 

        if(data  == 0){
          let credito = confirm("No tiene crédito. ¿Desea validar la solicitud sin enviar SMS?");
          if(credito){
            this.enviarSmsValidar(this.nEmpleado,this.telefono,idEvento,estado,'vacio',data);
          }
        }else{
       let   mensaje =   prompt("Texto descriptivo","Texto por defecto");
          if (mensaje !="") {
            if (mensaje != null) {
              this.enviarSmsValidar(this.nEmpleado,this.telefono,idEvento,estado,mensaje,data); 
            }
          } else{
            alert('El mensaje no puede estar vacío.')
          }     
        }
    }); 
  }
}
enviarSmsValidar(nEmpleado:any,telefono:any,id:any,estado:any,mensaje:any,credito:any){
  this._login.enviarSmsValidar(nEmpleado,telefono,id,estado,mensaje,credito)
  .subscribe(data=>{ 
  // console.log(data);
  if (data == 'success') {
    this._alerta.openToast1('SMS enviado correctamente', 'bg-success text-white' ,  'OK');
    this.modalRef.close('success')
  }else if(data =='ok'){
    this._alerta.openToast1('SMS no puedo ser  enviado,por falta de crédito, o porque no tiene el consentimiento para el envío de SMS ', 'bg-danger text-white' ,  'OK');
    this.modalRef.close('ok')
 
  }else{
    this._alerta.openToast1('Se ha producido un error.', 'bg-danger text-white' ,  'OK');
    this.modalRef.close('error')
  }
  });
}





  // Quitar el modal!!!!
  close(){
    const closeMessage = 'closeMessage';
    this.modalRef.close(closeMessage)
  }

}
