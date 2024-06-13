import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective } from 'mdb-angular-ui-kit/table';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 


@Component({
  selector: 'app-horas-extras-bolsa-ant',
  templateUrl: './horas-extras-bolsa-ant.component.html',
  styleUrls: ['./horas-extras-bolsa-ant.component.css']
})
export class HorasExtrasBolsaAntComponent implements OnInit {

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
    this.data=[];
  }


  search(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.table.search(searchTerm);
  }



  constructor(
    private _alerta:NotificacionService,
    private _control : ControlHorasService,
    private excelService:ExcelService,
  ) { }

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

  exportAsXLSX():void {
    // console.log(this.fechas);
 
    this.excelService.exportAsExcelFile(this.data, 'Informes_Horas-Bolsas' +this.anio );
  
  }


  filterQuery="";
  data:any;
  getInforme(){
    this._control.getInformeConsultaEmpleados(this.anio,this.idServicio)
    .subscribe(data=>{ 
      console.log(data);
      
     
      if(data == 'error'){
        alert('NADA PARA MOSTRAR');
        this.closeAlert();
        
      }else{
      this.data = data;
   
    }
    // debugger
    // this.totalAusencia5 = this.totalAusencia5 / this.totalMa *100;
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
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 270);
        pdf.setFontSize(25)
         pdf.save(pagina); // Generated PDF  
       }); 
       this.pri= false;
    },500)
        
       }
    

}
