import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import html2canvas from 'html2canvas'; 
import { Result } from './interfase';

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
  currentMonth:number=0;
  months!: number[];
  idServicio:any;
  ngOnInit() {
    const idServicios:any = localStorage.getItem(btoa('servicio'));
    const usuario:any = localStorage.getItem('usuario');
    const tipoUsuario:any = localStorage.getItem('rol');
    this.idServicio = atob(idServicios);
    this.usuario = atob(usuario);
    this.tipoUsuario = atob(tipoUsuario);
   
    let momentoActual = new Date();
    this.currentMonth =   (momentoActual.getMonth()+ 1);
    this.anio = momentoActual.getFullYear();
    this.months = [];
    for (let i = 1; i <= 12; i++) {
      this.months.push(i);
    }
    this.getInforme();
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
  this._control.getInforme(this.anio,this.idServicio)
  .subscribe(data=>{ 
    if(this.data == 'error'){
      alert('NADA PARA MOSTRAR');
  }else{
  this.data = data;
  this.calcularTotales(); // Llamamos a la función para sumar los totales
    setTimeout(()=>{
      this.loading=false;
    },1000);

  }
});

}


result: { [mes: number]: Result } = {};
mesesNombres: string[] = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
agruparPorMes(): void {
  this.data.forEach((puesto:any) => {
    Object.keys(puesto.meses).forEach(mes => {
      const mesNumero = parseInt(mes);
      if (!this.result[mesNumero]) {
        this.result[mesNumero] = {
          hora1: 0,
          hora2: 0,
          hora3: 0
        
        };
      }

      const mesData = puesto.meses[mesNumero];

      // Sumamos las horas y las bolsas
      this.result[mesNumero].hora1 += mesData.hora1;
      this.result[mesNumero].hora2 += mesData.hora2;
      this.result[mesNumero].hora3 += mesData.hora3;
     
    });
  });

  // Aquí puedes ver los resultados consolidados por mes
}

calcularTotales() {
  this.agruparPorMes();
    // Inicializamos los totales de cada mes en 0
    this.totalEnero = 0;
    this.totalF = 0;
    this.totalM = 0;
    this.totalA = 0;
    this.totalMa = 0;
    this.totalJu = 0;
    this.totalJul = 0;
    this.totalAgo = 0;
    this.totalSep = 0;
    this.totalOct = 0;
    this.totalNo = 0;
    this.totalDic = 0;
  
    this.data.forEach((puestoData: any) => {
      // Recorremos los meses y sumamos los valores
      Object.keys(puestoData.meses).forEach((mes: any) => {
        const mesData = puestoData.meses[mes];
  
        // Sumamos las horas y las bolsas relevantes para cada mes
        const totalMes = (mesData.hora1 || 0) + (mesData.hora2 || 0) + (mesData.hora3 || 0);
  
        // Acumulamos los totales por mes
        switch (mes) {
          case '1': // Enero
            this.totalEnero += totalMes;
            break;
          case '2': // Febrero
            this.totalF += totalMes;
            break;
          case '3': // Marzo
            this.totalM += totalMes;
            break;
          case '4': // Abril
            this.totalA += totalMes;
            break;
          case '5': // Mayo
            this.totalMa += totalMes;
            break;
          case '6': // Junio
            this.totalJu += totalMes;
            break;
          case '7': // Julio
            this.totalJul += totalMes;
            break;
          case '8': // Agosto
            this.totalAgo += totalMes;
            break;
          case '9': // Septiembre
            this.totalSep += totalMes;
            break;
          case '10': // Octubre
            this.totalOct += totalMes;
            break;
          case '11': // Noviembre
            this.totalNo += totalMes;
            break;
          case '12': // Diciembre
            this.totalDic += totalMes;
            break;
        }
      });
    });
  }
  

  exportAsXLSX(){

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
