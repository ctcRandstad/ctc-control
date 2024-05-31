import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';

@Component({
  selector: 'app-absentismo',
  templateUrl: './absentismo.component.html',
  styleUrls: ['./absentismo.component.css']
})
export class AbsentismoComponent implements OnInit {
  constructor(
    private ruta:Router,
    private _alerta:NotificacionService,
    private _control : ControlHorasService,
    private excelService:ExcelService,
  ) { }

  usuario:any;
  year1:any;
  year2:any;
  years:any;
  tipoUsuario:any;

  mes:number=0;
  idServicio:any;
  ngOnInit() {
    const idServicios:any = localStorage.getItem(btoa('servicio'));
    const usuario:any = localStorage.getItem('usuario');
    const tipoUsuario:any = localStorage.getItem('rol');


    this.idServicio = atob(idServicios);
    this.usuario = atob(usuario);
    this.tipoUsuario = atob(tipoUsuario);

    if (this.usuario != 'admin') {
      this.ruta.navigate(['principal/control-horas']);
    }


    var today = new Date();
    this.anio = today.getFullYear();
    this.getInforme();
    let momentoActual = new Date();
  this.mes =   (momentoActual.getMonth()+ 1);


  
  }


  anio:any;



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
  datosH:any=[];
  datosHq:any=[];
  loading:boolean = true;
  getInforme(){
this._control.getAbsentismo1(this.anio,this.idServicio)
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


// desglose de horas extras por meses
for (let index = 1; index < 13; index++) {

 
  this._control.getInformeConsultaHoras(this.anio , index,this.idServicio)
  .subscribe(data=>{
   
    this.datosH.push(data);
  });
  
}

setTimeout(()=>{
  this.datosHq = this.sort_by_key(this.datosH, 'mes');
  this.loading=false;
},2000)

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
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 98);
    pdf.setFontSize(10)
     pdf.save(pagina); // Generated PDF  
   }); 
   this.pri= false;
},500)
    
   }
}
