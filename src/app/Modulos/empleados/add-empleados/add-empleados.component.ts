import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/Models/emplados';
import { ConfigService } from 'src/app/Services/config.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';

@Component({
  selector: 'app-add-empleados',
  templateUrl: './add-empleados.component.html',
  styleUrls: ['./add-empleados.component.css']
})
export class AddEmpleadosComponent implements OnInit {

  constructor(
    private _empleados:EmpleadosService,
    private ruta:Router,
    private _config:ConfigService,
    ) { }

  idServicio:any;
  ngOnInit() {
    let ser:any = localStorage.getItem(btoa('servicio'));
  
   
    this.idServicio = atob(ser);
    this.getTurnos();
    this.getPuesto();
    this.getContratos();
    this.getNEmpleado();
    this.getConvenios();
  }

  turnos :any;
  getTurnos(){
    this._empleados.getTurnos(this.idServicio)
    .subscribe(data=>{
      if (data != 'error') {
        this.turnos = data;
      } else {
        alert('Error en los  turnos::::')
      }
      
    })
  }

  numeroE:number=0
  getNEmpleado(){
    this._empleados.getNumeroE()
    .subscribe(res=>{
    
      this.numeroE = res;
    })
  }
  puestos:any;
  getPuesto(){
    this._empleados.getPuestos(this.idServicio)
    .subscribe(data=>{
      if (data != 'error') {
        this.puestos = data;
      } else {
        alert('Error en los  Puestos de trabajos::::')
      }
      
    })
  }

  agregarEmpleado:any;
  bot:boolean=false;
  addPersonal(action:any){
    this.bot=true;
    this.agregarEmpleado = action.value
    this._empleados.addEmpleados(this.agregarEmpleado).subscribe(res=>{
   
      if (res == 'success') {
        this._empleados.addEmpleadosCalendarioNuevo(this.agregarEmpleado)
        .subscribe(()=>{
          
        })
        this.bot=false;
        // this.alerta.success('Empleado agregado con exitos');
        setTimeout(()=>{

          this.ruta.navigate(['../Empleados/Empleados'])
        },1500)
      } else {
        //  this.alerta.error('Error al ingresar empleado nuevo');
         this.bot = false;
      }
    })
    
  }

  nEmpleado:number=0;
  error:boolean=false;
  consultaEmpleado(nEmplea:any){
   this.nEmpleado =nEmplea.value;
    
    this._empleados.consultaEmpleado(this.nEmpleado)
    .subscribe(data=>{
      if (data== true) {
        this.error = true;
      } else {
        this.error = false;
        
      }
      
    })
    
  }


  turno:any
  cambio(event:any){
    console.log(event);
    
    
    this.turno = event;
  }
  puesto:any
  cambioPuesto(event:any){
    
    this.puesto = event;
  }
  contrato:any
  cambioContrato(event:any){
   
    this.contrato = event;
  }
  convenio:any
  cambioConvenio(event:any){
    this.convenio = event;

  }

  bocadillo:any
  bocadi(event:any){
    this.bocadillo = event;

  }

  contratos:any=[];
  getContratos(){
    this._config.getListadoContarto(this.idServicio)
    .subscribe(data=>{
      if (data != 'error') {
        this.contratos = data;
      } else {
        alert('Error en los  turnos::::')
      }
      
    })
  }
  convenios:any = [];
  getConvenios(){
    this._empleados.getConvenio(this.idServicio)
    .subscribe(data=>{
      
      if (data != 'error') {
        this.convenios = data;
      } else {
        alert('Error en los  turnos::::')
      }
      
    })
  }
}
