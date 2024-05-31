import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';

@Component({
  selector: 'app-horas-comite',
  templateUrl: './horas-comite.component.html',
  styleUrls: ['./horas-comite.component.css']
})
export class HorasComiteComponent implements OnInit {

  constructor( 
    private ruta:Router,
    private _empleados :EmpleadosService,
    private _alerta:NotificacionService,
    private _control : ControlHorasService,
    private excelService:ExcelService,
    ) { }

    idServicio:any;
    ngOnInit() {
    const idServicios:any = localStorage.getItem(btoa('servicio'));

    this.idServicio = atob(idServicios);
  }
  datosConsulta:any;
  buscar(action:any){
 
    this.datosConsulta = action.value;
  
    this._empleados.horasComite(this.datosConsulta)
    .subscribe(data=>{ 
 
      if (data == 'no') {
     
        this._alerta.openToast1('LA FECHA DE INICIO ES MENOR A LA DE HOY...', 'bg-danger text-white' , 'ERROR');
      }else if(data == 'noAnio'){
        this._alerta.openToast1('LOS AÑOS DE INICIO Y DE FIN TIENEN QUE SER IGUALES...', 'bg-danger text-white' , 'ERROR');

      }else{
        this._alerta.openToast1('DESCARGANDO EXCEL, ESPERE POR FAVOR...', 'bg-success text-white' , 'ERROR');
        this.exportAsXLSX(data);
      }
    })
   
    }

    reload(){
     location.reload();
     }

     dataExcel:any;
exportAsXLSX(vali:any):void {
 
   this.excelService.exportAsExcelFile(vali, 'Horas_comite' + this.datosConsulta.fechaInicio +'_' + this.datosConsulta.fechaFinal  );

}
   

}
