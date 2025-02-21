import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import html2canvas from 'html2canvas'; 
import jsPDF  from 'jspdf';


@Component({
  selector: 'app-horas-no-trabajadas',
  templateUrl: './horas-no-trabajadas.component.html',
  styleUrls: ['./horas-no-trabajadas.component.css']
})
export class HorasNoTrabajadasComponent implements OnInit {

  pantalla:number;
  constructor(
    private ruta:Router,
    // private _empleados :EmpleadosService,
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
  
  
  loader?:boolean;
  currentMonth:number=0;
  months!: number[];
  idServicio:any;
  ngOnInit() {
     const idServicios:any = localStorage.getItem(btoa('servicio'));
     this.idServicio = atob(idServicios)
    let momentoActual = new Date();
    this.currentMonth =   (momentoActual.getMonth()+ 1);
    this.anio = momentoActual.getFullYear();
    this.months = [];
    for (let i = 1; i <= 12; i++) {
      this.months.push(i);
    }
    this.getInforme();
  }


  datos: any; // Aquí se guardarán los datos de la consulta
  totalPorPuesto: any = {}; // Para almacenar el total por puesto
  // Variables para almacenar los totales por mes

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
  anio:any;
  getInforme(){
   

  
this._control.getInforme(this.anio,this.idServicio)
.subscribe(data=>{ 
 
  this.datos = data;
  this.calcularTotales(); // Llamamos a la función para sumar los totales
    setTimeout(()=>{
      this.loading=false;
     },2000);
    // debugger
    // this.totalAusencia5 = this.totalAusencia5 / this.totalMa *100;
    });
  }

  calcularTotales() {
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
  
    this.datos.forEach((puestoData: any) => {
      // Recorremos los meses y sumamos los valores
      Object.keys(puestoData.meses).forEach((mes: any) => {
        const mesData = puestoData.meses[mes];
  
        // Sumamos las horas y las bolsas relevantes para cada mes
        const totalMes = (mesData.ausentes || 0) ;
  
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
  
  datas:any
  exportAsXLSX():void {
    // console.log(this.fechas);
    
    this._control.getInformeExcel( this.idServicio)
    .subscribe(data=>{ 
      // console.log(data);
      
     this.datas = data;
   
     this.excelService.exportAsExcelFile(this.datos, 'Informes');
      
    
  });
  
  }

  pri?:boolean;
  print(printer:any) : void{
    this._alerta.openToast1('DESCARGANDO PDF, ESPERE POR FAVOR.', 'bg-warning text-white', 'DESCARGA...');

    setTimeout(() => {
      const contenido: any = document.getElementById(printer); // Asegúrate de que 'printer' sea el ID correcto
      const allChildren = contenido.querySelectorAll('*');
      allChildren.forEach((element: any) => {
        element.style.opacity = "1"; // Forzamos opacidad a 1 para todos los elementos
      });

      // Asegúrate de que el contenedor tiene un fondo blanco sólido
      contenido.style.backgroundColor = "#ffffff"; 
      contenido.style.opacity = "1"; // Forzamos que no haya transparencia
    
      // Generar el PDF
      const pdf = new jsPDF();
    
      // Configura html2canvas para mejorar la calidad y la opacidad
      html2canvas(contenido, {
        scale: 3, // Aumenta la escala para mejorar la resolución
        backgroundColor: "#ffffff", // Asegura que el fondo sea blanco
        logging: true, // Para ver los logs de html2canvas
        useCORS: true,
      }).then((canvas) => {
        const pagina = 'INFORME DE HORAS TRABAJADAS POR SECCIÓN DEL AÑO EN CURSO.pdf';
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297); // Asegura el tamaño adecuado del PDF
        pdf.setFontSize(15); // Ajusta el tamaño de la fuente
        pdf.save(pagina); // Genera y guarda el PDF con el nombre especificado
      }).catch((error) => {
        console.error('Error al generar el PDF: ', error);
      });
    
      this.pri = false; // Asegúrate de que 'pri' esté correctamente definido en tu componente
    }, 500);
    
    
  }
}
