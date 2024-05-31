import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-horas-extras',
  templateUrl: './horas-extras.component.html',
  styleUrls: ['./horas-extras.component.css']
})
export class HorasExtrasComponent implements OnInit {

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

  usuario:any;
  year1:any;
  year2:any;
  years:any;
  tipoUsuario:any;
  loader?:boolean;
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
this._control.getInformeConsulta(this.anio,this.idServicio)
.subscribe(data=>{ 
this.data = data;
if(this.data == 'error'){
  alert('NADA PARA MOSTRAR');

  
}else{


for (let i = 0; i < this.data.length; i++) {
 this.totalEnero = this.totalEnero +  this.data[i].eneroh;
 this.totalF = this.totalF +  this.data[i].febreroh;
 this.totalM = this.totalM +  this.data[i].marzoh;
 this.totalA = this.totalA +  this.data[i].abrilh;
 this.totalMa = this.totalMa +  this.data[i].mayoh;
 this.totalJu = this.totalJu +  this.data[i].junioh;
 this.totalJul = this.totalJul +  this.data[i].julioh;
 this.totalAgo = this.totalAgo +  this.data[i].agostoh;
 this.totalSep = this.totalSep +  this.data[i].septiembreh;
 this.totalOct = this.totalOct +  this.data[i].octubreh;
 this.totalNo = this.totalNo +  this.data[i].noviembreh;
 this.totalDic = this.totalDic +  this.data[i].diciembreh;
 
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
},2000);

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
    
    this._control.getInformeExcelConsultaExtras(this.anio,this.idServicio)
    .subscribe(data=>{ 
      
      this.datos = data;
      this.datos.push({' ' : ' '})
      this.datos.push({
        'SECCIÓN' : 'H. EXTRA DIURNA' , 
        'ENERO' : this.datosH[0].ehe , 
        'FEBRERO' : this.datosH[1].ehe,
        'MARZO' : this.datosH[2].ehe,
        'ABRIL' : this.datosH[3].ehe,
        'MAYO' : this.datosH[4].ehe,
        'JUNIO' : this.datosH[5].ehe,
        'JULIO' : this.datosH[6].ehe,
        'AGOSTO' : this.datosH[7].ehe,
        'SEPTIEMBRE' : this.datosH[8].ehe,
        'OCTUBRE' : this.datosH[9].ehe,
        'NOVIEMBRE' : this.datosH[10].ehe,
        'DICIEMBRE' : this.datosH[11].ehe,
      })
      this.datos.push({
        'SECCIÓN' : 'H. EXTRA NOCTURNA' , 
        'ENERO' : this.datosH[0].ehen , 
        'FEBRERO' : this.datosH[1].ehen,
        'MARZO' : this.datosH[2].ehen,
        'ABRIL' : this.datosH[3].ehen,
        'MAYO' : this.datosH[4].ehen,
        'JUNIO' : this.datosH[5].ehen,
        'JULIO' : this.datosH[6].ehen,
        'AGOSTO' : this.datosH[7].ehen,
        'SEPTIEMBRE' : this.datosH[8].ehen,
        'OCTUBRE' : this.datosH[9].ehen,
        'NOVIEMBRE' : this.datosH[10].ehen,
        'DICIEMBRE' : this.datosH[11].ehen,
      })

      this.datos.push({
        'SECCIÓN' : 'H. EXTRA FESTIVA' , 
        'ENERO' : this.datosH[0].ehef , 
        'FEBRERO' : this.datosH[1].ehef,
        'MARZO' : this.datosH[2].ehef,
        'ABRIL' : this.datosH[3].ehef,
        'MAYO' : this.datosH[4].ehef,
        'JUNIO' : this.datosH[5].ehef,
        'JULIO' : this.datosH[6].ehef,
        'AGOSTO' : this.datosH[7].ehef,
        'SEPTIEMBRE' : this.datosH[8].ehef,
        'OCTUBRE' : this.datosH[9].ehef,
        'NOVIEMBRE' : this.datosH[10].ehef,
        'DICIEMBRE' : this.datosH[11].ehef,
      })
      
      
      this.excelService.exportAsExcelFile(this.datos, 'Informes_Horas-Extras' + this.anio );
      // console.log(this.datos);
      
      
    });
    // console.log(this.datosH);
  
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
