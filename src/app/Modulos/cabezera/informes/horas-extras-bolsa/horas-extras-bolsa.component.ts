import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import { MdbTableDirective } from 'mdb-angular-ui-kit/table';

@Component({
  selector: 'app-horas-extras-bolsa',
  templateUrl: './horas-extras-bolsa.component.html',
  styleUrls: ['./horas-extras-bolsa.component.css']
})
export class HorasExtrasBolsaComponent implements OnInit {
  pantalla:number;
  @ViewChild('table') table!: MdbTableDirective<any>;
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
   search(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.table.search(searchTerm);
  }



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

    var today = new Date();
    this.anio = today.getFullYear();
    // this.getInforme();
    let momentoActual = new Date();
  this.mes =   (momentoActual.getMonth()+ 1);



  
  }
  anio:any;
  siAnio?:boolean;

  datos:any;
  exportAsXLSX():void {
    // console.log(this.fechas);
 
    this.excelService.exportAsExcelFile(this.data, 'Informes_Horas-Bolsas' +this.anio );
  
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
    pdf.setFontSize(15)
     pdf.save(pagina); // Generated PDF  
   }); 
   this.pri= false;
},500)
    
   }

  
  filterQuery="";
  data:any;
  loading:boolean = true;
  getInforme(){
    this._control.getInformeConsultaEmpleados(this.anio,this.idServicio)
    .subscribe(data=>{ 
     
      if(data == 'error'){
        alert('NADA PARA MOSTRAR');
        
      }else{
      this.data = data;
      setTimeout(()=>{
        this.loading=false;
      },2000)
   
    }
    // debugger
    // this.totalAusencia5 = this.totalAusencia5 / this.totalMa *100;
    });
    
      }

}
