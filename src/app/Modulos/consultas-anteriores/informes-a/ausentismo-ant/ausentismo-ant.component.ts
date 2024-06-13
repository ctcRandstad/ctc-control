import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import { MdbTableDirective } from 'mdb-angular-ui-kit/table';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';

@Component({
  selector: 'app-ausentismo-ant',
  templateUrl: './ausentismo-ant.component.html',
  styleUrls: ['./ausentismo-ant.component.css']
})
export class AusentismoAntComponent implements OnInit {

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
      this.getInforme();
      this.siAnio = true;
    }else{
      this.siAnio = false;
    }
  }
  closeAlert() {
    this.loadingHoras=true;
    this.siAnio = false;
    this.data=[];
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

  constructor(
    private ruta:Router,
    private _alerta:NotificacionService,
    private _control : ControlHorasService,
    private excelService:ExcelService,
  ) { }




  idServicio:any;
  mes:number=0;
  ngOnInit(): void { const idServicios:any = localStorage.getItem(btoa('servicio'));
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

  getInforme(){
this._control.getAusentismo(this.anio,this.idServicio)
.subscribe(data=>{ 

this.data = data;
if(this.data == 'error'){
  alert('NADA PARA MOSTRAR');
 
  
}else{


for (let i = 0; i < this.data.length; i++) {
 this.totalEnero = this.totalEnero +  this.data[i].enero;
 this.totalF = this.totalF +  this.data[i].febrero;
 this.totalM = this.totalM +  this.data[i].marzo;
 this.totalA = this.totalA +  this.data[i].abril;
 this.totalMa = this.totalMa +  this.data[i].mayo;
 this.totalJu = this.totalJu +  this.data[i].junio;
 this.totalJul = this.totalJul +  this.data[i].julio;
 this.totalAgo = this.totalAgo +  this.data[i].agosto;
 this.totalSep = this.totalSep +  this.data[i].septiembre;
 this.totalOct = this.totalOct +  this.data[i].octubre;
 this.totalNo = this.totalNo +  this.data[i].noviembre;
 this.totalDic = this.totalDic +  this.data[i].diciembre;
 
}




}

});

  }
  sort_by_key(array:any, key:any)
  {
   return array.sort(function(a:any, b:any)
   {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
   });
  }
  


  datos:any;
  exportAsXLSX():void {
    // console.log(this.fechas);
    
    this._control.getInformeExcelConsulta(this.anio,2,this.idServicio)
    .subscribe(data=>{ 
      // console.log(data);
      
     this.datos = data;
   
     this.excelService.exportAsExcelFile(this.datos, 'Informes_Horas-Extras' +this.anio );
      
    
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
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 38);
    pdf.setFontSize(10)
     pdf.save(pagina); // Generated PDF  
   }); 
   this.pri= false;
},500)
    
   }
}

