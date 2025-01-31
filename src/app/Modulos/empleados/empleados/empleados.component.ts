import { supportsScrollBehavior } from '@angular/cdk/platform';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbTableDirective } from 'mdb-angular-ui-kit/table';
import { BajaModalComponent } from 'src/app/Modales/baja-modal/baja-modal.component';
import { UbicarModalComponent } from 'src/app/Modales/ubicar-modal/ubicar-modal.component';
import { Empleado } from 'src/app/Models/emplados';
import { ConfigService } from 'src/app/Services/config.service';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  @ViewChild('table') table!: MdbTableDirective<any>;
  modalRef: MdbModalRef<BajaModalComponent> | null = null;

  ubicar : MdbModalRef<UbicarModalComponent> | null = null;

  constructor( 
    private _empleados:EmpleadosService,
    private _alerta:NotificacionService,
    private modalService: MdbModalService,
    private _config:ConfigService,
    private _control:ControlHorasService,
    private excelService:ExcelService,
    ) { }

tipoUsuario:any;
idServicio:any;
  
verEmpleado:boolean=false;
  ngOnInit() {
    let ser:any = localStorage.getItem(btoa('servicio'));
    let rol:any = localStorage.getItem('rol');
   
    this.idServicio = atob(ser);
    this.tipoUsuario = atob(rol);
    this.getEmpleadosActivos();
    this.getTurnos();
    this.getPuesto();
    this.getContrato();
    this.getConvenio();
    // this.files = [];
    this.bajaTotal();
    this.getTexto();
    this.getDocu1();
    
   
  }

  filterQuery="";
  dataSource:any;
  dataTotal:any;
  loading:boolean = true;
  getEmpleadosActivos(){
   this._empleados.getEmplaedosActivos(this.idServicio)
   .subscribe(resp=>{

     if (resp != 'error') {
       this.dataSource = resp;
       this.dataTotal = this.dataSource.length;
       setTimeout(()=>{
        this.loading=false;
       },2000);
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



  search(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this._empleados.buscador(searchTerm)
    .subscribe(data =>{
      if (data != 'error') {
        this.dataSource = data;
      }
     
    })
    
  }


  
  reset(nEmpleado:any){
    let a = confirm('¿Quire resetear la contraseña?');
    if (a) {
      this._empleados.reset(nEmpleado)
      .subscribe(data=>{ 
   
        if (data == 'success') {
          this._alerta.openToast1('Contraseña reseteada a:  "1234" ' , 'bg-success text-white' ,'Reseteo de contraseña');
          // this.getPuestosAsignados(nEmpleado);
        } else {
          this._alerta.openToast1('Error al resetear la contraseña', 'bg-danger text-white' ,'Reseteo de contraseña');     
        }
      });
    }
  }


  async modal( item:any){
 
    this.modalRef = await new Promise((resolve)=>{
      this.modalService.open(BajaModalComponent, {
        containerClass: 'right',
        modalClass: 'modal-side modal-top-right',
        ignoreBackdropClick: true,
        data: {
          nombre:item.nombre,
          apellidos:item.apellidos,
          nEmpleado:item.nEmpleado
        },
      });
    }) 
  }


  

  bajaTotal(){
    this._empleados.bajaTotal()
    .subscribe(res=>{ 
     
      this.getEmpleadosActivos();
    });
  }
  

  
  
  

    employees!:Empleado;
    editar:boolean =false;
    hoy:any;
    day:any;
    month:any;
    year:any;
    justificacion:string ='Seleccione una justificación';
    horasInicio:number=0;
    vaciones:number=0;
    vacionesT:number=0;
    vacacionesTotal:number=0;
    resVacaciones:number=0;
    fechas:any;
    edad:any;
    emp_numero:number=0;
    suma:number=0;
    minimo:number=0;
    maximo:number=0;
    ape:string='';
    coment:string='';
    estado:boolean=false;
    empleado(item:any){
     this.emp_numero = item.nEmpleado;
     this.getDocu(this.emp_numero);
     this.ape = item.apellidos;
     this._empleados.antiguedad(item.nEmpleado) 
     .subscribe(data=>{ 
          this.hoy = data.meses / 12 ;
          this._empleados.getDiasVacaciones(item.nEmpleado) 
           .subscribe(resp=>{ 
            if (resp) {
              console.log(resp);
              
              this.vaciones = resp.vacaciones;
              this.vacionesT = resp[1];
              this.vacacionesTotal = resp[2];
              this.maximo = resp[3];
              this.minimo = resp[4];
            
              this.resVacaciones = this.vacacionesTotal - this.vacionesT;
              this.resVacaciones = this.resVacaciones * 8;
             this.suma =   this.totalHTeoricas - this.horaConvenios + this.totalHTrabajadasBolsa - this.resVacaciones
             if (this.suma > this.minimo && this.suma < this.maximo) {
              this.estado =false;
             }else{
              this.estado =true;
             }
             
            } else {
              this.vaciones = 0;
            }
           });  
     }); 
      
  this.verEmpleado=true;
  this.employees = item;
 
      this._empleados.consultaEmpleadoHoras(this.employees.nEmpleado)
      .subscribe(data=>{ 
      this.horasInicio = data.horasTeoricas ;
      this.year=data[1];
      });
      this.getTeoricas();
  
    // console.log( this.employees.fechaNacimiento);
    let momentoActual = new Date();
    this.fechas = momentoActual.getFullYear() + '-' + (momentoActual.getMonth()+ 1) + '-' + momentoActual.getDate();
    // console.log(this.fechas);
    let fecha1 = new Date(this.employees.fechaNacimiento);
  let fecha2 = new Date()
  let resta = fecha2.getTime() - fecha1.getTime()
   this.edad = Math.trunc(resta/ (1000*60*60*24*365));
   
      this.fecha();
      this.getCom(this.employees.nEmpleado , this.anio);
      this.getPuestosAsignados(this.employees.nEmpleado);
    }
  
    
  
    puestosAsignados:any;
    getPuestosAsignados(nEmpleado:number){
       this._empleados.getPuestosAsignados(nEmpleado)
       .subscribe(data=>{ 
         if (data != 'error') {
           this.puestosAsignados = data; 
         } else {
          this.puestosAsignados=null;
         }
       });
    }
    
    
    getCom(nEmpleado:number, year:any){
      this._empleados.comentarios(nEmpleado,year)
      .subscribe(co=>{ 
      
        if (co !=undefined || co != null) {
          this.coment = co.com;
        }else{
          this.coment = '';
        }
      });
    }
    
  
    
    turnos!:any;
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
    puestos!:any;
    getPuesto(){
      this._empleados.getPuestos1(this.idServicio)
      .subscribe(data=>{
      
        if (data != 'error') {
          this.puestos = data;
        } else {
          alert('Error en los  Puestos de trabajos.')
        }
        
      })
    }
  
    edit(){
      this.editar = true;
        this.nEmpleado1 = this.employees.nEmpleado;
        this.justifi(this.employees);
    }
  
    contratos!:any;
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
  
    horaConvenios:number=0;
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
  

  
    eP1:boolean = false;
    justifi(employees:any){
      this.getJusticaciones();
      this.employees = employees;
      this.eP1=true;
      
    }
  
    just:any;
    getJusticaciones(){
     this._control.getJustificaciones(this.idServicio)
     .subscribe(just=>{ 
     this.just = just;
     });
    }

    turno:any
    cambio(event:any){
      
      this.turno = event.target.value;
    }
    puesto:any
    cambioPuesto(event:any){
      
      this.puesto = event;
  
  
    }
    
    bot:boolean=false;
  
    aeditarPersonal(editOperario:any,descripcion:any){
      this.employees =  editOperario.value;
      this.employees.descripcion = descripcion
      this.bot=true;
       this._empleados.editarEmpleados(this.employees)
       .subscribe(data=>{
  
         if (data == 'success') {
          this._alerta.openToast('¡Operario editado!' , 'bg-success text-white' ,'Editar oprario')
  
            // console.log(this.employees.puesto_id);
            this._empleados.consultaPuesto(this.employees.puesto_id)
            .subscribe(res=>{
             
             this.employees.descripcionPuesto = res.descripcionPuesto; 
            })
            this._empleados.consultaContrato(this.employees.contrato)
            .subscribe(res=>{
  
             
             this.employees.empresa = res.empresa; 
            })
            
           this.volverPerfil(this.employees);
          //  console.log(this.employees);
           
           this.getEmpleadosActivos();
         } else {
           alert('Error en editar al trabajador!')
         }
       }) 
      
    }
  
    nEmpleado:any;
    nEmpleado1:any;
    error:boolean=false;
    consultaEmpleado(nEmplea:any){
  
      this.nEmpleado =nEmplea;
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
  
    volverPerfil(employees:any){
        this.editar = false;
    }
  
  
    fechaCambio:any;
    fechaFin:any;
    hide(puestoC:any){
  
      this.getEmpleadosActivos();
      this.bot=false;
      this.editar = false;
      this.btnEditar = false;
      this.fechaCambio = null;
      this.fechaFin = null;
      this.vacaData=null;
      this.vacaciones=false;
    
     
    }
    hideTurno(puestoC:any,employees:any){
   this.employees.turno = employees
      this.getEmpleadosActivos();
      this.bot=false;
      this.editar = false;
      this.btnEditar = false;
      this.fechaCambio = null;
      this.fechaFin = null;
      this.vacaciones=false;
      this.vacaData=null;
    
     
    }
  
    hides(puestoC:any){
  
      this.bot=false;
      this.editar = false;
      this.btnEditar = false;
      this.fechaCambio = null;
    
     
    }
    addChangeJu(value:any){
     
       this.employees.idJustificacion = value.target.value;
    }
  
    addJus(addJ:any){
      this.btnEditar = true;
  
     this._empleados.addJusti(addJ.value)
    .subscribe(data=>{ 
     
       if (data == 'baja') {
        this._alerta.openToast('ERROR: El empleado ya tiene una justificación activa asignada en el rango de fecha seleccionada.' , 'bg-danger text-white' , 'ERROR');
        this.fechaCambio=null;
       this.fechaFin=null;
       this.btnEditar = false;
        return;
       }
    
     if (data == 'success') {
       this._alerta.openToast1('Justificación asignada' , 'bg-success text-white' , 'Justificación');
       this.fechaCambio=null;
       this.fechaFin=null;
      this.btnEditar = false;
      this.editar = false;
      
     } else {
      this._alerta.openToast1('ERROR: Justificación no asignada' , 'bg-danger text-white' , 'ERROR');
      this.fechaCambio=null;
       this.fechaFin=null;
       this.btnEditar = false;
     }
  });   
    }
  
  

    eP:boolean = false;
    tAsigando:any
    
    vacaData:any;
    vacacionesTurnos(data:any ,nEmpleado:any){
      
      this._empleados.vacacionesTurno(data , nEmpleado)
      .subscribe(data=>{ 
        
        if (data != 'error') {
          this.vacaciones=true;
          this.vacaData = data;
        } else {
          this.vacaciones=false;
          
        }
      });
      
    }
    
    descargas(nEmpleado:number){
      this.excelService.exportAsExcelFile(this.vacaData , 'vacaciones ' + nEmpleado)
    }

    check(event:any){
      console.log(event.target.value);
      

      this.tAsigando = event.target.value;
    }

    
    btnEditar:boolean=false;
    vacaciones:boolean=false;
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
           this.editar = false;
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
  
    salir(){
      this.dataSource=[];
      this.getEmpleadosActivos();
      this.getTurnos();
      this.getPuesto();
      this.getContrato();
      this.getConvenio();
      this.verEmpleado=false;
      this.filterQuery="";
      this.totalHTeoricas=0;
      this.mes=[];
      this.totalHTrabajadas=0;
      this.totalHTrabajadasBolsa=0;
      this.mesTraBolsa=[];
      this.totalParoAnterior=0;
      this.totalParoActual=0;
      this.mesTra=[];
      this.mesFe=[];
      this.mesMar=[];
      this.mesAbr=[];
      this.mesMay=[];
      this.mesJun=[];
      this.mesJul=[];
      this.mesAgo=[];
      this.mesSet=[];
      this.mesOct=[];
      this.mesNov=[];
      this.mesDic=[];
      // teóricas
     this.mesTra1=[];
     this.mesFe1=[];
     this.mesMar1=[];
     this.mesAbr1=[];
     this.mesMay1=[];
     this.mesJun1=[];
     this.mesJul1=[];
     this.mesAgo1=[];
     this.mesSet1=[];
     this.mesOct1=[];
     this.mesNov1=[];
     this.mesDic1=[];
      this.controlB = false;
      // console.log(this.mes);
    }
  
    //control horario..a
     meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  mes:any[]=[];
  mesTraBolsa:any[]=[];
  totalHTeoricas:number=0;
  totalHTrabajadas:number=0;
  totalHTrabajadasBolsa:number=0;
  totalParoAnterior:number=0;
  totalParoActual:number=0;
  paroAnterior:any[]=[];
  paroActual:any[]=[];
  // horas trabajadas
  
  mesTra:any[]=[];
  mesFe:any[]=[];
  mesMar:any[]=[];
  mesAbr:any[]=[];
  mesMay:any[]=[];
  mesJun:any[]=[];
  mesJul:any[]=[];
  mesAgo:any[]=[];
  mesSet:any[]=[];
  mesOct:any[]=[];
  mesNov:any[]=[];
  mesDic:any[]=[];
  
  // horas teóricas
  
  mesTra1:any[]=[];
  mesFe1:any[]=[];
  mesMar1:any[]=[];
  mesAbr1:any[]=[];
  mesMay1:any[]=[];
  mesJun1:any[]=[];
  mesJul1:any[]=[];
  mesAgo1:any[]=[];
  mesSet1:any[]=[];
  mesOct1:any[]=[];
  mesNov1:any[]=[];
  mesDic1:any[]=[];
  
  // boolean
  
  
  mesTraB:boolean=false;
  mesFeB:boolean=false;
  mesMarB:boolean=false;
  mesAbrB:boolean=false;
  mesMayB:boolean=false;
  mesJunB:boolean=false;
  mesJulB:boolean=false;
  mesAgoB:boolean=false;
  mesSetB:boolean=false;
  mesOctB:boolean=false;
  mesNovB:boolean=false;
  mesDicB:boolean=false;
     getTeoricas(){
      this.totalHTeoricas=0;
      this.mes=[];
      this.totalHTrabajadas=0;
      this.totalHTrabajadasBolsa=0;
      this.mesTra=[];
      this.mesTraBolsa=[];
      this.totalParoAnterior=0;
      this.totalParoActual=0;
    
      var Navidad = new Date();
      var mes = Navidad.getMonth();
        this._empleados.horasMensual(1,this.employees.nEmpleado)
        .subscribe(data=>{ 
     
           if (mes >= data[0].mes) {
             this.mesTraB = true;
           }
      
        
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesTra1=data;
         
        });  
  
          
        this._empleados.horasMensual(2,this.employees.nEmpleado)
        .subscribe(data=>{ 
         if (mes >= data[0].mes) {
             this.mesFeB = true;
          }
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesFe1=data;
         
        });  
  
          
        this._empleados.horasMensual(3,this.employees.nEmpleado)
        .subscribe(data=>{ 
          if (mes >= data[0].mes) {
            this.mesMarB = true;
         }
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesMar1=data;
         
        });  
  
        this._empleados.horasMensual(4,this.employees.nEmpleado)
        .subscribe(data=>{ 
          if (mes >= data[0].mes) {
            this.mesAbrB = true;
         }
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesAbr1=data;
         
        });  
  
        this._empleados.horasMensual(5,this.employees.nEmpleado)
        .subscribe(data=>{ 
          if (mes >= data[0].mes) {
            this.mesMayB = true;
          }
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesMay1=data;
         
        }); 
  
        this._empleados.horasMensual(6,this.employees.nEmpleado)
        .subscribe(data=>{ 
          if (mes >= data[0].mes) {
            this.mesJulB = true;
          }
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesJun1=data;
         
        }); 
  
        this._empleados.horasMensual(7,this.employees.nEmpleado)
        .subscribe(data=>{ 
          if (mes >= data[0].mes) {
            this.mesJulB = true;
          }
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesJul1=data;
         
        }); 
  
        this._empleados.horasMensual(8,this.employees.nEmpleado)
        .subscribe(data=>{ 
          if (mes >= data[0].mes) {
            this.mesAgoB = true;
          }
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesAgo1=data;
         
        }); 
  
        this._empleados.horasMensual(9,this.employees.nEmpleado)
        .subscribe(data=>{ 
          if (mes >= data[0].mes) {
            this.mesSetB = true;
          }
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesSet1=data;
         
        }); 
  
        this._empleados.horasMensual(10,this.employees.nEmpleado)
        .subscribe(data=>{ 
          this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesOct1=data;
          if (mes >= data[0].mes) {
            this.mesOctB = true;
          }
        }); 
        
        this._empleados.horasMensual(11,this.employees.nEmpleado)
        .subscribe(data=>{ 
          
          this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesNov1=data;
          if (mes >= data[0].mes) {
            this.mesNovB = true;
          }
        }); 
        
        this._empleados.horasMensual(12,this.employees.nEmpleado)
        .subscribe(data=>{ 
        
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesDic1=data;
          if (mes >= data[0].mes) {
            this.mesDicB = true;
          }
        }); 
        
        
    
      
        
  
        // 
        // 
        //  horas trabajada mensuales
        // 
        // 
        this._empleados.horasMensualTrabajada(this.employees.nEmpleado , 1)
        .subscribe(res=>{ 
          
          if (res) {
            this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
            
            this.mesTra= res;
    
      
             
            }
         });
  
         this._empleados.horasMensualTrabajada(this.employees.nEmpleado , 2)
         .subscribe(res=>{ 
           if (res) {
             this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
             this.mesFe= res;
  
             }
          });
  
          this._empleados.horasMensualTrabajada(this.employees.nEmpleado , 3)
          .subscribe(res=>{ 
            if (res) {
              this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
              this.mesMar= res;
   
              }
           });
           this._empleados.horasMensualTrabajada(this.employees.nEmpleado , 4)
           .subscribe(res=>{ 
             if (res) {
               this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
               this.mesAbr= res;
    
               }
            });
            this._empleados.horasMensualTrabajada(this.employees.nEmpleado , 5)
            .subscribe(res=>{ 
              if (res) {
                this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
                this.mesMay= res;
     
                }
             });
             this._empleados.horasMensualTrabajada(this.employees.nEmpleado , 6)
             .subscribe(res=>{ 
               if (res) {
                 this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
                 this.mesJun= res;
      
                 }
              });
              this._empleados.horasMensualTrabajada(this.employees.nEmpleado , 7)
              .subscribe(res=>{ 
                if (res) {
                  this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
                  this.mesJul= res;
       
                  }
               });
               this._empleados.horasMensualTrabajada(this.employees.nEmpleado , 8)
               .subscribe(res=>{ 
                 if (res) {
                   this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
                   this.mesAgo= res;
        
                   }
                });
                this._empleados.horasMensualTrabajada(this.employees.nEmpleado , 9)
                .subscribe(res=>{ 
                  if (res) {
                    this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
                    this.mesSet= res;
         
                    }
                 });
                 this._empleados.horasMensualTrabajada(this.employees.nEmpleado , 10)
                 .subscribe(res=>{ 
                   if (res) {
                     
                     this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
                     this.mesOct= res;
                     
                     }
                    });
                    this._empleados.horasMensualTrabajada(this.employees.nEmpleado , 11)
                    .subscribe(res=>{ 
                      if (res) {
                        this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
                        this.mesNov= res;
           
                      }
                    });
                    this._empleados.horasMensualTrabajada(this.employees.nEmpleado , 12)
                   .subscribe(res=>{ 
                     if (res) {
                      //  console.log(res);
                       this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
                       this.mesDic= res;
                       
                      }
                    });
  
         
       
   // 
        // 
        //  horas trabajada mensuales
        // 
        // 
  
       
       this._empleados.horasMensualTrabajadaBolsa(this.employees.nEmpleado)
       .subscribe(res=>{ 
        //  console.log(res);
         if (res) {
           
           this.mesTraBolsa=res;
           
           for (let i = 0; i < this.mesTraBolsa.length; i++) {
             this.totalHTrabajadasBolsa=this.totalHTrabajadasBolsa+this.mesTraBolsa[i].mesBolsa ;
            //  this.mesTra.push(0);
            }
              let a = this.meses.length - this.mesTraBolsa.length
            for (let i = 0; i < a; i++) {
              // this.totalHTrabajadas=this.totalHTrabajadas+this.mesTra[i].horasTeoricas;
              this.mesTraBolsa.push({mes:0});
             }
             
           }
          // console.log(res);
       });
  
    this.bolsas();
       
      }
  
  
      bolsaHabilitado:boolean=false;
      bolsa:any;
      bolsas(){
        this._empleados.getBolsa(this.idServicio)
        .subscribe(data=>{   
        
          this.bolsa = data;
        if (this.bolsa[0] == 1) {
          this.bolsaHabilitado = true;
        } else {
          this.bolsaHabilitado = false;
        }
        });
        
      }
  
  
      dataE:any;
     
      exportAsXLSX(admin:any):void {
     this._empleados.getEmplaedosActivosE(this.idServicio)
     .subscribe(data=>{
      this.dataE=data;

       this.excelService.exportAsExcelFile( this.dataE, 'Empleados');
     })         
  }
  
       contratosE:any;
       dataExcelContrato:any[]=[];
       getContrato1(co:any){
        //  console.log(tu.value);
         this._empleados.getContratosExcel(co.value)
         .subscribe(data=>{ 
           this.dataExcelContrato = data;
           this.contratosE = null;
           this.excelService.exportAsExcelFile( this.dataExcelContrato, 'Empleados');
        //  console.log( this.dataExcel);
         });
         
       }
  
  
  
       encar:any;
       turnos1:any;
       excelencar(encar:any){
         this.excelService.exportAsExcelFile( this.dataSource, 'Empleados');
        //  this._empleados.getTurnos1A(this.idServicio)
        //  .subscribe(data=>{
           
        //    if (data != 'error') {
        //      this.turnos1 = data;
        //     this.encar=encar;
           
        //     this.encar.show();
        //   } else {
        //     alert('Error en los  turnos.')
        //   }
          
        // })
       }
  
       turnosE:any;
       dataExcel:any[]=[];
       getTurno(tu:any){
       
         this._empleados.getTurnosExcel(tu.value)
         .subscribe(data=>{ 
          
           this.dataExcel = data;
           this.turnosE = null;
           this.excelService.exportAsExcelFile( this.dataExcel, 'Empleados');
        //  console.log( this.dataExcel);
         });
         
       }
  
  
      //  cargar pdf
  
      caduDocu:boolean=false;
      cadu(caducidad:any){
  
        if (this.caduDocu) {
          this.caduDocu = false;
        } else {
          this.caduDocu = true;
        }
        
      }
  

   cargar:boolean=false;
   async cargarPdf(nEmpleado:any,idDocumento:any, caducidad:any){
      if (caducidad == 1) {
       this.caduDocu = true;
      } else {
       this.caduDocu = false;
        
      }
      
      this.ubicar =   this.modalService.open(UbicarModalComponent, {
          containerClass: 'right',
          modalClass: 'modal-side modal-top-right',
          ignoreBackdropClick: true,
          data: {
            caduDocu:this.caduDocu,
            idDocumento:idDocumento,
            nEmpleado:nEmpleado,
            idServicio:this.idServicio
          },
        });
        this.ubicar.onClose.subscribe((message: any) => {
          if(message == 'success'){
           setTimeout(()=>{
             this.getDocu(nEmpleado);
           },500);
   
          }
       });
    
  
    }
  
    // files!: UploadFile[];
   
  
  //   showFiles() {
  //     let files = '';
  //     for (let i = 0; i < this.files.length; i ++) {
  //       files += this.files[i].name;
  //        if (!(this.files.length - 1 === i)) {
  //          files += ',';
  //       }
  //     }
  //     return this.files;
  //  }
  
  

      
   
  
  
    out(){
      this.cargar = false;
     

    }
  
  
    getDocus:boolean=false;
    data:any;
    getDocu(nEmpleado:any){
      this.controlB = false;
      
      this._empleados.getPdf(nEmpleado)
      .subscribe(data=>{
        if (data == 'error') {
          this.data=null;
          this.getDocus = true;
        }else{
          this.getDocus = false;
          this.data = data;
        }
      })
      
    }
  
  
    
    getDocus1:boolean=false;
    tit:any;
    getDocu1(){
      this.controlB = false;
     
      this._empleados.getTitulo(this.idServicio)
      .subscribe(data=>{
    
        if (data == 'error') {
         
          this.getDocus1 = true;
        }else{
          this.getDocus1 = false;
          this.tit = data;
  
        }
      })
      
    }
  
    borrar(item:any){
     let  a = confirm ('¿Eliminar archivo?');
  
     if (a) {
       this._empleados.borrarPdf(item.nEmpleado, item.nombreDocumento,item.id)
       .subscribe(data=>{ 
         if (data == 'success') {
           this.getDocu(item.nEmpleado);
         }
       });
       
     }
      
    }
  
  
    pri:boolean=false;
    print(printer:any,arriba:any) : void{
      this.pri=true;
      this._alerta.openAlert('DESCARGANDO PDF, ESPERE POR FAVOR.' ,'bg-warning text-white' , 'Descargas');
  
  setTimeout(()=>{
  
    var contenido= document.getElementById(printer);
   
    // html2canvas(contenido).then(canvas => { 
    //   const pedido =  arriba+ '.pdf';
    //   var contentWidth = canvas.width;
    //   var contentHeight = canvas.height;
    //   var pageHeight = contentWidth / 592.28 * 841.89;
    //   var leftHeight = contentHeight;
    //   var position = 0;
    //   var imgWidth = 595.28;
    //   var imgHeight = 592.28/contentWidth * contentHeight;
    //   var pageData = canvas.toDataURL('image/jpeg', 1.0);
    //   var pdf =  jsPDF('p', 'pt', 'a4'); 
    //   if (leftHeight < pageHeight) {
    //     pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
    //    } else {
    //      while(leftHeight > 0) {
    //        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
    //        leftHeight -= pageHeight;
    //        position -= 841.89;
    //        //Avoid adding blank pages
    //        if(leftHeight > 0) {
    //          pdf.addPage();
    //        }
    //      }
    //    }
    //    // this.ve=false;
    //    pdf.save(pedido); // Generated PDF  
       
    //  }); 
     this.pri= false;
  },500)
      
     }
     
  
     controlB:boolean =false;
     control(){
       this.controlB = true;
       this.fecha();
       this.mueveReloj();
       this.getTexto();
     }
     control1(){
      this.controlB = false;
    }
  
    minuto:any;
    segundo:any;
    horaImprimible:any;
  
    mueveReloj(){
     let momentoActual = new Date();
     let hora = momentoActual.getHours();
    this.minuto = momentoActual.getMinutes();
    this.segundo = momentoActual.getSeconds();
  
     if (this.minuto < 10) {
       this.minuto = '0' + this.minuto
     } 
     if (this.segundo < 10) {
      this.segundo = '0' + this.segundo
    } 
  
      this.horaImprimible = hora + " : " + this.minuto 
  
      // document.form_reloj.reloj.value = horaImprimible
  }
  
  fechaHoy:any;
  anio:any;
  fecha(){
    var f = new Date();
  //  this.fechaHoy =  f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
   this.fechaHoy =  f.getFullYear() + '/' + (f.getMonth() +1) + "/" +  f.getDate() ;
    this.anio =f.getFullYear();
    }
  
  
    datos:any;
    descarga(){
      
      this._empleados.consultaEmpleadoExcelHoras(this.emp_numero,this.anio)
      .subscribe(data=>{ 
        
        if (data != 'error') {
          this.datos = data;
          this.excelService.exportAsExcelFile(this.datos, 'Lista_Horas_' + this.ape);
        }else{
          alert('ERROR!');
        }
      });
  
    }
  
  
    errorFecha:boolean=false;
   fechaBajaF(fechaBaja:any){
    this.fecha();
   let  fechaHoy = new Date(this.fechaHoy);
  let fechados = new Date(fechaBaja.value);
  
  
   if (fechaHoy.getTime() <= fechados.getTime()) {
     this.errorFecha= false;
     
   } else {
    this.errorFecha= true;
  
     
   }
     
       
    }
  
    edi:boolean=false;
    modalC(frames:any){
      frames.show();
      this.edi = true;
    }
  
    com:any;
    addCo(come:any){
      
      this._empleados.addCoemntarioEmpleado(this.employees.nEmpleado , come.value,this.idServicio)
      .subscribe(data=>{  
       
      if (data == 'success') {
      
        this._alerta.openAlert('Comentario editado.' ,'bg-warning text-white' , 'Comentario');
       
        this.edi = false;
        this.editar = false;
        this.getEmpleadosActivos();
        this.com = null;
        this.fecha();
        this.getCom(this.employees.nEmpleado , this.anio);
      } else {
        this._alerta.openToast1('Error al editar comentario.' ,'bg-warning text-white' , 'Comentario');
      }
      });
      
    }
  
    puestos1:any
  asigP(admin1:any){
    admin1.show();
    this._empleados.getPuestos1(this.idServicio)
    .subscribe(data=>{ 
    this.puestos1 = data;
    });
  }
    submitPuesto(coP:any){
      this._empleados.asignarPuestoMultiple(coP.value)
      .subscribe(dtas=>{ 
     this._alerta.openToast1('Puestos asignados correctamente...' , 'bg-success text-white' , 'OK');
     this.getPuestosAsignados(this.emp_numero);
     this.contratosE = null;
      });
      
    }
  
    outs(admin1:any){
      admin1.hide();
      this.contratosE = null;
  
    }
  
  
    borrarAsignacion(idEPuesto:number,nEmpleado:number){
    this._empleados.borrarPestoAsignadoConsulta(nEmpleado,idEPuesto)
    .subscribe(data=>{ 
      console.log(data);
      
    
      if (data == 'success') {
        this._alerta.openToast1('Asignación borrada...' , 'bg-success text-white' , 'OK');
        this.getPuestosAsignados(nEmpleado);
      } else {
        this._alerta.openToast1('Error al borrar asignación' , 'bg-danger text-white' , 'OK');
      }
    });
      
  
    }
  
    asignar(apellidos:any, nombre:any, nEmpleado:number,dni:any,app_:number, tabla:any){
      if (tabla == 'app_calendario') {
        this._alerta.openToast1('CALENDARIO NO SE PUEDE DESASIGNAR.' , 'bg-danger text-white' , 'ERROR ');
      }else{

        let mensaje;
    
        if (app_ == 1) {
         mensaje = '¿Quire deshabilitar la aplicacion ' + tabla + ' ?';
         app_ =0;
        }else{
           mensaje = '¿Quire habilitar la aplicacion ' + tabla + ' ?'
           app_=1;
        }
        let confirmar = confirm(mensaje);
        if (confirmar) {
          this._empleados.asignarApp(apellidos, nombre, nEmpleado,dni.toLowerCase(),app_, tabla)
          .subscribe(data=>{ 
          console.log(data);
          
            if (data == 'success') {
              this._alerta.openToast1('Asignación borrada...' , 'bg-success text-white' , 'OK');
              if (tabla == 'app_calendario' ) {
                this.employees.app_calendario =app_;
              }else{
                this.employees.app_production =app_;
  
              }
              this.empleado(this.employees)
            } else {
              this._alerta.openToast1('Error al borrar asignación' , 'bg-danger text-white' , 'OK');
            }
          });
        }
      }


    }

  
  }
  