import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbTableDirective } from 'mdb-angular-ui-kit/table';
import { HorasModalComponent } from 'src/app/Modales/horas-modal/horas-modal.component';
import { Empleado } from 'src/app/Models/emplados';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import { HorasComponent } from '../../horarios/horas/horas.component';

@Component({
  selector: 'app-consulta-horario',
  templateUrl: './consulta-horario.component.html',
  styleUrls: ['./consulta-horario.component.css']
})
export class ConsultaHorarioComponent implements OnInit {

  @ViewChild('tableHoras') tableHoras!: MdbTableDirective<any>;

  @HostListener('blur', ['$event.target']) onBlur(target:any) {
    console.log(`onBlur(): ${new Date()} - ${JSON.stringify(target)}`);
  }
  // @ViewChild('demoBasic', { static: true }) demoBasic: MdbModalService;


  constructor( 
    private ruta:Router,
    private _empleados :EmpleadosService,
    private _alerta:NotificacionService,
    private _control : ControlHorasService,
    private excelService:ExcelService,
    private modalService: MdbModalService,

    ) {
      
     }
 
  usuario:any;
  idServicio:any;
  year1:any;
  year2:any;
  year:any;
  ngOnInit() {
    let ser:any = localStorage.getItem(btoa('servicio'));
    let rol:any = localStorage.getItem('usuario')
    this.usuario = atob(rol);
   
    this.idServicio = atob(ser);
  
    this.getT();
    this.getJustificaciones();
    var today = new Date();
    this.year = today.getFullYear();
  this.year1 = this.year - 1;
  this.year2 = this.year - 2;
   
  }

  panel:boolean=false;
  passw= 'ctc-control';

  ingresar(pass:any){
   
   if (pass.value === this.passw) {
     this.panel = true;
   } else {
     this.panel = false;
     alert('ERROR EN LA CONTRASEÑA.')
   }
    
  }



   onKeyDownHandler(event:any) {

    var codigo = event.which || event.keyCode;

    console.log("Presionada: " + codigo);
     
    if(codigo === 13){
      console.log("Tecla ENTER");
    }

    if(codigo >= 65 && codigo <= 90){
      console.log(String.fromCharCode(codigo));
    }

     
}



  turno:any;
  getT(){
    this._empleados.getTurnos(this.idServicio)
      .subscribe(data=>{
        this.turno =  data;
          
        })
  }


  showAndHideModal() {
    // this.demoBasic.show();

    // setTimeout(() => {
    //   this.demoBasic.hide();
    // }, 4000);

}
modalM:any;
addModal(param:number){
  this.modalM =  this.modalService.open(HorasComponent, {
    containerClass: 'right',
    modalClass: 'modal-side modal-top-right',
    ignoreBackdropClick: true,
    data: {
     param:param,
    },
  });
  this.modalM.onClose.subscribe((message: any) => {
    if(message == 'success'){
     setTimeout(()=>{
      
     },500);

    }
 });

}

search1(event: Event): void {
  const searchTerm = (event.target as HTMLInputElement).value;

  this.tableHoras.search(searchTerm);
}



datas?:boolean;
dataSource:any;
datos:any;
turnos='aaa';
datosConsulta:any;
loadingHoras:boolean=true;
mostrarBtn:boolean=false;
loading?:boolean;
plantillas:any;
anioConsulta:any;
  buscar(action:any , alertaSinValidar:any){
    this.datas = true;
    this.mostrarBtn = true;
    this.horasMostrar = false;
    this.indice = -1;
    let fechas1 = action.value.fechaInicio;
    let fechas = fechas1.split('-');

    let fechas2 = action.value.fechaFinal;
    let fech2 = fechas2.split('-');
    
      if (fechas[0] != fech2[0]) {
       alert('La consulta tiene que tener los mismos años');
       this.mostrarBtn = false;
        
      } else if (fechas[0] >= this.year) {
        this.mostrarBtn = false;
         
        alert('El año de consulta tiene que ser menor al ' + this.year);
        
      }else{
       

        this.fechas = action.value;
        
        this.fechas.filter= fechas[0];
        this.plantillas =  fechas[0];

        this.loading = true;
        this.getContolHoras();
        this.getJustificaciones();
        this._empleados.consultaProgramacionAdminAnterior(this.fechas)
        .subscribe(data=>{ 
        
          if (data == 'error') {
            this.mostrarBtn = false;
            this.loadingHoras = false;
            this.datas=false;
            this.loading=false;
            this._alerta.openToast1('NO HAY DATOS PARA MOSTRAR...' , 'bg-danger tex-white' , 'ERROR')
          }else{
            this.data = data;
          setTimeout(()=>{
            this.loading = false;
            this.datas=false;
            this.loadingHoras = false;
            this.mostrarBtn = false;
          },3000)
        }
        });
      } 
    
  }
data:any;
  comentF?:string;
  nombre?:string;
  apellidos?:string;
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
        this._empleados.consultaProgramacionAdmin(this.fechas)
        .subscribe(res=>{
          this.dataSource = res;
          this.datas = true;
        
       })
      }
   });
  }


  


  reload(){
   this.datas = false;
   this.turnos = '';
  }


  
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


  
  puesto?:string;
  name?:string;
  lastName?:string;
  puestos:any;
  idPla?:number
  func2(idPalntilla:any,puesto:any , nombre:any, apellido:any,horario:any){
    let turno = horario.toLowerCase() 
    if (!turno) {
    
      if (turno ) {
      alert('No puede editar el puesto. Lo agregará cuando lo valide...');
    }else{ 

      this.puesto = puesto;
      this.idPla = idPalntilla;
      this.name = nombre;
      this.lastName = apellido
  // modal
  this.modalM =  this.modalService.open(HorasModalComponent, {
    containerClass: 'right',
    modalClass: 'modal-side modal-top-right',
    ignoreBackdropClick: true,
    data: {
     param:6,
     idPlantillaF:this.idPla,
     idServicio:this.idServicio,
     usuario:this.usuario,
     name:this.name,
     lastName:this.lastName,
     puestos: this.puestos
  
    },
  });
  this.modalM.onClose.subscribe((message: any) => {
   
    if(message == 'closeMessage' ||  message == 'success'){
      this._empleados.consultaProgramacionAdmin(this.fechas)
      .subscribe(res=>{
        this.dataSource = res;
        this.datas = true;
      
     })
    }
 });
    }
    }else{
      this.puesto = puesto;
      this.idPla = idPalntilla;
      this.name = nombre;
      this.lastName = apellido
    
  // modal
  this.modalM =  this.modalService.open(HorasModalComponent, {
    containerClass: 'right',
    modalClass: 'modal-side modal-top-right',
    ignoreBackdropClick: true,
    data: {
     param:6,
     idPlantillaF:this.idPla,
     idServicio:this.idServicio,
     usuario:this.usuario,
     name:this.name,
     lastName:this.lastName,
     puestos: this.puestos
  
    },
  });
  this.modalM.onClose.subscribe((message: any) => {
    
    if(message == 'closeMessage' ||  message == 'success'){
      this._empleados.consultaProgramacionAdmin(this.fechas)
      .subscribe(res=>{
        this.dataSource = res;
        this.datas = true;
      
     })
    }
 });
    
    }
      
  }


  
  valor:number=0;
  justiF?:number;
  emplJus?:boolean;
  idPlantillaF?:number;
  fechaTrabajo:any;
  nEmpledo:any;
  horasNormales:number=0;
  horasAusentes:any;
  modalB:any;
  justi(justificante:any,idPlantilla:any ,empleado:any){
   
    this.justiF = justificante.target.value;
    this.horasNormales = empleado.normal;
    this.fechaTrabajo = empleado.fechaTrabajo;
    this.nEmpledo = empleado.nEmpleado;

    this.empleado = empleado;
    this.emplJus = true;

   this.idPlantillaF = idPlantilla;
   
   if (this.justiF == 100) {
     this.valor =  this.horasNormales;
     this.horasAusentes = this.valor;
     this.siValidarJust(this.horasAusentes , 0);
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
          this._empleados.consultaProgramacionAdmin(this.fechas)
          .subscribe(res=>{
            this.dataSource = res;
            this.datas = true;
          
         })
        }
     });
    }
    
  }

  siValidarJust(horasAusentes:any , horasNormales:any){
    this._control.editarJustificanteAdmin(this.justiF, this.idPlantillaF,this.fechaTrabajo, this.nEmpledo , horasAusentes , horasNormales,this.idServicio)
       .subscribe(res=>{ 
  
         if (res == 'success') {
           
           this._empleados.consultaProgramacionAdmin(this.fechas)
           .subscribe(res=>{
             this.dataSource = res;
             this._alerta.openToast1('Justificación asignada...' , 'bg-success text-white' , 'OK');
           
          })
         }else{
          this._empleados.consultaProgramacionAdmin(this.fechas)
          .subscribe(res=>{
            this.dataSource = res;
            this._alerta.openToast1('Justificación no  asignada...' , 'bg-danger text-white' , 'ERROR');
          
         })

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



  datosVN:any;
  hNormal(nNormal:any,idPlantilla:any,i:any,horario:any){
    // console.log(this.inicio);
    

    let turno = horario.toLowerCase();
    this.datosVN = nNormal.value;
    if (this.datosVN == undefined) {
      this.datosVN = null;
    }else if (this.datosVN == "") {
     this.datosVN = null;
   }
    
    this._control.editarHNormalesAnterior(this.datosVN, idPlantilla, this.fechas.filter)
    .subscribe(res=>{ 

       
      if (res == 'success') {
        this._alerta.openToast1('Hora normal editada...' , 'bg-success text-white' , 'OK');
        this.horasMostrar = false;
          this.indice = -1;

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
     
     this._control.editarHAusentesAnteriores(this.datosVNP, idPlantilla,this.fechas.filter)
     .subscribe(res=>{ 
 
        
       if (res == 'success') {
        this._alerta.openToast1('Hora ausente editada...' , 'bg-success text-white' , 'OK');
         // this.habilitarE1=false;
         this.horasMostrar = false;
        this.indice = -1;

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
     this._control.editplantillasColumnAnterior(fechaTrabajo , nEmpleado , this.datosV , columna,idPlantilla,this.fechas.filter, this.idServicio)
     .subscribe(res=>{ 
      
       if (res == 'success') {
        this._alerta.openToast1('Campo editado...' , 'bg-success text-white' ,  'OK');
        this.horasMostrar = false;
        this.indice = -1;

      }
     });
 
   
   }
 
   

  
  show: boolean = false;


  empleado?:Empleado;
  em?:boolean;
  puest?:any[];
  idPlantilla?:number;
  validar(item:any ,frame:any){
    this.idPlantilla = item.idPlantilla;
    let turno = item.horario.toLowerCase()

if (turno == 'p') {
  this.empleado = item;
    this.em = true
      // frame.show();
}
   else if (turno) {
      // datros.show();

  this._empleados.getPuestos(this.idServicio)
  .subscribe(puest=>{ 
  this.puest = puest;
      
  });
      
    } else {
      
    this.empleado = item;
    this.em = true
      // frame.show();
      
      
    }
    
  }

  
  siValidar(empleado:any ,frame:any){

   
 
    this._control.validarEmpleado(empleado.fechaTrabajo,empleado.nEmpleado, empleado.idPlantilla)
    .subscribe(res=>{ 
        if (res == 'success') {  
          frame.hide();
          this._alerta.openToast1('Empleado validado correctamente...' , 'bg-success text-white' , 'OK');
         
        } else {
          alert ('Error al validar!');
        }
        });

}


siValidar1(empleado:any, frame1:any){
  this._control.validarEmpleadoAdd(empleado.value)
  .subscribe(res=>{ 
    if (res == 'success') {
        // this.getContolEmpleados();    
        frame1.hide();
        this._alerta.openToast1('Empleado validado correctamente...' , 'bg-success text-white' , 'OK');
      
      } else {
        alert ('Error al validar!');
      }
      });
  
}


horario?:string;
horarios?:string;
fechaTra:any;
nEmpleado?:number;
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
      this._empleados.consultaProgramacionAdmin(this.fechas)
      .subscribe(res=>{
        this.dataSource = res;
        this.datas = true;
      
     })
    }
 });

}


// Con justificación

changeTurno1(item:any  ){
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
     param:4,
     name:this.name,
     horario:this.horario,
     lastName:this.lastName,
  
    },
  });



}



dataExcel:any;
exportAsXLSX():void {
  this._alerta.openToast1('Generando excel. Espere por favor...' , 'bg-success text-white' , 'OK');
  this._empleados.consultaProgramacionAdminExcelConsultas(this.fechas)
  .subscribe(data=>{ 
   this.excelService.exportAsExcelFile(data, 'Plantilla_' + this.plantillas );
});

}


horasMostrar:boolean=false;
indice:number=-1;
editarHoras(is:any){
  this.horasMostrar = true;
  this.indice = is;
  
}




dataJ:any;
dataJNoche:any;
dataJFecha:any;
filterQuery="";
 fechas:any;

 turModal:any;
idPlant?:number;
turnoOriginal?:number;
listTurno:any;
changeTurnoDia(idPlantilla:any, descripcionPuesto:any,nombre:any,apellidos:any, turno:any,tu:any ){
 
this.idPlant = idPlantilla;
this.name = nombre;
this.lastName = apellidos;
this.turnoOriginal = tu;

this.modalM =  this.modalService.open(HorasModalComponent, {
  containerClass: 'right',
  modalClass: 'modal-side modal-top-right',
  ignoreBackdropClick: true,
  data: {
   param:7,
   name:this.name,
   lastName:this.lastName,
   fechaTra:this.fechaTra,
   usuario:this.usuario,
   idServicio:this.idServicio,
   idPlantillaF:this.idPlant,
   turnoOriginal:this.turnoOriginal

  },
});
this.modalM.onClose.subscribe((message: any) => {
  console.log(message);
  
  if(message == 'closeMessage' ||  message == 'success'){
    this._empleados.consultaProgramacionAdmin(this.fechas)
    .subscribe(res=>{
      this.dataSource = res;
      this.datas = true;
    
   })
  }
});
 
}




}
