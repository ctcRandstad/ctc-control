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
  mes:any;
  idServicio:any;
  ngOnInit() {
    const idServicios:any = localStorage.getItem(btoa('servicio'));
    const usuario:any = localStorage.getItem('usuario');
    const tipoUsuario:any = localStorage.getItem('rol');


    this.idServicio = atob(idServicios);
    this.usuario = atob(usuario);
    this.tipoUsuario = atob(tipoUsuario);

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

  datosH:any=[];
  datosHq:any=[];
  loading:boolean = true;
  getInforme(){
this._control.getAbsentismo1(this.anio,this.idServicio)
.subscribe(data=>{ 
  if(this.data == 'error'){
    alert('NADA PARA MOSTRAR');
  }else{

    this.data = data;
    let totalMeses = Array(12).fill(0);
    
    // Recorrer los datos y acumular los valores por mes
    this.data.forEach((item:any, index:any) => {
      if (item.porcentajeAbsentismo !== null) {
        totalMeses[index] = item.porcentajeAbsentismo;
      }
    });
    
    // Asignar a las variables correspondientes
    this.totalEnero = totalMeses[0];
      this.totalF = totalMeses[1];
      this.totalM = totalMeses[2];
      this.totalA = totalMeses[3];
      this.totalMa = totalMeses[4];
      this.totalJu = totalMeses[5];
      this.totalJul = totalMeses[6];
      this.totalAgo = totalMeses[7];
      this.totalSep = totalMeses[8];
      this.totalOct = totalMeses[9];
      this.totalNo = totalMeses[10];
      this.totalDic = totalMeses[11];
      
      setTimeout(()=>{
        this.loading=false;
      },1000)
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

//    ngOndestroy(){
//     this.getInforme();
//    }
}
