import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdbTableDirective } from 'mdb-angular-ui-kit/table';
import { Empleado } from 'src/app/Models/emplados';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';

@Component({
  selector: 'app-papelera',
  templateUrl: './papelera.component.html',
  styleUrls: ['./papelera.component.css']
})
export class PapeleraComponent implements OnInit {
  @ViewChild('table') table!: MdbTableDirective<any>;
  constructor(
    private _empleados:EmpleadosService,
    private _alerta:NotificacionService,
    private ruta:Router,
    private excelService:ExcelService,

  ) { }
  idServicio:any;
  
  ngOnInit() {
    let ser:any = localStorage.getItem(btoa('servicio'));
    this.idServicio = atob(ser);
    this.getEmpleadosActivos();
  }

  filterQuery="";
  data:any;
  dataTotal:any;
  dataSource:any;
  loading:boolean = true;
  getEmpleadosActivos(){
   this._empleados.getEmplaedosBaja(this.idServicio)
   .subscribe(resp=>{

     if (resp != 'error') {
       this.dataSource = resp;
       this.dataTotal = this.dataSource.length;
       setTimeout(()=>{
        this.loading = false
      },2000)
     } else {
      this.dataSource = [];
       this.dataTotal = 0;
     }
     
   })
  }


  search(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.table.search(searchTerm);
  }


  verEmpleado:boolean=false;
  employees:any=[];
  empleado(item:any){
    this.verEmpleado=true;
    this.employees = item;    
    
  }

  salir(){
    this.verEmpleado=false;
    this.filterQuery="";
    this.altaUser = false;
  }

  nombre:any;
  apellidos:any;
  id:any;
  turno:any;
  altaUser:boolean=false;
  modal(item:any){
    this.altaUser = true;
    this.nombre = item.nombre;
    this.apellidos = item.apellidos;
    this.id = item.nEmpleado;
    this.turno = item.turno;

  }


  fecha:any;
  btn:boolean = false;
  alta(id:any){
    let conf = confirm('¿Seguro?');
   
    if (conf) {
      this.btn = true;
   let alta =    this._empleados.altaEmpleados(id.value)
      .subscribe(resp=>{
     
        if (resp== 'success') {
        
        
          this._alerta.openToast1('Operario dado de alta!' , 'bg-success text-white' ,'Recuperar operario');
          this.btn = false;
        setTimeout(()=>{
          this.ruta.navigate(['/Empleados/Perfil' , id.value.nEmpleado])
        },1000)
      } else {
        alert('Error a dar de alta el operario' + this.nombre + ' ' + this.apellidos);
        this.btn = false;
      }
    });
    
    // setTimeout(()=>{
    //   alta.unsubscribe();
    //   this.btn = false;
    //     alert('Error a dar de alta el operario' + this.nombre + ' ' + this.apellidos);
    // },3000)
    
  } else {
    this.fecha=null;
  }
    
    

  }



  dataE:any;
  exportAsXLSX():void {
    this._empleados.getEmplaedosBajaE()
    .subscribe(data=>{ 
   this.dataE  = data;
    this.excelService.exportAsExcelFile(this.dataE, 'Empleados_papelera');
    });

     
   }

}
