import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import { MdbTableDirective } from 'mdb-angular-ui-kit/table';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';

@Component({
  selector: 'app-horas-no-trabajadas-ant',
  templateUrl: './horas-no-trabajadas-ant.component.html',
  styleUrls: ['./horas-no-trabajadas-ant.component.css']
})
export class HorasNoTrabajadasAntComponent implements OnInit {


  @ViewChild('table') table!: MdbTableDirective<any>;
  options = [
    { value: 'year1', label: '' },
    { value: 'year1', label: '' },
   
  ];
  anio:any;
  siAnio:boolean=false;
  loadingHoras:boolean= true;
  year1:any;
  year2:any;
  years:any;
  changeYear(event:any){
    setTimeout(()=>{
      this.loadingHoras=false;
     },2000);
  this.anio = event;
    if (this.anio) {
      this.siAnio = true;
      this.getInforme();
    }else{
      this.siAnio = false;
    }
  }
  closeAlert() {
    this.siAnio = false;
   this.salir();
  }

  salir(){
    this.totalEnero=0;
    this.totalF=0;
    this.totalM=0;
    this.totalA=0;
    this.totalMa=0;
    this.totalJu=0;
    this.totalJul=0;
    this.totalAgo=0;
    this.totalSep=0;
    this.totalOct=0;
    this.totalNo=0;
    this.totalDic=0;
  }



 
  pantalla:number;

  constructor(
    private ruta:Router,
    private _alerta:NotificacionService,
    private _control : ControlHorasService,
    private excelService:ExcelService,
  ) {
    if(screen.width <=1400){
      this.pantalla = 1;
      }else{
        this.pantalla = 2;
  
      }
   }

   idServicio:any;

  ngOnInit(): void {
    const idServicios:any = localStorage.getItem(btoa('servicio'));

    this.idServicio = atob(idServicios);
    var today = new Date();
    this.years = today.getFullYear();
  this.year1 = this.years - 1;
  this.year2 = this.years - 2;   
  this.options[0].label=this.year1
  this.options[1].label=this.year2
  }





  data:any;
  totalEnero:number=0;
  totalF:number=0;
  totalM:number=0;
  totalA:number=0;
  totalMa:number=0;
  totalJu:number=0;
  totalJul:number=0;
  totalAgo:number=0;
  totalSep:number=0;
  totalOct:number=0;
  totalNo:number=0;
  totalDic:number=0;
  // ausencias
  totalAusencia1:number=0;
  totalAusencia2:number=0;
  totalAusencia3:number=0;
  totalAusencia4:number=0;
  totalAusencia5:number=0;
  totalAusencia6:number=0;
  totalAusencia7:number=0;
  totalAusencia8:number=0;
  totalAusencia9:number=0;
  totalAusencia10:number=0;
  totalAusencia11:number=0;
  totalAusencia12:number=0;
  loading:boolean = true;
  getInforme(){
this._control.getInformeConsulta(this.anio,this.idServicio)
.subscribe(data=>{ 

this.data = data;
if(this.data == 'error'){
  alert('NADA PARA MOSTRAR');
 
}else{


for (let i = 0; i < this.data.length; i++) {
 this.totalEnero = this.totalEnero +  this.data[i].enero1;
 this.totalF = this.totalF +  this.data[i].febrero1 ;
 this.totalM = this.totalM +  this.data[i].marzo1;
 this.totalA = this.totalA +  this.data[i].abril1;
 this.totalMa = this.totalMa +  this.data[i].mayo1;
 this.totalJu = this.totalJu +  this.data[i].junio1;
 this.totalJul = this.totalJul +  this.data[i].julio1;
 this.totalAgo = this.totalAgo +  this.data[i].agosto1;
 this.totalSep = this.totalSep +  this.data[i].septiembre1;
 this.totalOct = this.totalOct +  this.data[i].octubre1;
 this.totalNo = this.totalNo +  this.data[i].noviembre1;
 this.totalDic = this.totalDic +  this.data[i].diciembre1;
 setTimeout(()=>{
  this.loading=false;
 },2000);

//  //ausencia
//  this.totalAusencia1 = this.totalAusencia1 +  this.data[i].enero1 ;
//  this.totalAusencia2 = this.totalAusencia2 +  this.data[i].febrero1 ;
//  this.totalAusencia3 = this.totalAusencia3 +  this.data[i].marzo1 ;
//  this.totalAusencia4 = this.totalAusencia4 +  this.data[i].abril1 ;
//  this.totalAusencia5 = this.totalAusencia5 +  this.data[i].mayo1 ;
//  this.totalAusencia6 = this.totalAusencia6 +  this.data[i].junio1 ;
//  this.totalAusencia7 = this.totalAusencia7 +  this.data[i].julio1 ;
//  this.totalAusencia8 = this.totalAusencia8 +  this.data[i].agosto1 ;
//  this.totalAusencia9 = this.totalAusencia9 +  this.data[i].septiembre1 ;
//  this.totalAusencia10 = this.totalAusencia10 +  this.data[i].octubre1 ;
//  this.totalAusencia11 = this.totalAusencia11+  this.data[i].noviembre1 ;
//  this.totalAusencia12= this.totalAusencia12 + this.data[i].diciembre1 ;
 
 
  }
}
// debugger
// this.totalAusencia5 = this.totalAusencia5 / this.totalMa *100;
});

  }


  datos:any;
  exportAsXLSX():void {
    // console.log(this.fechas);
    
    this._control.getInformeExcelConsulta(this.anio,2,this.idServicio)
    .subscribe(data=>{ 
      // console.log(data);
      
     this.datos = data;
   
     this.excelService.exportAsExcelFile(this.datos, 'Informes_Horas-No-Trabajadas' +this.anio );
      
    
  });
  
  }

  pri?:boolean;
  print(printer:any) : void{
    this.pri=true;
    this._alerta.openToast1('DESCARGANDO PDF, ESPERE POR FAVOR.' , 'bg-warning text-white' , 'DESCARGA...');
setTimeout(()=>{
  let contenido:any = document.getElementById(printer);
  let pdf = new jsPDF(); 
  html2canvas(contenido).then(canvas => { 
    const pagina =  'INFORME DE HORAS Y ABSENTISMO DEL AÑO EN CURSO'+ '.pdf';
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
    pdf.setFontSize(15)
     pdf.save(pagina); // Generated PDF  
   }); 
   this.pri= false;
},500)
    
   }
}
