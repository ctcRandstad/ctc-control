import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbTableDirective } from 'mdb-angular-ui-kit/table';
import { AvisosComponent } from 'src/app/Modales/avisos/avisos.component';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  @ViewChild('table') table!: MdbTableDirective<any>;
  modalRef: MdbModalRef<AvisosComponent> | null = null;

  constructor(
    private _alerta:NotificacionService,
    private excelService:ExcelService,
    private _empleados:EmpleadosService,
    private modalService: MdbModalService
  ) { }
  idServicio:any;
  
  ngOnInit() {
    let ser:any = localStorage.getItem(btoa('servicio'));
    this.idServicio = atob(ser);
  }

  filterQuery:string='';
  dataSource:any=[];
  mostrarTabla:boolean=false;
  buscar(action:any){
   
    this._empleados.getSolicitudesData(action.value)
    .subscribe(resp=>{ 

      if (resp != 'nada') {
        this.dataSource = resp;
        this.mostrarTabla=true;
       } else {
        alert('No se han encontrado solicitudes en las fechas seleccionadas.');
        this.dataSource = [];
       this.mostrarTabla=false;
       }
    });
    
  }


  sms:any
  verSms(id:any, item:any){ 
    this._empleados.verSms(id)
    .subscribe(data=>{ 
      if (data == 'nada') {
        alert('Sin mensajes guardados.')
      } else {
        this.sms = data;
        console.log(this.sms);
        this.modalRef=  this.modalService.open(AvisosComponent, {
          animation: true,
          backdrop: true,
          modalClass: 'modal-xl',
          data: {
            items: this.sms,
            empleado: item.nombre
          },
        })
       
        
      }
    });
     
  }

  
  search(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.table.search(searchTerm);
  }


  exportAsXLSX():void {

    if (this.dataSource) {
      this.excelService.exportAsExcelFile(this.dataSource, 'Solicitudes');
    }else{
      this._alerta.openToast1('No hay datos para mostrar', 'bg-danger text-white' , 'Error de búsqueda')
    }
   
      
    }


}

