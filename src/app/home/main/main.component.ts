import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';

import { NotificacionService } from 'src/app/Services/notificacion.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(
    private _empleados:EmpleadosService,
    private _control:ControlHorasService,
    private _alerta:NotificacionService,
    private ruta:Router
  ) { }
  idServicio:any;
  tipoUsuario:any;
  ngOnInit() {
    let ser:any = localStorage.getItem(btoa('servicio'));
    let rol:any = localStorage.getItem('rol');
   
    this.idServicio = atob(ser);
    this.tipoUsuario = atob(rol);
   
    var today = new Date();
    this.anio = today.getFullYear();
    this.mes = today.getMonth() + 1;
    this.getJustifEmpleados();
    this. getHorasExtras();
    this. getHorasExtrasA();
   
  }

anio:any;
mes:any;
dataTotal:any;
dataTotalE:any;
 dat:any;
 baja:any;
 data:any;
  getJustifEmpleados(){
    this._empleados.getEmplaedosActivos(this.idServicio)
    .subscribe(resp=>{
      if (resp != 'error') {
        this.data = resp;
        this.dataTotalE = this.data.length;
        this._empleados.getCountJust(this.idServicio)
        .subscribe(data=>{
         this.dat = data;
         if (this.dat == null) {
          this.dataTotal=0;
         } else {
           this.dataTotal = this.dat.length;
           this.baja= this.dataTotal*100 / this.dataTotalE
         }
           
        });
      } else {
       this.data = [];
       this.dataTotalE = 0;
      }
      
    })
      
  }


  totalHExtras:any=0;
  totalHExtrasArra:any;
  totalHExtrasP:any;
  horaE:number=0;
  porcentaje:number=0;
  getHorasExtras(){
   
    this._control.getInformeExcelConsultaExtras(this.anio,this.idServicio)
    .subscribe(data=>{ 
     
      if(data == 'nada'){
       this.totalHExtras = 0;
      }else{
       
        this.totalHExtrasArra = data;
       
        for (let i = 0; i < this.totalHExtrasArra.length; i++) {
          
          if (this.mes == 1) {
            this.totalHExtras = parseFloat (this.totalHExtras + this.totalHExtrasArra[i]['ENERO']);
          }else if(this.mes == 2){
            this.totalHExtras = parseFloat (this.totalHExtras + this.totalHExtrasArra[i]['FEBRERO']);
          }else if(this.mes == 3){
            this.totalHExtras = parseFloat (this.totalHExtras + this.totalHExtrasArra[i]['MARZO']);
          }else if(this.mes == 4){
            this.totalHExtras = parseFloat (this.totalHExtras + this.totalHExtrasArra[i]['ABRIL']);
          }else if(this.mes == 5){
            this.totalHExtras = parseFloat (this.totalHExtras + this.totalHExtrasArra[i]['MAYO']);
          }else if(this.mes == 6){
            this.totalHExtras = parseFloat (this.totalHExtras + this.totalHExtrasArra[i]['JUNIO']);
          }else if(this.mes == 7){
            this.totalHExtras = parseFloat (this.totalHExtras + this.totalHExtrasArra[i]['JULIO']);
          }else if(this.mes == 8){
            this.totalHExtras = parseFloat (this.totalHExtras + this.totalHExtrasArra[i]['AGOSTO']);
          }else if(this.mes == 9){
            this.totalHExtras = parseFloat (this.totalHExtras + this.totalHExtrasArra[i]['SEPTIEMBRE']);
          }else if(this.mes == 10){
            this.totalHExtras = parseFloat (this.totalHExtras + this.totalHExtrasArra[i]['OCTUBRE']);
          }else if(this.mes == 11){
            this.totalHExtras = parseFloat (this.totalHExtras + this.totalHExtrasArra[i]['NOVIEMBRE']);
          }else if(this.mes == 12){
            this.totalHExtras = parseFloat (this.totalHExtras + this.totalHExtrasArra[i]['DICIEMBRE']);
          }
        }
      }
      this._empleados.getCountHExtrasPorcentaje(this.idServicio)
      .subscribe(data=>{ 
        this.totalHExtrasP = data;
        if ( this.totalHExtrasP  > 0 && this.totalHExtras > 0) {
          this.porcentaje = this.totalHExtras / this.totalHExtrasP *100;
        }
      });
    });
  }


  totalHExtrasA:any=0;
  totalHExtrasArr:any;
  totalHExtrasPA:any;
  horaEA:number=0;
  porcentajeA:number=0;
  getHorasExtrasA(){
   
    this._control.getInformeExcelConsultaExtras(this.anio,this.idServicio)
    .subscribe(data=>{ 

      
      if(data == 'nada'){
        this.totalHExtrasA = 0;
      }else{
        // this.totalHExtrasA = data;
        this.totalHExtrasArr = data;
  
        for (let i = 0; i < this.totalHExtrasArr.length; i++) {
          this.totalHExtrasA = parseFloat (this.totalHExtrasA + this.totalHExtrasArr[i]['ENERO']);
          this.totalHExtrasA = parseFloat (this.totalHExtrasA + this.totalHExtrasArr[i]['FEBRERO']);
          this.totalHExtrasA = parseFloat (this.totalHExtrasA + this.totalHExtrasArr[i]['MARZO']);
          this.totalHExtrasA = parseFloat (this.totalHExtrasA + this.totalHExtrasArr[i]['ABRIL']);
          this.totalHExtrasA = parseFloat (this.totalHExtrasA + this.totalHExtrasArr[i]['MAYO']);
          this.totalHExtrasA = parseFloat (this.totalHExtrasA + this.totalHExtrasArr[i]['JUNIO']);
          this.totalHExtrasA = parseFloat (this.totalHExtrasA + this.totalHExtrasArr[i]['JULIO']);
          this.totalHExtrasA = parseFloat (this.totalHExtrasA + this.totalHExtrasArr[i]['AGOSTO']);
          this.totalHExtrasA = parseFloat (this.totalHExtrasA + this.totalHExtrasArr[i]['SEPTIEMBRE']);
          this.totalHExtrasA = parseFloat (this.totalHExtrasA + this.totalHExtrasArr[i]['OCTUBRE']);
          this.totalHExtrasA = parseFloat (this.totalHExtrasA + this.totalHExtrasArr[i]['NOVIEMBRE']);
          this.totalHExtrasA = parseFloat (this.totalHExtrasA + this.totalHExtrasArr[i]['DICIEMBRE']);
        
          
        }

      }
      this._empleados.getCountHExtrasPorcentajeA(this.idServicio)
      .subscribe(data=>{ 
        this.totalHExtrasPA = data;

        if ( this.totalHExtrasPA  > 0 && this.totalHExtrasA > 0) {
          this.porcentajeA = this.totalHExtrasA / this.totalHExtrasPA *100;
        }
      });
    });
  }



  viewPanel:boolean=false;
  dataTurno:any=[];
  daySearch:any=null;
  searchTurno(data:any){
    this.viewPanel=false;
    this.dataTurno=[];
    // demoBasic.show();
    if (data.value.today == '') {
      alert('Campo fecha vacio.')
    } else {
      this.daySearch= data.value.today;
      this._empleados.viewTurno(data.value.idServicio,data.value.today)
      .subscribe(data=>{ 
      
        if (data == 'error') {
          this.viewPanel=false;
          this._alerta.openAlert('No hay información disponible en la fecha seleccionada.' , 'bg-danger text-white', 'center')
        } else {
          this.viewPanel=true;
          setTimeout(()=>{
            // demoBasic.hide();
          },1500)
          this.dataTurno.push(... data) ;
         
        }
      });
     
    }
    
  }
 

}
