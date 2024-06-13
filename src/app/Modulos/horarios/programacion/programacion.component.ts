import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { HorasModalComponent } from 'src/app/Modales/horas-modal/horas-modal.component';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css']
})
export class ProgramacionComponent implements OnInit {

  constructor(
    private ruta:Router,
    private _empleados :EmpleadosService,
    private _alerta:NotificacionService,
    private _control : ControlHorasService,
    private excelService:ExcelService,
    private modalService: MdbModalService,
  ) { }

 
  usuario:any;
  idServicio:any;
  ngOnInit() {
    let ser:any = localStorage.getItem(btoa('servicio'));
    let rol:any = localStorage.getItem('usuario')
    this.usuario = atob(rol);
    if (this.usuario != 'admin') {
      this.ruta.navigate(['Empleados']);
      return;
    }
    
    
    this.idServicio = atob(ser);
    
  }

filtarTuros:any;
modalM:any;
turno:any="aaa";
filter:any="";
filtro:any="";
mos:boolean=false;
filtrarModal(){
  this.modalM =  this.modalService.open(HorasModalComponent, {
    containerClass: 'right',
    modalClass: 'modal-side modal-top-right',
    ignoreBackdropClick: true,
    data: {
     param:8,
     idServicio: this.idServicio
   
  
    },
  });
  this.modalM.onClose.subscribe((message: any) => {
   
    if(message != 'closeMessage' ){
       this.filtarTuros = message; 
       this.mos = true
    }else{
      this.mos = false;
    }
  });
 
}

// 

  //mañana
dia1Manana:any;
dia2Manana:any;
dia3Manana:any;
dia4Manana:any;
dia5Manana:any;
dia6Manana:any;
dia7Manana:any;
dia8Manana:any;
dia9Manana:any;
dia10Manana:any;
dia11Manana:any;
dia12Manana:any;
dia13Manana:any;
dia14Manana:any;

//tarde
dia1Tarde:any;
dia2Tarde:any;
dia3Tarde:any;
dia4Tarde:any;
dia5Tarde:any;
dia6Tarde:any;
dia7Tarde:any;
dia8Tarde:any;
dia9Tarde:any;
dia10Tarde:any;
dia11Tarde:any;
dia12Tarde:any;
dia13Tarde:any;
dia14Tarde:any;

//NOCHE

dia1Noche:any;
dia2Noche:any;
dia3Noche:any;
dia4Noche:any;
dia5Noche:any;
dia6Noche:any;
dia7Noche:any;
dia8Noche:any;
dia9Noche:any;
dia10Noche:any;
dia11Noche:any;
dia12Noche:any;
dia13Noche:any;
dia14Noche:any;


  //fechas

fecha1:any;
fecha2:any;
fecha3:any;
fecha4:any;
fecha5:any;
fecha6:any;
fecha7:any;
fecha8:any;
fecha9:any;
fecha10:any;
fecha11:any;
fecha12:any;
fecha13:any;
fecha14:any;
contratosE:any;
justi:boolean=false;
datas:boolean=false;
loading:boolean=false;
dataJ:any;
dataJNoche:any;
dataJFecha:any;
filterQuery="";
 todoTurnos:any=[];
 limitM:number =0;
 limitT:number = 0;
 fechasData:any;
 mostrarBtn:boolean=false;

  buscar1(action:any){
   
    this.justi = false;
    this.mostrarBtn=true;  
    
        this.fechasData = action.value;
        this._empleados.consultaProgramacionJus(action.value)
        .subscribe(data=>{ 
       
          // comprobamos la fecha , que no sea menor a hoy mismo
          if (data == 'no') {
            this.justi=false;
            this.datas=false;
               this.loading=false;
               this._alerta.openToast1('LA FECHA DE INICIO ES MENOR A LA DE HOY...' , 'bg-success text-white' , 'OK');
               this.mostrarBtn=false;
              }else{
                
  
                if (data.length >= 12) {
               this._alerta.openToast1('SOLAMANETE SE PUEDE VERIRFICAR 10 DÍAS...' , 'bg-danger text-white' , 'ERROR');
               this.mostrarBtn=false;
                  
                } else {
                  //   asigamno la data 
                  this.dataJ = data;
                this.todoTurnos=[];
                  for (let i = 0; i <  this.dataJ.length; i++) {
                    const element =  this.dataJ[i].fechaTrabajo;
                    
                    this._empleados.consultaTurnoTotales(element,this.idServicio)
                    .subscribe(data=>{ 
                    
                    this.todoTurnos.push(...data);
                    this.todoTurnos.sort();   
                    });
                    
                  }
                
                  if(this.dataJ.length == 1){
                    this.fecha1=this.dataJ[0].fechaTrabajo;
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'm')
                    .subscribe((res=>{
                      this.dia1Manana = res;
                    }));
                    // tarde
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 't')
                    .subscribe((res=>{this.dia1Tarde = res;}));
                     // noche
                     this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'n')
                     .subscribe((res=>{this.dia1Noche = res;   }));
                  }if(this.dataJ.length == 2){
                    this.fecha1=this.dataJ[0].fechaTrabajo;
                    this.fecha2=this.dataJ[1].fechaTrabajo;
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'm')
                    .subscribe((res=>{this.dia1Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'm')
                    .subscribe((res=>{this.dia2Manana = res; }))
                    // tarde
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 't')
                    .subscribe((res=>{this.dia1Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 't')
                    .subscribe((res=>{this.dia2Tarde = res; }))
                    //noche
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'n')
                    .subscribe((res=>{this.dia1Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'n')
                    .subscribe((res=>{this.dia2Noche = res; }))
                  }if(this.dataJ.length == 3){
                    this.fecha1=this.dataJ[0].fechaTrabajo;
                    this.fecha2=this.dataJ[1].fechaTrabajo;
                    this.fecha3=this.dataJ[2].fechaTrabajo;
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'm')
                    .subscribe((res=>{this.dia1Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'm')
                    .subscribe((res=>{this.dia2Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'm')
                    .subscribe((res=>{this.dia3Manana = res; }));
                    //tarde
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 't')
                    .subscribe((res=>{this.dia1Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 't')
                    .subscribe((res=>{this.dia2Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 't')
                    .subscribe((res=>{this.dia3Tarde = res; }));
                 //noche
                 this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'n')
                    .subscribe((res=>{this.dia1Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'n')
                    .subscribe((res=>{this.dia2Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'n')
                    .subscribe((res=>{this.dia3Noche = res; }));
                  }if(this.dataJ.length == 4){
                    this.fecha1=this.dataJ[0].fechaTrabajo;
                    this.fecha2=this.dataJ[1].fechaTrabajo;
                    this.fecha3=this.dataJ[2].fechaTrabajo;
                    this.fecha4=this.dataJ[3].fechaTrabajo;
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'm')
                    .subscribe((res=>{this.dia1Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'm')
                    .subscribe((res=>{this.dia2Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'm')
                    .subscribe((res=>{this.dia3Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 'm')
                    .subscribe((res=>{this.dia4Manana = res; }));
                    //tarde
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 't')
                    .subscribe((res=>{this.dia1Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 't')
                    .subscribe((res=>{this.dia2Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 't')
                    .subscribe((res=>{this.dia3Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 't')
                    .subscribe((res=>{this.dia4Tarde = res; }));
                     //noche
                     this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'n')
                     .subscribe((res=>{this.dia1Noche = res; }));
                     this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'n')
                     .subscribe((res=>{this.dia2Noche = res; }));
                     this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'n')
                     .subscribe((res=>{this.dia3Noche = res; }));
                     this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 'n')
                     .subscribe((res=>{this.dia4Noche = res; }));
                  }if(this.dataJ.length == 5){
                
                    this.fecha1=this.dataJ[0].fechaTrabajo;
                    this.fecha2=this.dataJ[1].fechaTrabajo;
                    this.fecha3=this.dataJ[2].fechaTrabajo;
                    this.fecha4=this.dataJ[3].fechaTrabajo;
                    this.fecha5=this.dataJ[4].fechaTrabajo;
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'm')
                    .subscribe((res=>{this.dia1Manana = res;  console.log(res);}));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'm')
                    .subscribe((res=>{this.dia2Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'm')
                    .subscribe((res=>{this.dia3Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 'm')
                    .subscribe((res=>{this.dia4Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 'm')
                    .subscribe((res=>{this.dia5Manana = res; })); 
                    //tarde
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 't')
                    .subscribe((res=>{this.dia1Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 't')
                    .subscribe((res=>{this.dia2Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 't')
                    .subscribe((res=>{this.dia3Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 't')
                    .subscribe((res=>{this.dia4Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 't')
                    .subscribe((res=>{this.dia5Tarde = res; }));  
                    //noche
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'n')
                    .subscribe((res=>{this.dia1Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'n')
                    .subscribe((res=>{this.dia2Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'n')
                    .subscribe((res=>{this.dia3Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 'n')
                    .subscribe((res=>{this.dia4Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 'n')
                    .subscribe((res=>{this.dia5Noche = res; }));     
                  }if(this.dataJ.length == 6){

                    this.fecha1=this.dataJ[0].fechaTrabajo;
                    this.fecha2=this.dataJ[1].fechaTrabajo;
                    this.fecha3=this.dataJ[2].fechaTrabajo;
                    this.fecha4=this.dataJ[3].fechaTrabajo;
                    this.fecha5=this.dataJ[4].fechaTrabajo;
                    this.fecha6=this.dataJ[5].fechaTrabajo;
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'm')
                    .subscribe((res=>{this.dia1Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'm')
                    .subscribe((res=>{this.dia2Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'm')
                    .subscribe((res=>{this.dia3Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 'm')
                    .subscribe((res=>{this.dia4Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 'm')
                    .subscribe((res=>{this.dia5Manana = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 'm')
                    .subscribe((res=>{this.dia6Manana = res; }));
                    //tarde
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 't')
                    .subscribe((res=>{this.dia1Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 't')
                    .subscribe((res=>{this.dia2Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 't')
                    .subscribe((res=>{this.dia3Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 't')
                    .subscribe((res=>{this.dia4Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 't')
                    .subscribe((res=>{this.dia5Tarde = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 't')
                    .subscribe((res=>{this.dia6Tarde = res; })); 
                    //noche   
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'n')
                    .subscribe((res=>{this.dia1Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'n')
                    .subscribe((res=>{this.dia2Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'n')
                    .subscribe((res=>{this.dia3Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 'n')
                    .subscribe((res=>{this.dia4Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 'n')
                    .subscribe((res=>{this.dia5Noche = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 'n')
                    .subscribe((res=>{this.dia6Noche = res; }));  
                  }if(this.dataJ.length == 7){
                    this.fecha1=this.dataJ[0].fechaTrabajo;
                    this.fecha2=this.dataJ[1].fechaTrabajo;
                    this.fecha3=this.dataJ[2].fechaTrabajo;
                    this.fecha4=this.dataJ[3].fechaTrabajo;
                    this.fecha5=this.dataJ[4].fechaTrabajo;
                    this.fecha6=this.dataJ[5].fechaTrabajo;
                    this.fecha7=this.dataJ[6].fechaTrabajo;
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'm')
                    .subscribe((res=>{this.dia1Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'm')
                    .subscribe((res=>{this.dia2Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'm')
                    .subscribe((res=>{this.dia3Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 'm')
                    .subscribe((res=>{this.dia4Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 'm')
                    .subscribe((res=>{this.dia5Manana = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 'm')
                    .subscribe((res=>{this.dia6Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha7 , 'm')
                    .subscribe((res=>{this.dia7Manana = res; }));  
                    //tarde
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 't')
                    .subscribe((res=>{this.dia1Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 't')
                    .subscribe((res=>{this.dia2Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 't')
                    .subscribe((res=>{this.dia3Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 't')
                    .subscribe((res=>{this.dia4Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 't')
                    .subscribe((res=>{this.dia5Tarde = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 't')
                    .subscribe((res=>{this.dia6Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha7 , 't')
                    .subscribe((res=>{this.dia7Tarde = res; }));
                    //noche
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'n')
                    .subscribe((res=>{this.dia1Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'n')
                    .subscribe((res=>{this.dia2Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'n')
                    .subscribe((res=>{this.dia3Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 'n')
                    .subscribe((res=>{this.dia4Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 'n')
                    .subscribe((res=>{this.dia5Noche = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 'n')
                    .subscribe((res=>{this.dia6Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha7 , 'n')
                    .subscribe((res=>{this.dia7Noche = res; }));  
                  }if(this.dataJ.length == 8){
                    this.fecha1=this.dataJ[0].fechaTrabajo;
                    this.fecha2=this.dataJ[1].fechaTrabajo;
                    this.fecha3=this.dataJ[2].fechaTrabajo;
                    this.fecha4=this.dataJ[3].fechaTrabajo;
                    this.fecha5=this.dataJ[4].fechaTrabajo;
                    this.fecha6=this.dataJ[5].fechaTrabajo;
                    this.fecha7=this.dataJ[6].fechaTrabajo;
                    this.fecha8=this.dataJ[7].fechaTrabajo;
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'm')
                    .subscribe((res=>{this.dia1Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'm')
                    .subscribe((res=>{this.dia2Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'm')
                    .subscribe((res=>{this.dia3Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 'm')
                    .subscribe((res=>{this.dia4Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 'm')
                    .subscribe((res=>{this.dia5Manana = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 'm')
                    .subscribe((res=>{this.dia6Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha7 , 'm')
                    .subscribe((res=>{this.dia7Manana = res; })); 
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha8 , 'm')
                    .subscribe((res=>{this.dia8Manana = res; }));
                    //tarde
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 't')
                    .subscribe((res=>{this.dia1Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 't')
                    .subscribe((res=>{this.dia2Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 't')
                    .subscribe((res=>{this.dia3Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 't')
                    .subscribe((res=>{this.dia4Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 't')
                    .subscribe((res=>{this.dia5Tarde = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 't')
                    .subscribe((res=>{this.dia6Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha7 , 't')
                    .subscribe((res=>{this.dia7Tarde = res; })); 
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha8 , 't')
                    .subscribe((res=>{this.dia8Tarde = res; }));
                    //noche
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'n')
                    .subscribe((res=>{this.dia1Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'n')
                    .subscribe((res=>{this.dia2Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'n')
                    .subscribe((res=>{this.dia3Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 'n')
                    .subscribe((res=>{this.dia4Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 'n')
                    .subscribe((res=>{this.dia5Noche = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 'n')
                    .subscribe((res=>{this.dia6Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha7 , 'n')
                    .subscribe((res=>{this.dia7Noche = res; })); 
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha8 , 'n')
                    .subscribe((res=>{this.dia8Noche = res; }));
                  }if(this.dataJ.length == 9){
                    this.fecha1=this.dataJ[0].fechaTrabajo;
                    this.fecha2=this.dataJ[1].fechaTrabajo;
                    this.fecha3=this.dataJ[2].fechaTrabajo;
                    this.fecha4=this.dataJ[3].fechaTrabajo;
                    this.fecha5=this.dataJ[4].fechaTrabajo;
                    this.fecha6=this.dataJ[5].fechaTrabajo;
                    this.fecha7=this.dataJ[6].fechaTrabajo;
                    this.fecha8=this.dataJ[7].fechaTrabajo;
                    this.fecha9=this.dataJ[8].fechaTrabajo;
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'm')
                    .subscribe((res=>{this.dia1Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'm')
                    .subscribe((res=>{this.dia2Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'm')
                    .subscribe((res=>{this.dia3Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 'm')
                    .subscribe((res=>{this.dia4Manana = res;}));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 'm')
                    .subscribe((res=>{this.dia5Manana = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 'm')
                    .subscribe((res=>{this.dia6Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha7 , 'm')
                    .subscribe((res=>{this.dia7Manana = res; })); 
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha8 , 'm')
                    .subscribe((res=>{this.dia8Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha9 , 'm')
                    .subscribe((res=>{this.dia9Manana = res; }));
                    //tarde
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 't')
                    .subscribe((res=>{this.dia1Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 't')
                    .subscribe((res=>{this.dia2Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 't')
                    .subscribe((res=>{this.dia3Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 't')
                    .subscribe((res=>{this.dia4Tarde = res;}));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 't')
                    .subscribe((res=>{this.dia5Tarde = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 't')
                    .subscribe((res=>{this.dia6Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha7 , 't')
                    .subscribe((res=>{this.dia7Tarde = res; })); 
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha8 , 't')
                    .subscribe((res=>{this.dia8Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha9 , 't')
                    .subscribe((res=>{this.dia9Tarde = res; }));
                    //noche
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'n')
                    .subscribe((res=>{this.dia1Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'n')
                    .subscribe((res=>{this.dia2Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'n')
                    .subscribe((res=>{this.dia3Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 'n')
                    .subscribe((res=>{this.dia4Noche = res;}));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 'n')
                    .subscribe((res=>{this.dia5Noche = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 'n')
                    .subscribe((res=>{this.dia6Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha7 , 'n')
                    .subscribe((res=>{this.dia7Noche = res; })); 
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha8 , 'n')
                    .subscribe((res=>{this.dia8Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha9 , 'n')
                    .subscribe((res=>{this.dia9Noche = res; }));
                  }if(this.dataJ.length == 10){
                    this.fecha1=this.dataJ[0].fechaTrabajo;
                    this.fecha2=this.dataJ[1].fechaTrabajo;
                    this.fecha3=this.dataJ[2].fechaTrabajo;
                    this.fecha4=this.dataJ[3].fechaTrabajo;
                    this.fecha5=this.dataJ[4].fechaTrabajo;
                    this.fecha6=this.dataJ[5].fechaTrabajo;
                    this.fecha7=this.dataJ[6].fechaTrabajo;
                    this.fecha8=this.dataJ[7].fechaTrabajo;
                    this.fecha9=this.dataJ[8].fechaTrabajo;
                    this.fecha10=this.dataJ[9].fechaTrabajo;
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'm')
                    .subscribe((res=>{this.dia1Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'm')
                    .subscribe((res=>{this.dia2Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'm')
                    .subscribe((res=>{this.dia3Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 'm')
                    .subscribe((res=>{this.dia4Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 'm')
                    .subscribe((res=>{this.dia5Manana = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 'm')
                    .subscribe((res=>{this.dia6Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha7 , 'm')
                    .subscribe((res=>{this.dia7Manana = res; })); 
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha8 , 'm')
                    .subscribe((res=>{this.dia8Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha9 , 'm')
                    .subscribe((res=>{this.dia9Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha10 , 'm')
                    .subscribe((res=>{this.dia10Manana = res; }));
                    //tarde
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 't')
                    .subscribe((res=>{this.dia1Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 't')
                    .subscribe((res=>{this.dia2Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 't')
                    .subscribe((res=>{this.dia3Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 't')
                    .subscribe((res=>{this.dia4Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 't')
                    .subscribe((res=>{this.dia5Tarde = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 't')
                    .subscribe((res=>{this.dia6Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha7 , 't')
                    .subscribe((res=>{this.dia7Tarde = res; })); 
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha8 , 't')
                    .subscribe((res=>{this.dia8Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha9 , 't')
                    .subscribe((res=>{this.dia9Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha10 , 't')
                    .subscribe((res=>{this.dia10Tarde = res; }));
                    //noche
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'n')
                    .subscribe((res=>{this.dia1Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'n')
                    .subscribe((res=>{this.dia2Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'n')
                    .subscribe((res=>{this.dia3Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 'n')
                    .subscribe((res=>{this.dia4Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 'n')
                    .subscribe((res=>{this.dia5Noche = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 'n')
                    .subscribe((res=>{this.dia6Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha7 , 'n')
                    .subscribe((res=>{this.dia7Noche = res; })); 
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha8 , 'n')
                    .subscribe((res=>{this.dia8Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha9 , 'n')
                    .subscribe((res=>{this.dia9Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha10 , 'n')
                    .subscribe((res=>{this.dia10Noche = res; }));
                  }if(this.dataJ.length == 11){
                    this.fecha1=this.dataJ[0].fechaTrabajo;
                    this.fecha2=this.dataJ[1].fechaTrabajo;
                    this.fecha3=this.dataJ[2].fechaTrabajo;
                    this.fecha4=this.dataJ[3].fechaTrabajo;
                    this.fecha5=this.dataJ[4].fechaTrabajo;
                    this.fecha6=this.dataJ[5].fechaTrabajo;
                    this.fecha7=this.dataJ[6].fechaTrabajo;
                    this.fecha8=this.dataJ[7].fechaTrabajo;
                    this.fecha9=this.dataJ[8].fechaTrabajo;
                    this.fecha10=this.dataJ[9].fechaTrabajo;
                    this.fecha11=this.dataJ[10].fechaTrabajo;
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'm')
                    .subscribe((res=>{this.dia1Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'm')
                    .subscribe((res=>{this.dia2Manana = res;}));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'm')
                    .subscribe((res=>{this.dia3Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 'm')
                    .subscribe((res=>{this.dia4Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 'm')
                    .subscribe((res=>{this.dia5Manana = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 'm')
                    .subscribe((res=>{this.dia6Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha7 , 'm')
                    .subscribe((res=>{this.dia7Manana = res;})); 
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha8 , 'm')
                    .subscribe((res=>{this.dia8Manana = res;}));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha9 , 'm')
                    .subscribe((res=>{this.dia9Manana = res;}));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha10 , 'm')
                    .subscribe((res=>{this.dia10Manana = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha11 , 'm')
                    .subscribe((res=>{this.dia11Manana = res; }));
                    //tarde
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 't')
                    .subscribe((res=>{this.dia1Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 't')
                    .subscribe((res=>{this.dia2Tarde = res;}));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 't')
                    .subscribe((res=>{this.dia3Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 't')
                    .subscribe((res=>{this.dia4Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 't')
                    .subscribe((res=>{this.dia5Tarde = res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 't')
                    .subscribe((res=>{this.dia6Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha7 , 't')
                    .subscribe((res=>{this.dia7Tarde = res;})); 
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha8 , 't')
                    .subscribe((res=>{this.dia8Tarde = res;}));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha9 , 't')
                    .subscribe((res=>{this.dia9Tarde = res;}));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha10, 't')
                    .subscribe((res=>{this.dia10Tarde = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha11 , 't')
                    .subscribe((res=>{this.dia11Tarde = res; }));
                    //noche
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha1 , 'n')
                    .subscribe((res=>{this.dia1Noche= res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha2 , 'n')
                    .subscribe((res=>{this.dia2Noche= res;}));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha3 , 'n')
                    .subscribe((res=>{this.dia3Noche= res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha4 , 'n')
                    .subscribe((res=>{this.dia4Noche= res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha5 , 'n')
                    .subscribe((res=>{this.dia5Noche= res; }));  
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha6 , 'n')
                    .subscribe((res=>{this.dia6Noche= res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha7 , 'n')
                    .subscribe((res=>{this.dia7Noche= res;})); 
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha8 , 'n')
                    .subscribe((res=>{this.dia8Noche= res;}));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha9 , 'n')
                    .subscribe((res=>{this.dia9Noche= res;}));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha10, 'n')
                    .subscribe((res=>{this.dia1Noche = res; }));
                    this._empleados.consultaProgramacionJusFNoche(this.filtarTuros,this.idServicio, this.fecha11 , 'n')
                    .subscribe((res=>{this.dia11Noche= res; }));
                  }
  
    
                  this.justi = true;
                 setTimeout(()=>{
                   this.mostrarBtn=false;  
                 },10000) 
                  
                }
           }
           
            });
      
    }
  

    pri?:boolean;
    print(printer:any) : void{
      this.pri=true;
      this._alerta.openToast1('DESCARGANDO PDF, ESPERE POR FAVOR.' , 'bg-warning text-white' , 'DESCARGA...');
  setTimeout(()=>{
    const DATA:any = document.getElementById('printer');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const options = {
     
      allowTaint: true,
      useCORS: true,
    };
    html2canvas(DATA, options).then(canvas => { 
    
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Programación.pdf');
     this.pri= false;
    });
  },500)
      
     }

}
