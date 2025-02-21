import { supportsScrollBehavior } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { EncargadosModalComponent } from 'src/app/Modales/encargados-modal/encargados-modal.component';
import { HorasModalComponent } from 'src/app/Modales/horas-modal/horas-modal.component';
import { Empleado } from 'src/app/Models/emplados';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';

@Component({
  selector: 'app-horas-e',
  templateUrl: './horas-e.component.html',
  styleUrls: ['./horas-e.component.css']
})
export class HorasEComponent implements OnInit {

  tipoUsuario:any;
  optionsSelect: Array<any>;

  constructor(
    private  _control :ControlHorasService,
    private  _alerta :NotificacionService,
    private _emple :EmpleadosService,
    private ruta :Router,
    private modalService: MdbModalService,

    
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



  usuario:any;
  idServicio:any;
  ngOnInit() {
    let ser:any = localStorage.getItem(btoa('servicio'));
    let rol:any = localStorage.getItem('rol');
    let user:any = localStorage.getItem('usuario');
   
    this.idServicio = atob(ser);
    this.tipoUsuario = atob(rol);
    this.usuario = atob(user);
  
    this.getContolHoras(); // trae los nombres de las columnas
    // this.getJustificaciones(); // trae las justidficaciones
    this.getContolEmpleados(); // trae los horarios de los empleados
    // this.getEmpleadosActivos(); // trae los empleados activos
}


addEmployee(show:boolean){
  this.show = !show;
  if (this.show) {
    this.getEmpleadosActivos();
  }
}


  habilitarE?:boolean;
  habilitarE1?:boolean;
  habilitarE11?:boolean;
  habilitarEdit(){

    this.modalM =  this.modalService.open(EncargadosModalComponent, {
      containerClass: 'right',
      modalClass: 'modal-side modal-top-right',
      ignoreBackdropClick: true,
      data: {
       param:2,
       habilitarE:this.habilitarE,
       habilitarE1:this.habilitarE1,
       habilitarE11:this.habilitarE11,
      
   
      },
    });
    this.modalM.onClose.subscribe((message: any) => {

      if(message){
        
        if (message == 'habilitarE1T') {
          this.habilitarE1 = true;
        }else if(message == 'habilitarE1F'){
          this.habilitarE1 = false;
        } else if (message == 'habilitarET') {
          this.habilitarE = true;
        }else if(message == 'habilitarEF'){
          this.habilitarE = false;
        }else if (message == 'habilitarE11F') {
          this.habilitarE11 = false;
        }else if(message == 'habilitarE11T'){
          this.habilitarE11 = true;
          this.getJustificaciones();
        }
      }
    });
  
  }

  siEditar(editarH:any){
    editarH.hide()
    if (this.habilitarE) {
      this.habilitarE = false
    } else {
      
      this.habilitarE = true;
    }
  }

  
  siEditar1(editarH:any){
    editarH.hide()
    if (this.habilitarE1) {
      this.habilitarE1 = false
    } else {
      
      this.habilitarE1 = true;
    }
  }

  siEditar11(editarH:any){
    editarH.hide()
    if (this.habilitarE11) {
      this.habilitarE11 = false
    } else {
      
      this.habilitarE11 = true;
    }
  }

  justifi:any;
  getJustificaciones(){
  this._control.getJustificaciones(this.idServicio)
  .subscribe(justifi=>{ 
    console.log(justifi);
    
  this.justifi = justifi;
  });
  }


  datas:any
  getEmpleadosActivos(){
    this._emple.getEmplaedosActivos(this.idServicio)
    .subscribe(resp=>{
      console.log(resp);
      
      if (resp != 'error') {
        this.datas = resp;
        // this.dataTotal = this.data.length;
      } else {
        alert('Error en el servidor:::')
      }
      
    })
   }
 
  horas:any;
  columnasHora:any=[];
  // horas disponibles
  hora1?:boolean
  hora2?:boolean
  hora3?:boolean
  hora4?:boolean
  hora5?:boolean
  hora6?:boolean
  hora7?:boolean
  hora8?:boolean
  hora9?:boolean

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


refresh(){
  location.reload();
}
  




encargado:any;
fecha:any;
data:any;
hora:any;
dataHorios:any;
tur?:string;
mostrarData?:boolean;
sinData?:boolean;
loading:boolean = true;
  getContolEmpleados(){
    this.mostrarData = true;
    this._control.getControlEmpleadosTN(this.idServicio)
    .subscribe(data=>{
      this.data = data;
      //Si el encargado ya está almacenado en localStorage
      this.encargado = localStorage.getItem('encargado');
      
    if (this.encargado) {
      if (this.data[0].turno_id >= 1 && this.data[0].turno_id <= 5 ) {
        if (this.encargado && this.encargado !== this.data[0].turno_id.toString()) {
          // Si los jefes son diferentes, significa que el jefe ha cambiado
          // Puedes realizar el proceso de cambiar el jefe aquí
          localStorage.setItem('encargado', this.data[0].turno_id.toString());  // Actualizar localStorage
          this.getEncargados(this.data[0].turno_id);  // Llamar la función para obtener el nuevo jefe
        }else{
          this.getEncargados(this.encargado);
        }
      }else{
        this.getEncargados(this.encargado);
      }
    } else {
      // Si no está, lo asignamos con el valor predeterminado y lo guardamos en localStorage
      const encargado = this.data.find((item:any) => item.turno_id >= 1 && item.turno_id <= 5);
      localStorage.setItem('encargado', encargado.turno_id);
      // Después de guardar el valor, obtenemos el encargado
      this.encargado = localStorage.getItem('encargado');
      this.getEncargados(this.encargado);
    }
    if(this.data == 'empty'){
      this.sinData=true;
    }else{
      this.sinData=false;
      setTimeout(()=>{
        this.loading = false;
      },1500)
    }
    
   })
}

nameEncargado:any;
// Función para obtener los encargados
getEncargados(encargado: string) {
  this._control.getEncargados(encargado, this.idServicio)
    .subscribe(encargado => {
      this.nameEncargado = encargado; // Asignamos el nombre del encargado a la variable
    });
}

puesto?:string;
name?:string;
lastName?:string;
puestos:any;
idPla?:number;
modalM:any;
func2(idPalntilla:any,fp:any,puesto:any , nombre:any, apellido:any,horario:any){
      let turno = horario.toLowerCase() 
      if (turno != 'p') {
      
        if (turno != this.tur ) {
        alert('No puede editar el puesto. Lo agregará cuando lo valide...');
      }else{ 

        this.puesto = puesto;
        this.idPla = idPalntilla;
        this.name = nombre;
        this.lastName = apellido
        this._emple.getPuestos(this.idServicio)
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
                this.getContolEmpleados();  
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
            this.getContolEmpleados();
          }
      });
      
      }
        
    }


    puesto_id?:number;
    pu(event:any){
       this.puesto_id = event;
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
      
      this._control.editarHNormales(this.datosVN, idPlantilla,'NO')
      .subscribe(res=>{ 
  
         
        if (res == 'success') {
          this._alerta.openToast1('Hora normal editada...' , 'bg-success text-white', 'OK');
           this.habilitarE1=false;
           this.addEmpleadoNuevo = false;
        }
  
      });
       
     }

     
  modalB:any;
  salir(){
    this.getContolEmpleados();
   this.modalB.hide();
   this.valor = 0;
   this.selectedValue = '';
  }

  selectedValue? :string;
  valor:number=0;
  getSelectedValue(event:any){
    this.valor = event;
  }

  siCambiar(justif:any){
    if (this.valor > 0 ) {
      this.horasAusentes = this.valor;
      if (this.horasAusentes > this.horasNormales) {
        alert('Error de horas ausentes.')
      }else{
        justif.show();
        this.selectedValue = '';
        this.modalB.hide();
      }
      }else{
        this.getContolEmpleados();
        
      }
  }

    justiF?:number;
    emplJus?:boolean;
    idPlantillaF?:number;
    fechaTrabajo:any;
    nEmpledo:any;
    horasNormales:number=0;
    horasAusentes:any;
    justi(justificante:any,idPlantilla:any , justif:any,empleado:any,basicModal:any){
     
      this.modalB = basicModal;
      this.justiF = justificante.target.value;
      this.horasNormales = empleado.normal;
      this.fechaTrabajo = empleado.fechaTrabajo;
      this.nEmpledo = empleado.nEmpleado;
  
      // this.empleado = empleado;
      this.emplJus = true;
  
     this.idPlantillaF = idPlantilla;
     
     if (this.justiF == 100) {
       this.valor =  this.horasNormales;
       this.horasAusentes = this.valor;
      //  this.siValidarJust(this.horasAusentes , justif);
      justif.show();
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
         
          if(message == 'closeMessage' ||  message == 'success'){
            this.getContolEmpleados();
          }
       });
      }
    }



    siValidarJust(horasAusentes:any, justif:any){
   this._control.editarJustificante(this.justiF, this.idPlantillaF,this.fechaTrabajo, this.nEmpledo, this.horasAusentes , this.horasNormales,this.idServicio)
      .subscribe(res=>{ 

         
        if (res == 'success') {
          this._alerta.openToast1('Justificación asignada...' , 'bg-success text-white', 'OK');
          this.habilitarE11=false;
          this.getContolEmpleados();
          justif.hide()
        }

      });

    }

    no(justiF:any){
      justiF.hide();
      this.habilitarE11 = false;
    }


    visua:any;
    visuValidados(visuValidado:any){
      this.fecha = localStorage.getItem('fecha');
      this._control.getControlEmpleadosValidados(this.idServicio)
      .subscribe(visua=>{  
        this.visua = visua;
        if (this.visua) {
             this.modalM =  this.modalService.open(EncargadosModalComponent, {
              containerClass: '',
              modalClass: 'modal-fullscreen',
              ignoreBackdropClick: true,
              data: {
               param:4,
               idServicio:this.idServicio,
               visua:this.visua,
               fecha:this.fecha
              },
            });
            this.modalM.onClose.subscribe((message: any) => {
             
              if(message == 'closeMessage' ||  message == 'success'){
               this.getContolEmpleados();
              }
            });
          
        }else{
        alert('FALTA LA FECHA EN EL LOCALSTORAGE')

        }
      });
    }
    

    empleadoList:any;
    visuErrores(){
     
        this._emple.getEmplaedosActivos(this.idServicio)
        .subscribe(resp=>{
  
          if (resp != 'error') {
            this.empleadoList = resp;            
            this.modalM =  this.modalService.open(EncargadosModalComponent, {
              containerClass: '',
              modalClass: 'modal-dialog-centered modal-lg',
              ignoreBackdropClick: true,
              data: {
               param:3,
               idServicio:this.idServicio,
               empleadoList:this.empleadoList,
               fecha:this.fecha
              },
            });
            this.modalM.onClose.subscribe((message: any) => {
             
              if(message == 'closeMessage' ||  message == 'success'){
               this.getContolEmpleados();
              }
            });
            
          } else {
            alert('Error en el servidor:::')
          }
          
        })
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
         this._control.editplantillasColumn(fechaTrabajo , nEmpleado , this.datosV , columna,idPlantilla,'NO' , this.idServicio)
         .subscribe(res=>{ 
           if (res == 'success') {
             this._alerta.openToast1('Campo editado...' , 'bg-success text-white' , 'OK');
             this.habilitarE=false;
           this.addEmpleadoNuevo = false;

           }
         });
     
       
       }
     

  show: boolean = false;
  empleado!:Empleado;
  em?:boolean;
  puest:any=[];
  idPlantilla?:number;

  validar(item:any ,frame:any,datros:any){
 
    this.idPlantilla = item.idPlantilla;
    let turno = item.horario.toLowerCase();
    this.tur=item.horario.toLowerCase();

if (turno == 'p') {
  this.empleado = item;
    this.em = true
      this.modalM =  this.modalService.open(EncargadosModalComponent, {
      containerClass: 'right',
      modalClass: 'modal-side modal-top-right',
      ignoreBackdropClick: true,
      data: {
       param:5,
       empleado:this.empleado,
       idPlantilla:this.idPlantilla
       
      
   
      },
    });
    this.modalM.onClose.subscribe((message: any) => {
      if(message){
       this.getContolEmpleados();
      }
    });
}else if (turno != this.tur) {
      // datros.show(); agregar puestos

      this.modalM =  this.modalService.open(HorasModalComponent, {
        containerClass: 'right',
        modalClass: 'modal-side modal-top-right',
        ignoreBackdropClick: true,
        data: {
         param:6,
         idPlantillaF:this.idPlantilla,
         idServicio:this.idServicio,
         usuario:this.usuario,
         name:item.nombre,
         lastName:item.apellidos,
         puestos: item.puestos
      
        },
      });
      this.modalM.onClose.subscribe((message: any) => {
       
        if(message == 'closeMessage' ||  message == 'success'){
           
           setTimeout(() => {
            this.modalM =  this.modalService.open(EncargadosModalComponent, {
              containerClass: 'right',
              modalClass: 'modal-side modal-top-right',
              ignoreBackdropClick: true,
              data: {
               param:5,
               empleado:item,
              },
            });
            this.modalM.onClose.subscribe((message: any) => {
              if(message){
               this.getContolEmpleados();
              }
            });
            
           }, 1000);
        }
     });
      
    } else {
      
    this.empleado = item;
    this.em = true
         this.modalM =  this.modalService.open(EncargadosModalComponent, {
      containerClass: 'right',
      modalClass: 'modal-side modal-top-right',
      ignoreBackdropClick: true,
      data: {
        param:5,
       empleado:this.empleado,
       idPlantilla:this.idPlantilla
      
   
      },
    });
    this.modalM.onClose.subscribe((message: any) => {

      if(message){
        
        this.getContolEmpleados();
      }
    });
      
      
    }
    
  }


  siValidar1(empleado:any, frame1:any){
    this._control.validarEmpleadoAdd(empleado.value)
    .subscribe(res=>{ 
      if (res == 'success') {
          this.getContolEmpleados();    
          frame1.hide();
          this._alerta.openToast1('Empleado validado correctamente...' , 'bg-success text-white', 'OK');
          this.habilitarE11=false;
          this.habilitarE = false;
          this.habilitarE1=false;
        } else {
          alert ('Error al validar!');
        }
        });
    
  }

  nEmpleado:any;
  dataEm?:string;
  descripcionPuesto?:string
  onChange(deviceValue:any ) {
    console.log(deviceValue.target.value);
    
    this.nEmpleado =deviceValue.target.value;
    

    for (let i = 0; i < this.data.length; i++) {
      const element = this.data[i].nEmpleado;
      if (element ==deviceValue.target.value ) {
        alert('El empleado seleccionado ya está en la lista...');
        this.nEmpleado=null;
        this.show=false;
      }
      
    }  
}


puestoId?:number;
puestosAdd(value:any){
this.puestoId = value;
    
}

empl:any=[];
addEmpleadoNuevo?:boolean;
addEmpl(parametro:any){
  
 this._control.getEmpleadoPlantilla(parametro.value)
 .subscribe(empl=>{ 
   
   //  debugger 
   this.empl = empl;
   if (this.empl[0].validado == 1 && this.empl[0].justificacion == null) {
     return  this._alerta.openToast1('El empleado ya fue validado, y no lo podrá agregar otra vez...' , 'bg-danger text-white' , 'ERROR')

   }else if(this.empl[0].justificacion || this.empl[0].horario == 'V'){

    //  if(this.empl[0].horario == 'V'){
    //   let a = confirm('El trabajador tiene una justificación, ¿Estás seguro que quieres agregarlo?');
    //  }
     let a = confirm('El trabajador tiene una justificación, ¿Estás seguro que quieres agregarlo?');

     if (a) {
       let turno = this.empl[0].horario.toLowerCase();
       if ( turno != this.tur) {
         
         this.addEmpleadoNuevo = true;
       }
      
  
       if (this.data != null) {
         this.data.unshift(...this.empl);
       } else if(this.data != undefined) {
        this.data.unshift(...this.empl);
         
      }else{
        this.data = [];
        this.sinData = false;
        this.data=this.empl;
        this._alerta.openToast1('Empleado agregado correctamente...' , 'bg-success text-white' , 'OK');
      }
      
      
    } else {
      this._alerta.openToast1('Se rechazó, agregar al Empleado ...' , 'bg-danger text-white' , 'ERROR');
      this.show = false;
    }
    this.show = false;

     
   }else{
     let turno = this.empl[0].horario.toLowerCase();
     if ( turno != this.tur) {
       if(this.empl[0].hora1 > 0 || this.empl[0].hora2 > 0 || this.empl[0].hora3 > 0 || this.empl[0].hora4 > 0 || this.empl[0].hora5 > 0 || this.empl[0].hora6 > 0){
        this.addEmpleadoNuevo = false;

       }else{

         this.addEmpleadoNuevo = true;
       }
     }
    

     if (this.data != null) {
      this.data.unshift(...this.empl);
    } else if(this.data != undefined) {
     this.data.unshift(...this.empl);
      
   }else{
    this.data = [];
     this.sinData = false;
     this.data=this.empl;
     this._alerta.openToast1('Empleado agregado correctamente...', 'bg-success text-white' , 'OK');
    }
    this.show = false;

   }

});
console.log(this.data);

}


camPuesto(changePuesto:any,fp:any){

  this._control.cambioPuest(changePuesto.value)
  .subscribe(data=>{ 
    if (data == 'success') {

      this.getContolEmpleados();
      this._alerta.openToast1('Cambio de puesto correcto...', 'bg-success text-white' , 'OK');
      fp.hide()
    } else {
      
    }  
});
  // console.log(changePuesto.value);
  
}


turModal:any;
idPlant?:number;
turnoOriginal?:number;
listTurno:any;
changeTurno(idPlantilla:any, descripcionPuesto:any,nombre:any,apellidos:any, turno:any ,turChange:any){
  this.turModal = turChange;
this.idPlant = idPlantilla;
this.name = nombre;
this.lastName = apellidos;
this.turnoOriginal = turno;

this.modalM =  this.modalService.open(HorasModalComponent, {
  containerClass: 'right',
  modalClass: 'modal-side modal-top-right',
  ignoreBackdropClick: true,
  data: {
   param:7,
   name:this.name,
   lastName:this.lastName,
   usuario:this.usuario,
   idServicio:this.idServicio,
   idPlantillaF:this.idPlant,
   turnoOriginal:this.turnoOriginal

  },
});
this.modalM.onClose.subscribe((message: any) => {
 
  if(message == 'closeMessage' ||  message == 'success'){
   this.getContolEmpleados();
  }
});
}

turno_id?:number;
tu(event:any){
   this.turno_id = event.target.value;
  //  console.log(this.turno_id);
   
}

camTurno(changePuesto:any,fp:any){
// console.log(changePuesto.value);

  this._control.cambioTurno(changePuesto.value)
  .subscribe(data=>{ 
    if (data == 'success') {
      this.getContolEmpleados();
      this._alerta.openToast1('Cambio de turno correcto...', 'bg-success text-white' , 'OK')
      fp.hide()
    } else {
      
    }  
});
  // console.log(changePuesto.value);
  
}


comentEmp?:string;
apellidos?:string;
nombre?:string;
verCom( item:any , modal:any){
  this.comentEmp = item.comentarios;
  this.apellidos = item.apellidos;
  this.nombre = item.nombre;
  this.modalM =  this.modalService.open(EncargadosModalComponent, {
    containerClass: 'right',
    modalClass: 'modal-side modal-top-right',
    ignoreBackdropClick: true,
    data: {
     param:1,
     nombre:this.nombre,
     apellidos:this.apellidos,
     usuario:this.usuario,
     comentEmp:this.comentEmp,
 
    },
  });
  this.modalM.onClose.subscribe((message: any) => {
   
    if(message == 'closeMessage' ||  message == 'success'){
    //  this.getContolEmpleados();
    }
  });
}


changeEncargados(){
  

  let promp:any = prompt('Agregar turno (Solo números)');

 if (promp > 0 && promp < 6) {
   localStorage.setItem('turnoEncargadosTarde' , promp);
   location.reload();
 }else{
  alert('Solo acepta números del 1 al 5');
 }

}

}
