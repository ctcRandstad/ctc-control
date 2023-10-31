import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective } from 'mdb-angular-ui-kit/table';
import { EmpleadosService } from 'src/app/Services/empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  @ViewChild('table') table!: MdbTableDirective<any>;
  constructor( private _empleados:EmpleadosService,) { }

tipoUsuario:any;
idServicio:any;
  
verEmpleado:boolean=false;
  ngOnInit() {
    let ser:any = localStorage.getItem(btoa('servicio'));
    let rol:any = localStorage.getItem('rol');
   
    this.idServicio = atob(ser);
    this.tipoUsuario = atob(rol);
    this.getEmpleadosActivos();
    this.getTexto();
    console.log(this.idServicio);
    
  }

  filterQuery="";
  dataSource:any;
  dataTotal:any;
  getEmpleadosActivos(){
   this._empleados.getEmplaedosActivos(this.idServicio)
   .subscribe(resp=>{

     if (resp != 'error') {
       this.dataSource = resp;
       this.dataTotal = this.dataSource.length;
     } else {
      this.dataSource = [];
      this.dataTotal = 0;
     }
     
     
   })
  }

  contratos1:any;

  
texto:any;
url:any;
  getTexto():void{

    this._empleados.getTexto(this.idServicio)
    .subscribe(data=>{ 
      Object.entries(data).forEach(item => {
        this.texto =   item[1].texto;
        this.url =   item[1].url;
         });
    });
  
  }

  exportAsXLSX(admin:any):void {
    // this._empleados.getContratosA(this.idServicio)
    // .subscribe(data=>{
    
    //   if (data != 'error') {
    //     this.contratos1 = data;
       
       
    //     admin.show();
    //   } else {
    //     alert('Error en los  contratos.')
    //   }
      
    // })
     
   }
   encar:any;
   turnos1:any;
   excelencar(encar:any){

    // this._empleados.getTurnos1A(this.idServicio)
    // .subscribe(data=>{
      
    //   if (data != 'error') {
    //     this.turnos1 = data;
    //     this.encar=encar;
       
    //     this.encar.show();
    //   } else {
    //     alert('Error en los  turnos.')
    //   }
      
    // })
   }

   search(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.table.search(searchTerm);
  }

}
