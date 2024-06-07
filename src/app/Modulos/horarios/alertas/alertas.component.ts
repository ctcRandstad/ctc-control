import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdbAccordionItemComponent } from 'mdb-angular-ui-kit/accordion';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbTableDirective } from 'mdb-angular-ui-kit/table';
import { AlertaModalComponent } from 'src/app/Modales/alertas-modal/alerta-modal.component';
import { HorasModalComponent } from 'src/app/Modales/horas-modal/horas-modal.component';
import { Empleado } from 'src/app/Models/emplados';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { LoginService } from 'src/app/Services/login.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  @ViewChild('table') table!: MdbTableDirective<any>;
  @ViewChild('table2') table2!: MdbTableDirective<any>;
  @ViewChild('table3') table3!: MdbTableDirective<any>;
  optionsSelect: Array<any>;

  constructor( 
    private ruta:Router,
    private _login : LoginService,
    private _alertas:NotificacionService,
    private _control:ControlHorasService,
    private _emple :EmpleadosService,
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

    search(event: Event): void {
      const searchTerm = (event.target as HTMLInputElement).value;
      this.table.search(searchTerm);
    }
  
    search1(event: Event): void {
      const searchTerm = (event.target as HTMLInputElement).value;
      this.table2.search(searchTerm);
    }
  

    usuario:any;
    idServicio:any;
    ngOnInit() {
      let ser:any = localStorage.getItem(btoa('servicio'));
      let rol:any = localStorage.getItem('usuario')
      this.usuario = atob(rol);
      
      this.idServicio = atob(ser);
    if (this.usuario != 'admin') {
      this.ruta.navigate(['principal/control-horas']);
    }
    this.getAlertas1();
    this.getAlertas3();
    this.getAlertas2();
    this.getAlertas4();
    this.getAlertas5();
    this.getAlertas6();
    this.getJustificaciones();
this.getCredit();
 this.getHoras();
  }

  justifi:any;
  getJustificaciones(){
  this._control.getJustificaciones(this.idServicio)
  .subscribe(justifi=>{ 
  this.justifi = justifi;
  });
  }



horas:any;
columnasHora?:any[];
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
  getHoras(){
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
  filterQuery="";
  data:any;
  data1:any;
  data2:any;
  data3:any;
  data4:any;
  data5:any;
  aler:any;
  alerta1?:boolean;
  alerta2?:boolean;
  alerta3?:boolean;
  alerta4?:boolean;
  alerta5?:boolean;
  alerta6?:boolean;
  getAlertas1(){
    this._login.getAlertas1(this.idServicio)
    .subscribe(data=>{   
      
      this.data = data;
      this.aler = this.data.length;
       
    });
  }

  da2:any;
  aler2:any;
  getAlertas2(){
    this._login.getAlertas2(this.idServicio)
    .subscribe(data=>{ 
      this.data1 = data;      
      this.aler2= this.data1.length; 
       
    });
  }

  da3:any;
  aler3:any;
  getAlertas3(){
    this._login.getAlertas3(this.idServicio)
    .subscribe(data=>{   
      this.data2 = data;
      this.aler3= this.data2.length; 
       
    });
  }

  da4:any;
  aler4:any;
  getAlertas4(){
    this._login.getAlertas4(this.idServicio)
    .subscribe(data=>{ 
      
      this.da4 = data;
      this.aler4 = this.da4.length;
       
    });
  }


  aler5:any;
  getAlertas5(){
    this._login.getAlertas5(this.idServicio)
    .subscribe(data=>{  
     
      this.data4 = data;
      this.aler5 = this.data4.length;
       
    });
    this.getTitulos1();
  }

  aler6:any;
  loadingTabla6:boolean=true;
  getAlertas6(){
    this.loadingTabla6 = true;
    this._login.getAlertas6(this.idServicio)
    .subscribe(data=>{  
      if (data == 'error') {
        this.data5 = [];
        this.aler6=0;
      } else {
        this.data5 = data;
        this.aler6 = this.data5.length;
        setTimeout(()=>{
          this.loadingTabla6 = false;
          },2500);
        
      }
       
    });
  }


  nombreEvento?:string;
  idEvento?:number;
  estado?:number;
  datacHorario:any;
  fecha_inicio:any;
  fecha_fin:any;
  chorario:any;
  telefono:any;
  modalM:any;
  cHorario(item:any,chorario:any){
    this.nombreEvento=item.evento;
    this.nEmpleado = item.nEmpleado;
    this.fecha_inicio = item.fecha_inicio;
    this.fecha_fin = item.fecha_fin;
    this.chorario = chorario;
    this.idEvento=item.id;
    this.estado=item.estado;
    this.telefono=item.telefono;

    this.modalM =  this.modalService.open(AlertaModalComponent, {
      containerClass: 'top',
      modalClass: 'modal-side modal-fullscreen',
      ignoreBackdropClick: true,
      data: {
       param:1,
       nEmpleado:this.nEmpleado,
       idServicio:this.idServicio,
       fecha_fin:this.fecha_fin,
       fecha_inicio:this.fecha_inicio,
       estado:this.estado,
       idEvento:this.idEvento,
       telefono:this.telefono,
       name:item.nombre,
       lastName:item.apellidos,
      },
    });
    this.modalM.onClose.subscribe((message: any) => {
     
      
      if(message == 'ok' ||  message == 'success'){
        this.getAlertas6();
      }
    });

    
  }

  cre:any;
  getCredit(){
    this._login.getCreditos()
    .subscribe(data=>{ 
      this.cre = data;
    });
  }
  validarSolicitud(idEvento:any,estado:any,chorario:any){
    let confirmar = confirm("¿Desea validar la solicitud?");

    if (confirmar) {
      this._login.getCreditos()
      .subscribe(data=>{ 

          if(data  == 0){
            let credito = confirm("No tiene crédito. ¿Desea validar la solicitud sin enviar SMS?");
            if(credito){
              this.enviarSmsValidar(this.nEmpleado,this.telefono,idEvento,estado,'vacio',data,chorario);
            }
          }else{
         let   mensaje =   prompt("Texto descriptivo","Texto por defecto");
            if (mensaje !="") {
              if (mensaje != null) {
                this.enviarSmsValidar(this.nEmpleado,this.telefono,idEvento,estado,mensaje,data,chorario); 
              }
            } else{
              alert('El mensaje no puede estar vacío.')
            }     
          }
      }); 
    }
   
    // chorario.hide();
  }

  enviarSmsValidar(nEmpleado:any,telefono:any,id:any,estado:any,mensaje:any,credito:any,chorario:any){
    this._login.enviarSmsValidar(nEmpleado,telefono,id,estado,mensaje,credito)
    .subscribe(data=>{ 
    if (data == 'success') {
      this._alertas.openToast1('SMS enviado correctamente', 'bg-success text-white' , 'OK');
    this.getAlertas6();
    chorario.hide();
    }else if(data =='ok'){
      this._alertas.openToast1('SMS no puedo ser  enviado,por falta de crédito, o porque no tiene el consentimiento para el envío de SMS ', 'bg-danger text-white' , 'ERROR');
    this.getAlertas6();
    chorario.hide();
    }else{
      this._alertas.openToast1('Se ha producido un error.', 'bg-danger text-white' , 'ERROR');

    }
    });
  }

  denegar(item:any){
  
    let confirmar = confirm("¿Desea denegar la solicitud?");

    if (confirmar) {
      this._login.getCreditos()
      .subscribe(data=>{ 
          if(data  == 0){
            let credito = confirm("No tiene crédito. ¿Desea denegar la solicitud sin enviar SMS?");
            if(credito){
              this.enviarSms(item.nEmpleado,item.telefono,item.id,item.estado,'vacio',data);
            }
          }else{
         let   mensaje =   prompt("Texto descriptivo","Texto por defecto");
            if (mensaje !="") {
              if (mensaje != null) {
                this.enviarSms(item.nEmpleado,item.telefono,item.id,item.estado,mensaje,data); 
              }
            } else{
              alert('El mensaje no puede estar vacío.')
            }     
          }
      }); 
    }
    
  }

  enviarSms(nEmpleado:any,telefono:any,id:any,estado:any,mensaje:any,credito:any){
    this._login.enviarSms(nEmpleado,telefono,id,estado,mensaje,credito)
    .subscribe(data=>{ 
    console.log(data);
    if (data == 'success') {
      this._alertas.openToast1('SMS enviado correctamente', 'bg-success text-white' , 'OK');
    this.getAlertas6();
    }else if(data =='ok'){
      this._alertas.openToast1('SMS no puedo ser  enviado,por falta de crédito, o porque no tiene el consentimiento para el envío de SMS ', 'bg-danger text-white' , 'ERROR');
    this.getAlertas6();
    }else{
      this._alertas.openToast1('Se ha producido un error.', 'bg-danger text-white' , 'ERROR');
    }
    });
  }



  numero?:number;
  validarTodo(numero:any){
 this.numero = numero;
 this.modalM =  this.modalService.open(HorasModalComponent, {
  containerClass: 'left',
  modalClass: 'modal-side modal-bottom-left',
  ignoreBackdropClick: true,
  data: {
   param:11,
   name:this.name,
   lastName:this.lastName,
   fechaTra:this.fechaTra,
   usuario:this.usuario,
   idServicio:this.idServicio,
   idPlantillaF:this.idPlant,
   numero:this.numero

  },
});
this.modalM.onClose.subscribe((message: any) => {
 
  
  if(message == 'closeMessage' ||  message == 'success'){
    if (this.numero == 1) {
      this.getAlertas1();
      
    }else if(this.numero == 2){
      this.getAlertas2();

    }else{
      this.getAlertas3();
    }
   
  }
});
    
  }







  loading:boolean=false;
 
  tabla(id:any,valor:any){
  
   this.isN=0;
   this.data=[];
   this.alerta1 = false;
  this.alerta2 = false;
  this.alerta3 = false;
    if (valor > 0) {
      this.loading= true;
      setTimeout(()=>{
        // this.loading = false;
        if (id == 1) {
          this.getAlertas1();
          this.alerta1 = true;
          this.alerta2 = false;
         this.alerta3 = false;
         this.alerta4 = false;
         this.alerta5 = false;
         this.alerta6 = false;

        } else if(id == 2) {
          this.getAlertas2();
          this.alerta2 = true;
          this.alerta3 = false;
          this.alerta1 = false;
         this.alerta4 = false;
         this.alerta5 = false;
         this.alerta6 = false;

        }else if(id == 3) {
         
         this.getAlertas3();
         this.alerta3= true;
         this.alerta1 = false;
         this.alerta2 = false;
         this.alerta4 = false;
         this.alerta5 = false;
         this.alerta6 = false;


        }else if(id == 4){
          this.getAlertas4();
          this.alerta3= false;
          this.alerta1 = false;
          this.alerta2 = false;
          this.alerta4 = true;
          this.alerta5 = false;
          this.alerta6 = false;

        }else if(id == 5){
          this.getAlertas5();
          this.alerta3= false;
          this.alerta1 = false;
          this.alerta2 = false;
          this.alerta4 = false;;
          this.alerta5 = true;
         this.alerta6 = false;

         
        }else if(id == 6){
          this.getAlertas6();
          this.alerta3= false;
          this.alerta1 = false;
          this.alerta2 = false;
          this.alerta4 = false;;
          this.alerta5 = false;
         this.alerta6 = true;

        }


      },10)
      if(this.alerta1){
        this.getAlertas1();
  
      }else if(this.alerta2){
  
        this.getAlertas2();
      }else if(this.alerta3){
        this.getAlertas3();
  
      }else if(this.alerta4){
        this.getAlertas4();
      }else if(this.alerta5){
        this.getAlertas5();
      }else if(this.alerta6){
        this.getAlertas6();
      }

    }else{
 
  this._alertas.openToast1('SIN ALERTAS PARA MOSTRAR' , 'bg-danger text-white' , 'ERROR');
  this.alerta1 = false;
  this.alerta2 = false;
  this.alerta3 = false;
  this.alerta4 = false;
  this.alerta5 = false;
  this.alerta6 = false;
    }
    
  }

  onFirstItemShow(idAlertaI:number) {
   
    if (this.isN == idAlertaI) {
      this.isN =0;
    }
    
   
  
  }
  verDetalle?:boolean;
  datosData:any;
  isN:number=0;
  vistoInfo(item:any){
      this.isN =item.idAlertaI;
   
    this._login.verErrorId(item.nEmpleado, item.fechaAlertaI,this.idServicio)
    .subscribe(data=>{ 

  
      if (data != 'error') {
        this.verDetalle = true;
       this.datosData = data;
        
      } else {
       this._alertas.openToast1('SIN DETALLES PARA MOSTRAR' , 'bg-danger text-white' , 'ERROR');
        
      }
    });
     
  }

  cerrarPanel(){
    this.panelRow=false;
    this.verDetalle=false;
    this.indice=-1;
    this.inputView=false;

  }
panelRow?:boolean;
itemT:any;
  vistoInfo5(item:any,j:any){
    console.log(item);
    
    this.panelRow=true;
    this.indice = j;
    this.itemT = item;
 
    this._login.verErrorId5(item.nEmpleado, item.fechaTrabajoF,this.idServicio)
    .subscribe(data=>{ 
      if (data != 'error') {
        this.verDetalle = true;
       this.datosData = data;
        
      } else {
       this._alertas.openToast1('SIN DETALLES PARA MOSTRAR', 'bg-danger text-white' , 'ERROR');
        
      }
    });
  }

  vistoInfo5Bis(j:any){
   
    this.panelRow=true;
    this.indice = j;
    this._login.verErrorId5(this.itemT.nEmpleado, this.itemT.fechaTrabajoF,this.idServicio)
    .subscribe(data=>{ 
      if (data != 'error') {
        this.verDetalle = true;
       this.datosData = data;
        
      } else {
       this._alertas.openToast1('SIN DETALLES PARA MOSTRAR', 'bg-danger text-white' , 'ERROR');
        
      }
    });
  }
  

  puesto?:string;
  name?:string;
  lastName?:string;
  puestos:any;
  idPla?:number
  func2(idPalntilla:any,fp:any,puesto:any , nombre:any, apellido:any,horario:any){


      this.puesto = puesto;
      this.idPla = idPalntilla;
      this.name = nombre;
      this.lastName = apellido
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
          this.getAlertas3();
          this.getAlertas2();
          this.getAlertas1();
          this.getAlertas4();
          this.getAlertas5();
          if(this.alerta5){
            this.vistoInfo5Bis( this.indice)
          }
          this.isN=0;
        }
     });
      
  }

  
  show: boolean = false;


  empleado?:Empleado;
  em?:boolean;
  puest?:any[];
  idPlantilla?:number;
  validar(item:any){
   
    this.idPlantilla = item.idPlantilla;
    let turno = item.horario.toLowerCase()

    this.empleado = item;
    this.em = true;
    this.modalM =  this.modalService.open(HorasModalComponent, {
      containerClass: 'left',
      modalClass: 'modal-side modal-top-left',
      ignoreBackdropClick: true,
      data: {
       param:10,
       name: item.nombre,
       lastName:item.apellidos,
       fechaTrabajo:item.fechaTrabajo,
       idServicio:item.idServicio,
       idPlantillaF:item.idPlantilla,
       nEmpleado: item.nEmpleado,
       idAlertaC: item.idAlertaC
    
      },
    });
    this.modalM.onClose.subscribe((message: any) => {
     
      
      if(message == 'closeMessage' ||  message == 'success'){
      this.getAlertas3();
      this.getAlertas2();
      this.getAlertas1();
      this.getAlertas4();
      this.getAlertas5();
      if(this.alerta5){
        this.vistoInfo5Bis( this.indice)
      }
      this.isN =0;
      }
    });
   
  }

idAlertaI?:number;
nEmpleado:number=0
fechaTrabajo:any
nombre:any
apellidos:any
  validarInfo(i:any , panel:any){
   
    this.idAlertaI = i.idAlertaI;
    this.nEmpleado = i.nEmpleado;
    this.fechaTrabajo = i.fechaAlertaI;
    this.nombre = i.nombre;
    this.apellidos = i.apellidos;
    this.modalM =  this.modalService.open(HorasModalComponent, {
      containerClass: 'left',
      modalClass: 'modal-side modal-top-left',
      ignoreBackdropClick: true,
      data: {
       param:9,
       name: this.nombre,
       lastName:this.apellidos,
       fechaTrabajo:this.fechaTrabajo,
       idServicio:this.idServicio,
       idPlantillaF:i.idPlantilla,
       nEmpleado: this.nEmpleado ,
       idAlertaI: this.idAlertaI
    
      },
    });
    this.modalM.onClose.subscribe((message: any) => {
     
      
      if(message == 'closeMessage' ||  message == 'success'){
      this.getAlertas3();
      this.getAlertas2();
      this.getAlertas1();
      this.getAlertas4();
      this.getAlertas5();
      if(this.alerta5){
        this.vistoInfo5Bis( this.indice)
      }
      this.isN =0;
      }
    });
    
  }




    fechaTrabajo1:any;
    nEmpledo:any;
    horasNormales:number=0;
    horasAusentes:any;
  justi(justificante:any,idPlantilla:any , item:any){
    this.fechaTrabajo1 = item.fechaTrabajo;
    this.nEmpledo = item.nEmpleado;
    this.horasNormales = item.normal;
    this.horasNormales = item.horasAusentes;
    let justificantes
       if ( justificante.target.value == '') {
          justificantes = null;
       }else{
        justificantes  =justificante.target.value
       }
    
    this._control.editarJustificante(justificantes, idPlantilla,this.fechaTrabajo1, this.nEmpledo,this.horasAusentes , this.horasNormales,this.idServicio)
    .subscribe(res=>{ 

       
      if (res == 'success') {
        this._alertas.openToast1('Justificación asignada...' , 'bg-success text-white' , 'OK');  
       
        if(this.alerta1){
          this.getAlertas1();
    
        }else if(this.alerta2){
    
          this.getAlertas2();
        }else if(this.alerta3){
          this.getAlertas3();
    
        }else if(this.alerta4){
          this.getAlertas4();
    
        }else if(this.alerta5){
          this.getAlertas5();
    
        }else{
          this.getAlertas6();
        }
      }

    });

    // this.getContolEmpleados();
    
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
        this._alertas.openToast1('Hora ausente editada...', 'bg-success text-white' , 'OK');
        // this.habilitarE1=false;
      }

    });
     
   }


  puesto_id?:number;
  pu(event:any){
     this.puesto_id = event.target.value;
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
        this._alertas.openToast1('Hora normal editada...', 'bg-success text-white' , 'OK');
        // this.habilitarE1=false;
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
    this._control.editplantillasColumn(fechaTrabajo , nEmpleado , this.datosV , columna,idPlantilla,this.usuario,this.idServicio)
    .subscribe(res=>{ 
      // console.log(res);
      
      if (res == 'success') {
        this._alertas.openToast1('Campo editado...', 'bg-success text-white' , 'OK');;
        // this.habilitarE1=false;
      }
    });

  
  }

  
  siValidar1(empleado:any, frame1:any){

    this._control.validarEmpleado(empleado.fechaTrabajo,empleado.nEmpleado, empleado.idPlantilla)
 .subscribe(res=>{ 
     if (res == 'success') {
       this._control.eliminarAlertaCambio(empleado.idPlantilla)
       .subscribe(data=>{ 
            if (data == 'success') {
              
              frame1.hide();
              this._alertas.openToast1('Empleado validado correctamente...', 'bg-success text-white' , 'OK');
              if(this.alerta1){
                this.getAlertas1();
          
              }else if(this.alerta2){
          
                this.getAlertas2();
              }else if(this.alerta3){
                this.getAlertas3();
          
              }else if(this.alerta4){
                this.getAlertas4();
          
              }else if(this.alerta5){
                this.getAlertas5();
          
              }else{
                this.getAlertas6();
              }  
            }
       });
     } else {
       alert ('Error al validar!');
     }
     });
    
  }

  camPuesto(changePuesto:any,fp:any){

    this._control.cambioPuest(changePuesto.value)
    .subscribe(data=>{ 
      if (data == 'success') {
        this.vistoInfo5(this.itemT,this.indice);
        fp.hide();
        this._alertas.openToast1('Cambio de puesto correcto...', 'bg-success text-white' , 'OK');
        if(this.alerta1){
          this.getAlertas1();
    
        }else if(this.alerta2){
    
          this.getAlertas2();
        }else if(this.alerta3){
          this.getAlertas3();
    
        }else if(this.alerta4){
          this.getAlertas4();
    
        }else if(this.alerta5){
          this.getAlertas5();
    
        }else{
          this.getAlertas6();
        }
      } else {
        this._alertas.openToast1('Error al cambiar de puesto...', 'bg-danger text-white' , 'ERROR');
      }  
  });
    // console.log(changePuesto.value);
    
  }

horario?:string;
horarios?:string;
fechaTra:any;
changeTurno(item:any ,fpHorario:any ){
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
   
    
    if(message == 'closeMessage' ||  message == 'success'){
     this.getAlertas3();
     this.getAlertas2();
     this.getAlertas1();
     this.getAlertas4();
     this.getAlertas5();
     if(this.alerta5){
      this.vistoInfo5Bis( this.indice)
    }
     this.isN=0;
    }
 });
  
}

btn?:boolean;
camHorario(changeHorario:any , fpHorario:any){
  this.btn=true;

  this._emple.cambiarHorario(changeHorario.value)
  .subscribe(data=>{ 
    if (data == 'success') {
      this._alertas.openToast1('Cambio de horario correcto...', 'bg-success text-white' , 'OK');
      fpHorario.hide();
      this.btn = false;
      
      if(this.alerta1){
        this.getAlertas1();
        
      }else if(this.alerta2){
        
        this.getAlertas2();
      }else if(this.alerta3){
        this.getAlertas3();
        
      }else if(this.alerta4){
        this.getAlertas4();
        
      }else if(this.alerta5){
        this.getAlertas5();
        this.vistoInfo5(this.itemT,this.indice);
  
      }else if(this.alerta6){
        this._login.controlHorarioByEmpleado(this.nEmpleado,this.fecha_inicio,this.fecha_fin,this.idServicio)
      .subscribe(data=>{ 
        if (data != 'error') {
        this.datacHorario=data;
        this.chorario.show();
      }else{
        alert('error')
      }
   
    });
  
      }else{
        this.getAlertas4();
      }
      
    }else{
      this._alertas.openToast1('ERROR AL CAMBIAR DE HORARIO...', 'bg-success text-white' , 'OK');

    }
  });
  
}

addH(horario:any){
  this.horarios = horario;
  }


  modalB:any;
  salir(){
   
    if(this.alerta1){
      this.getAlertas1();

    }else if(this.alerta2){

      this.getAlertas2();
    }else if(this.alerta3){
      this.getAlertas3();

    }else if(this.alerta4){
      this.getAlertas4();

    }else if(this.alerta5){
      this.getAlertas5();

    }else{
      this.getAlertas6();
    }
     this.modalB.hide();
     this.valor = 0;
     this.selectedValue = '';
  
  }

  selectedValue? :string;
  valor:number=0;
  getSelectedValue(event:any){
    this.valor = event;
  }

  siCambiar(){
    if (this.valor > 0 ) {
      this.horasAusentes = this.valor;
        this.siValidarJust(this.horasAusentes , this.horasNormales);
        this.selectedValue = '';
        this.modalB.hide();
      }else{
        if(this.alerta1){
          this.getAlertas1();
    
        }else if(this.alerta2){
    
          this.getAlertas2();
        }else if(this.alerta3){
          this.getAlertas3();
    
        }else if(this.alerta4){
          this.getAlertas4();
    
        }else if(this.alerta5){
          this.getAlertas5();
    
        }else{
          this.getAlertas6();
        }
        
      }
  }


  siValidarJust(horasAusentes:any , horasNormales:any){
    
    this._control.editarJustificanteAdmin(this.justiF, this.idPlantillaF,this.fechaTrabajo, this.nEmpledo, horasAusentes , horasNormales,this.idServicio)
       .subscribe(res=>{ 
  
         if (res == 'success') {
           
             this._alertas.openToast1('Justificación asignada...', 'bg-success text-white' , 'OK');
          
         }else{
        
            this._alertas.openToast1('Justificación no  asignada...', 'bg-danger text-white' , 'OK');
          
           }
           if(this.alerta1){
            this.getAlertas1();
      
          }else if(this.alerta2){
      
            this.getAlertas2();
          }else if(this.alerta3){
            this.getAlertas3();
      
          }else if(this.alerta4){
            this.getAlertas4();
      
          }else if(this.alerta5){
            this.getAlertas5();
      
          }else{
            this.getAlertas6();
          }
 
       });
 
     }

     justiF?:number;
     emplJus?:boolean;
     idPlantillaF?:number;
     justiA(justificante:any,idPlantilla:any ,empleado:any,basicModal:any){
       this.modalB = basicModal;
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
         this.modalB.show();
        
       }
       
     }

     turModal?:any;
     idPlant?:number;
     turnoOriginal?:number;
     listTurno:any;
     changeTurnoDia(idPlantilla:any, descripcionPuesto:any,nombre:any,apellidos:any, turno:any ,turChange:any){
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
       fechaTra:this.fechaTra,
       usuario:this.usuario,
       idServicio:this.idServicio,
       idPlantillaF:this.idPlant,
       turnoOriginal:this.turnoOriginal
    
      },
    });
    this.modalM.onClose.subscribe((message: any) => {
     
      if(message == 'closeMessage' ||  message == 'success'){
       this.getAlertas1();
       this.getAlertas3();
       this.getAlertas2();
       this.getAlertas4();
       this.getAlertas5();
       if(this.alerta5){
        this.vistoInfo5Bis( this.indice)
      }
       this.isN=0;
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
        this.vistoInfo5(this.itemT,this.indice);

            if(this.alerta1){
              this.getAlertas1();
        
            }else if(this.alerta2){
        
              this.getAlertas2();
            }else if(this.alerta3){
              this.getAlertas3();
        
            }else if(this.alerta4){
              this.getAlertas4();
        
            }else if(this.alerta5){
              this.getAlertas5();
        
            }else{
              this.getAlertas6();
            }
            this._alertas.openToast1('Cambio de turno correcto...', 'bg-danger text-white' , 'OK');

          } else {
            
          }  
      });
        // console.log(changePuesto.value);
        
      }

fechaHoy:any;
anio:any;
fecha(){
  var f = new Date();
//  this.fechaHoy =  f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
 this.fechaHoy =  f.getFullYear() + '/' + (f.getMonth() +1) + "/" +  f.getDate() ;
  this.anio =f.getFullYear();
  }


  coment?:string;
      
  getCom(nEmpleado:any, year:any){
    this._emple.comentarios(nEmpleado,year)
.subscribe(co=>{ 

  if (co !=undefined || co != null) {
    this.coment = co.com;
  }else{
    this.coment = '';
  }
});
  }

  edi?:boolean;
  empleadosN:number=0;
  comentF?:string;
  modalC(frames:any,item:any){
   
    this.comentF = item.comentarios
    this.nEmpleado = item.nEmpleado
    this.fechaTrabajo = item.fechaTrabajo
    this.nombre = item.nombre,
    this.apellidos = item.apellidos,
    this.fechaTrabajo = item.fechaTrabajo
    this.edi = true;
  }

  addComent(cometario:any,errores:any){
   

    this._emple.addCometario(cometario.value)
    .subscribe(data=>{ 

 
       if (data == 'success') {
         this._alertas.openToast1('Comentario guardado', 'bg-success text-white' , 'OK');
         if(this.alerta1){
          this.getAlertas1();
    
        }else if(this.alerta2){
    
          this.getAlertas2();
        }else if(this.alerta3){
          this.getAlertas3();
    
        }else if(this.alerta4){
          this.getAlertas4();
    
        }else if(this.alerta5){
          this.getAlertas5();
    
        }else{
          this.getAlertas6();
        }
         
       } else {
         this._alertas.openToast1('Error en el sistema', 'bg-danger text-white' , 'OK');
         // console.log(data);
         
         
       }
    });
     errores.hide();
 
     
 
   }
 

  com:any;
  addCo(come:any, frame:any){
    
    this._emple.addCoemntarioEmpleado(this.empleadosN , come.value,this.idServicio)
    .subscribe(data=>{  
    if (data == 'success') {
      this._alertas.openToast1('Comentario editado', 'bg-success text-white' , 'OK');
      frame.hide();
      this.edi = false;
     
      this.com = null;
      this.fecha();
      this.getCom(this.empleadosN , this.anio);
    } else {
      this._alertas.openToast1('Error al editar comentario.', 'bg-danger text-white' , 'OK');
    }
    });
    
  }

  addComentarioF(comentarioF:any,idAlertaFichaje:any){
  let come=  comentarioF.value.trim();
 
   if (come != "") {
     this.editarComantarioFichaje(come,idAlertaFichaje);
   } 
    

    
  }



  validarFicha(i:any ){
    
    if (i.comentarioF == '' || i.comentarioF == null) {
      alert('No puede validar el fichaje sin colocar un  comentario previo.');
      this._alertas.openToast1('No puede validar el fichaje sin colocar un  comentario previo.', 'bg-success text-white' , 'OK');;
    } else {

      let confirmar = confirm('¿Quire validar el ficheje del día ' + i.fechaTrabajoF + ' del trabajador ' + i.apellidos)
    
      if (confirmar) {
        this._emple.validarComantarioFichaje(i.idAlertaFichaje)
        .subscribe(data=>{ 
           if (data == 'success') {
            this.getAlertas5();
            this._alertas.openToast1('Fichaje validado correctamente...', 'bg-success text-white' , 'OK');
            this.inputView = false;
             this.comentarioF=null;
             this.verDetalle=false;
             this.indice=-1;
             this.panelRow=false;
          
           } else {
             
           }
        });
      } else {
        return;
      }
      
    }
    
  }

  validarFichaTodo(){

    let a = confirm('¿Desea validar todas las alertas de fichajes?');

    if (a) {
      this._emple.validarFichaTodo(this.idServicio)
      .subscribe(data=>{ 

        if (data == 'sinComentario') {
          alert('No puede validar el fichaje sin colocar un  comentario previo.');
          this._alertas.openToast1('No puede validar el fichaje sin colocar un  comentario previo.', 'bg-danger text-white' , 'OK');
        } else {
          this._alertas.openToast1('Todos los fichajes se han validado correctamente...', 'bg-success text-white' , 'OK');
          this.getAlertas5();
        }

      });
      
    } 


  }

todoTitulos1:any;
getTitulos1(){
  this._emple.getComentarioFichaje(this.idServicio)
  .subscribe(data=>{ 
   
    if (data == 'error') {
      this.todoTitulos1=[];
    }else{
      this.todoTitulos1 = data;
    }
    
 
  });
}

inputView?:boolean;
indice:number=-1;
changeComantario(event:any,idAlertaFichaje:any,j:any){
 this.indice = j;
  if (event.target.value == 0) {
    this.inputView = true;
  }else{
    this.editarComantarioFichaje(event.target.value,idAlertaFichaje);
    this.inputView = false;
   
  }
  
}


comentarioF:any;
editarComantarioFichaje(comentarioF:any ,idAlertaFichaje:any){

  
 this._emple.editarComantarioFichaje(idAlertaFichaje,comentarioF)
 .subscribe(data=>{ 
 
   if (data == 'success') {
    this.getAlertas5();
    this._alertas.openToast1('Comentario editado correctamente...', 'bg-success text-white' , 'OK');
  
   } else {
     alert('Error en el comentario.');
   }
 });
}

cerrar(){
  this.inputView=false;
 
}

}
