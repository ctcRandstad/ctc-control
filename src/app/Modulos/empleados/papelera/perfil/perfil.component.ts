import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/Models/emplados';
import { Puestos } from 'src/app/Models/puestos';
import { Turnos } from 'src/app/Models/turnos';
import { ConfigService } from 'src/app/Services/config.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(
    private _route : ActivatedRoute,
    private ruta : Router,
    private _alerta:NotificacionService,
    private _empleados:EmpleadosService,
    private _config:ConfigService,


  ) { }


  id:any
  employees:any;
  loader:boolean=false;
  idServicio:any;

  ngOnInit() {
    let ser:any = localStorage.getItem(btoa('servicio'));
    this.idServicio = atob(ser);

    this.getTurnos();
    this.getPuesto();
    this.getContrato();
    this.getConvenio();
  
    this.id = this._route.snapshot.paramMap.get('id');

    this._empleados.consultaEmpleadoPerfil(this.id)
    .subscribe(data=>{ 
  this.employees   = data;
       setTimeout(()=>{
   this.loader = true;
       },2000)
    });
    
  }
  volverPerfil(){
  this.ruta.navigate(['./Empleados/Empleados'])
  }

  
  pu:any;
  eP:boolean = false;
  tAsigando:any;
  editarTurno(turno:any){
    this.tAsigando = turno
    
  
    this.eP=true;
  }

  check(event:any){
    console.log(event.target.value);
    

    this.tAsigando = event.target.value;
  }


  btnEditar:boolean=false;
  edirPuesto(pue:any,descripcion:any){
    if (!this.tAsigando) {
      this._alerta.openToast1('Está asignando el mismo turno...', 'bg-danger text-white' , 'ERROR');
      this.employees.turno = pue.value.turnos;
      
    }else{
      this.btnEditar = true;
      this._empleados.editarSoloTurno(pue.value)
      .subscribe(res=>{ 
       if (res == 'errorFecha') {
       
         this.employees.turno = pue.value.turnos;
        this._alerta.openToast1('Debes seleccionar una fecha posterior. Para cambiar fechas anteriores, utiliza la pestaña CONTROL HORARIO.' , 'bg-danger text-white' , 'ERROR');
        this.btnEditar = false;
       }else  if (res == 'success') {
        this._empleados.getTurnosById(pue.value.turno)
        .subscribe(data=>{ 
     
        this.employees.descripcion=data.descripcion;
        });
        
          this.btnEditar = false;
        } else if(res == 'baja'){
          this.employees.turno = pue.value.turnos;
          this._alerta.openToast1('ERROR: El operario/a tiene activa una justificación en la fecha de cambio de turno.' , 'bg-danger text-white' , 'ERROR');
          this.btnEditar = false;

        }else{
          this.employees.turno = pue.value.turnos;
          this._alerta.openToast1('ERROR: No se puedo generar la plantilla...' , 'bg-danger text-white' , 'ERROR');
          this.btnEditar = false;

        }
      });

    }
    
  }

  fechaCambio:any;
  fechaFin:any;
  hide(puestoC:any){

  
    this.btnEditar = false;
    this.fechaCambio = null;
    this.fechaFin = null;

  }

  turnos:any;
  getTurnos(){
    this._empleados.getTurnos(this.idServicio)
    .subscribe(data=>{
      
      if (data != 'error') {
        this.turnos = data;
      } else {
        alert('Error en los  turnos.')
      }
      
    })
  }
  puestos:any;
  getPuesto(){
    this._empleados.getPuestos(this.idServicio)
    .subscribe(data=>{
      if (data != 'error') {
        this.puestos = data;
      } else {
        alert('Error en los  Puestos de trabajos.')
      }
      
    })
  }

  contratos:any;
   getContrato(){
    this._config.getListadoContarto(this.idServicio)
    .subscribe(data=>{
    
      
      if (data != 'error') {
        this.contratos = data;
      } else {
        alert('Error en los  contratos.')
      }
      
    })
  }

  horaConvenios:any;
   getConvenio(){
    this._empleados.getConvenio(this.idServicio)
    .subscribe(data=>{

      if (data != 'error') {
        this.horaConvenios = data[0].horasAnuales;
        // console.log(this.horaConvenios);
      } else {
        alert('Error en los  convenios.')
      }
      
    })
  }
  hideTurno(puestoC:any,employees:any){
    this.employees.turno = employees
       this.btnEditar = false;
       this.fechaCambio = null;
       this.fechaFin = null;
       this.pu.hide();
       puestoC.hide();
     }
   

     bot:boolean=false;

     aeditarPersonal(editOperario:any){
       this.employees =  editOperario.value;
       
       this.bot=true;
        this._empleados.editarEmpleados(this.employees)
        .subscribe(data=>{
         
          if (data == 'success') {
          this._alerta.openToast1('Operario editado!' , 'bg-success text-white' ,'Editar oprario');

   
           this.bot=false;
             
          } else {
            alert('Error en editar al trabajador!')
          }
        }) 
       
     }

     nEmpleado:any;
     nEmpleado1:any;
     error:boolean=false;
     consultaEmpleado(nEmplea:any){
   
       this.nEmpleado =nEmplea.value;
       const empleado = parseInt(this.nEmpleado)
   
       if(empleado != this.nEmpleado1){
         this._empleados.consultaEmpleado(this.nEmpleado)
         .subscribe(data=>{
           if (data== true) {
             this.error = true;
           } else {
             this.error = false; 
           }
         })
       }else{
         // console.log('iguales');
         
       }
       
     }

     turno:any
     cambio(event:any){
       
       this.turno = event.target.value;
     }
     puesto:any
     cambioPuesto(event:any){
       
       this.puesto = event;
   
   
     }

}