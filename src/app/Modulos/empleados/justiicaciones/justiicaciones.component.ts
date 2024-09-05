import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbTableDirective } from 'mdb-angular-ui-kit/table';
import { EliminarModalComponent } from 'src/app/Modales/eliminar-modal/eliminar-modal.component';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';

@Component({
  selector: 'app-justiicaciones',
  templateUrl: './justiicaciones.component.html',
  styleUrls: ['./justiicaciones.component.css']
})
export class JustiicacionesComponent implements OnInit {

  @ViewChild('table') table!: MdbTableDirective<any>;
  modalRef: MdbModalRef<EliminarModalComponent> | null = null;


  constructor( 
    private _empleados:EmpleadosService,
    private _control:ControlHorasService,
    private _alerta:NotificacionService,
    private excelService:ExcelService,
    private modalService: MdbModalService,
    private ruta:Router,

    ) { }

  filterQuery:string='';
  tipoUsuario:any;
  idServicio:any;
  ngOnInit() {
    let ser:any = localStorage.getItem(btoa('servicio'));
    let rol:any = localStorage.getItem('rol');
   
    this.idServicio = atob(ser);
    this.tipoUsuario = atob(rol);
    if (this.tipoUsuario == 'E2020') {
      this.ruta.navigate(['Empleados']);
      return;
    }
    this.getJustifEmpleados(this.valor);
    this.getJustificacion();
  }
  dataJu:any;
  selectedValueJu=''
  options =  { value: '5000', label: 'Resetear Filtros' }
   
  
  getJustificacion(){
    this._empleados.getJustificacion( this.idServicio)
      .subscribe(data=>{

        if (data) {
          this.dataJu =  data;
          this.dataJu.push(this.options)
        } 
        
     
        })
   }
   idJu:number=0;
   getSelectedValueJu(event:any) {


    
  
    this.idJu =event;
    if (this.idJu == 5000) {
      this.getJustifEmpleados(1);
     
      setTimeout(()=>{
        this.selectedValueJu='';
      },100)
    }else{
      
          this._empleados.getJustificacionByIdEmpleados(this.idJu,this.idServicio)
          .subscribe(data=>{ 
        //  console.log(data);
         
            if (data == 'error') {
             alert('No hay datos con la justificación seleccionada');
             this.selectedValueJu='';
             this.getJustifEmpleados(1);
            } else {
             this.dataSource = data;
             this._empleados.getJustificacionByIdEmpleadosTotal(this.idJu)
             .subscribe(data=>{ 
             this.dat = data;
             console.log(this.dat);
             this.dataTotal = this.dat;
             });
            }  
          });      
       }
   }

   search(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.table.search(searchTerm);
  }


  data:any;
  dataSource:any;
  dataTotal:any;
  valor:number=1;
  loading:boolean = true;
  getJustifEmpleados(valor:any){
    this.dataSource = [];
    this.dataTotal = 0;
    if (valor == 0) {
      this.valor= 1;
    }else if(valor == 1){
      this.valor= 0;
      this._empleados.getJustifEmpleados(this.valor,this.idServicio)
      .subscribe(resp=>{
        if (resp != 'nada') {
          this.dataSource = resp;
          this.countJust();
          setTimeout(()=>{
            this.loading = false
          },2000)
         } else {
           this.dataSource = [];
           this.dataTotal = 0;
         }
         
       })
    }  
  }

  buscar(data:any){
   
    this._empleados.getJustifEmpleadosData(data.value)
    .subscribe(resp=>{ 
    
      if (resp != 'nada') {
        this.dataSource = resp;
        // this.countJust();
       } else {
        alert('No se han encontrado justificaciones en las fechas seleccionadas.');
        this.dataSource = [];
        this.dataTotal = 0;
       }
    });
    
  }
  
  dat:any;
  countJust(){
    this._empleados.getCountJust(this.idServicio)
    .subscribe(data=>{
     
   this.dat = data;
    this.dataTotal = this.dat.length;
    });
  }


  idJustificacion:number=0;
  plus:number=0;
  addChangeJu(value:any){
    
    let nombres = value.split("-");

    this.idJustificacion = nombres[0];
    this.plus = nombres[1];
 }



 salir(){
   this.idJustificacion = 0;
   this.cambio.hide();
 }



 borrar(nEmpleado:any,fechaInicioJ:any , fechaFinJ:any,nombre:any,apellidos:any,idJE:any  ,basicModal:any){
    this.nEmpleado = nEmpleado;
    this.fechaInicioJ = fechaInicioJ;
    this.fechaFinJ = fechaFinJ;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.idJE = idJE;
    this.modalService.open(EliminarModalComponent, {
      containerClass: 'right',
      modalClass: 'modal-side modal-top-right',
      ignoreBackdropClick: true,
      data: {
        eliminar:3,
        justi:  this.just,
        nombre: this.nombre,
        apellidos:  this.apellidos,
        nEmpleado:  nEmpleado,
        fechaInicioJ:  fechaInicioJ,
        fechaFinJ:  fechaFinJ,
        idJE:  idJE,
        idServicio:  this.idServicio,
       
       
      },
    });
  
  }

  
  



      borar1(nEmpleado:any,idJE:any,fechaInicioJ:any , fechaFinJ:any  ,nombre:any, apellidos:any){
        this.idJE = idJE;
        this.nEmpleado = nEmpleado;
        this.fechaInicioJ = fechaInicioJ;
        this.fechaFinJ = fechaFinJ;
        this.modalService.open(EliminarModalComponent, {
          containerClass: 'right',
          modalClass: 'modal-side modal-top-right',
          ignoreBackdropClick: true,
          data: {
            eliminar:9,
           
            nombre: nombre,
            apellidos:  apellidos,
            nEmpleado:  nEmpleado,
            fechaInicioJ:  fechaInicioJ,
            fechaFinJ:  fechaFinJ,
            idJE:  idJE,
            idServicio:  this.idServicio,
           
           
          },
        });
      }
  
  just:any;
  cambio:any;
  detallesJ:string='';
  modal:any;
  async func2(cambio:any,nEmpleado:any , nombre:any,apellidos:any,detallesJ:any,fechaInicioJ:any , fechaFinJ:any,idJE:any){
   
    this.detallesJ = detallesJ;
    this.cambio = cambio;
    this.nEmpleado = nEmpleado;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.fechaInicioJ = fechaInicioJ;
    this.fechaFinJ = fechaFinJ;
    this.idJE = idJE;
    this._control.getJustificaciones(this.idServicio)
    .subscribe(just=>{ 
      this.just = just;
    this.modal =  this.modalService.open(EliminarModalComponent, {
        containerClass: 'right',
        modalClass: 'modal-side modal-top-right',
        ignoreBackdropClick: true,
        data: {
          eliminar:1,
          justi:  this.just,
          nombre: this.nombre,
          apellidos:  this.apellidos,
          nEmpleado:  nEmpleado,
          fechaInicioJ:  fechaInicioJ,
          fechaFinJ:  fechaFinJ,
          idJE:  idJE,
          idServicio:  this.idServicio,
          detallesJ:detallesJ
         
        },
      });
      this.modal.onClose.subscribe((message: any) => {
        if(message == 'success'){
         setTimeout(()=>{
          location.reload();
         },500);
 
        }
     });
    });
 
    
    
    
    
  }
  
  
  nEmpleado:number=0;
  frame:any;
  idJE:number=0;
  nombre:string='';
  apellidos:string='';
  fechaInicioJ:any;
  fechaFinJ:any;
  basicModal:any;
  darAlata(nEmpleado:any,idJE:any,nombre:any,apellidos:any, frame:any){
    this.nEmpleado = nEmpleado;
    this.idJE = idJE;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.modalService.open(EliminarModalComponent, {
      containerClass: 'right',
      modalClass: 'modal-side modal-top-right',
      ignoreBackdropClick: true,
      data: {
        eliminar:2,
        justi:  this.just,
        nombre: this.nombre,
        apellidos:  this.apellidos,
        nEmpleado:  nEmpleado,
       
        idJE:  idJE,
        idServicio:  this.idServicio,
       
       
      },
    });
  }
  


  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.dataSource, 'Justificaciones');
    // this._empleados.getJustifEmpleados(this.valor ,this.idServicio)
    // .subscribe(resp=>{
 
    //   if (resp != 'nada') {
    //     // this.data = resp;
    //     this.countJust();
    //    } else {
    //      this.data = [];
    //      this.dataTotal = 0;
    //    }
       
    //  })
      
    }

  
  


}
