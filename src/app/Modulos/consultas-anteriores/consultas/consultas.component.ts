import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import { MdbTableDirective } from 'mdb-angular-ui-kit/table';
import { Empleado } from 'src/app/Models/emplados';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  @ViewChild('table') table!: MdbTableDirective<any>;
  options = [
    { value: 'year1', label: '' },
    { value: 'year1', label: '' },
   
  ];
  constructor(
    private ruta:Router,
    private _empleados :EmpleadosService,
    private _alerta:NotificacionService,
    private _control : ControlHorasService,
    private excelService:ExcelService,
   
  ) { }

  usuario:any;
  year1:any;
  year2:any;
  years:any;
  tipoUsuario:any;
  idServicio:any;
  ngOnInit() {
    let ser:any = localStorage.getItem(btoa('servicio'));
    let rol:any = localStorage.getItem('rol');
    let usuario:any = localStorage.getItem('usuario');
    this.tipoUsuario = atob(rol);
    this.usuario = atob(usuario);
    this.idServicio = atob(ser);

    if (this.tipoUsuario != 'A2020') {
      this.ruta.navigate(['Empleados']);
      return;
    }
    

    var today = new Date();
    this.years = today.getFullYear();
  this.year1 = this.years - 1;
  this.year2 = this.years - 2;   
  this.options[0].label=this.year1
  this.options[1].label=this.year2
  this.getEmpleadosActivos();
  this.getConvenio();
  }

  search(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.table.search(searchTerm);
  }


  anio:any;
  siAnio:boolean=false;
  changeYear(event:any){
    setTimeout(()=>{
      this.loadingHoras=false;
     },2000);

  this.anio = event;
  if (this.anio) {
    this.siAnio = true;
  }else{
    this.siAnio = false;

  }
  
  }

  closeAlert() {
    this.siAnio = false;
   this.salir();
  }

texto:any;
get_t:any=[];
  getTexto(){

    this._empleados.getTexto(this.idServicio)
    .subscribe(data=>{ 
    for (let i = 0; i < this.get_t.length; i++) {
      this.texto =  this.get_t[i].texto;
      
    }
    });
  
  }

  filterQuery="";
  data:any;
  dataTotal:any;
  loadingHoras:boolean= true;
  getEmpleadosActivos(){
   this._empleados.getEmplaedos(this.idServicio)
   .subscribe(resp=>{

     if (resp != 'error') {
       this.data = resp;
       this.dataTotal = this.data.length;
     } else {
      this.data = [];
      this.dataTotal = 0;
      this.loadingHoras=false;

     }
     
   })
  }

  horaConvenios:any;
  getConvenio(){
   this._empleados.getConvenio(this.idServicio)
   .subscribe(data=>{

     if (data != 'error') {
       this.horaConvenios = data[0].horasAnuales;
      
     } else {
       alert('Error en los  convenios.')
     }
     
   })
 }

  bolsaHabilitado?:boolean;
  bolsa:any;
  bArray:any=[];
  bolsas(){
    // this.getConfogHoras();
    this._empleados.getBolsa(this.idServicio)
    .subscribe(data=>{  
      console.log(data);
      this.bArray = data;
      this.bolsa =  this.bArray.bolsaHoras;
    if ( this.bolsa == 1) {
      this.bolsaHabilitado = true;
    } else {
      this.bolsaHabilitado = false;
    }
    }); 
  }


  verEmpleado:boolean=false;
  employees!:Empleado;
  editar?:boolean;
  hoy:any;
  day:any;
  month:any;
  year:any;
  justificacion:string ='Seleccione una justificación';
  horasInicio:number=0;
  vaciones?:number;
  fechas:any;
  edad:any;
  emp_numero:number=0;
  ape?:string;
  coment?:string;

  empleado(item:any){
   this.emp_numero = item.nEmpleado;
   this.ape = item.apellidos;
   this._empleados.antiguedad(item.nEmpleado) 
   .subscribe(data=>{ 
     this.control();
        this.hoy = data.meses / 12 ;
        this._empleados.getDiasVacacionesConsultas(item.nEmpleado, this.anio) 
   .subscribe(resp=>{ 

    if (resp > 0) {
      this.vaciones = resp;
    } else {
      this.vaciones = 0;
    }
        
    
  
   }); 
  
   }); 
    
    this.verEmpleado=true;
    this.employees = item;
    
    this._empleados.consultaEmpleadoHorasConsulta(this.employees.nEmpleado , this.anio)
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
//  console.log(this.edad);

this._empleados.comentarios(item.nEmpleado,this.anio)
.subscribe(co=>{ 

  if (co !=undefined || co != null) {
    this.coment = co.com;
  }else{
    this.coment = '';
  }
});

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
  paroAnterior:any=[];
  paroActual:any=[];
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
  
  
  mesTraB?:boolean;
  mesFeB?:boolean;
  mesMarB?:boolean;
  mesAbrB?:boolean;
  mesMayB?:boolean;
  mesJunB?:boolean;
  mesJulB?:boolean;
  mesAgoB?:boolean;
  mesSetB?:boolean;
  mesOctB?:boolean;
  mesNovB?:boolean;
  mesDicB?:boolean;
  errData?:boolean;
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
     
        this._empleados.horasMensualConsulta(1,this.employees.nEmpleado, this.anio)
        .subscribe(data=>{ 
          console.log(data);
          
         
              if (data == false) {
                this.errData = true;
                return;
              }else{
                this.errData = false;
              }
     
           if (mes >= data[0].mes) {
             this.mesTraB = true;
           }
      
        
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesTra1=data;
         
        });  
  
          
        this._empleados.horasMensualConsulta(2,this.employees.nEmpleado , this.anio)
        .subscribe(data=>{ 
          console.log(data);

         if (mes >= data[0].mes) {
             this.mesFeB = true;
          }
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesFe1=data;
         
        });  
  
          
        this._empleados.horasMensualConsulta(3,this.employees.nEmpleado , this.anio)
        .subscribe(data=>{ 
          console.log(data);

          if (mes >= data[0].mes) {
            this.mesMarB = true;
         }
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesMar1=data;
         
        });  
  
        this._empleados.horasMensualConsulta(4,this.employees.nEmpleado , this.anio)
        .subscribe(data=>{
          console.log(data);

          if (mes >= data[0].mes) {
            this.mesAbrB = true;
         }
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesAbr1=data;
         
        });  
  
        this._empleados.horasMensualConsulta(5,this.employees.nEmpleado , this.anio)
        .subscribe(data=>{
          console.log(data);

          if (mes >= data[0].mes) {
            this.mesMayB = true;
          }
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesMay1=data;
         
        }); 
  
        this._empleados.horasMensualConsulta(6,this.employees.nEmpleado , this.anio)
        .subscribe(data=>{
          console.log(data);

          if (mes >= data[0].mes) {
            this.mesJunB = true;
          }
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesJun1=data;
         
        }); 
  
        this._empleados.horasMensualConsulta(7,this.employees.nEmpleado , this.anio)
        .subscribe(data=>{
          console.log(data);

          if (mes >= data[0].mes) {
            this.mesJulB = true;
          }
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesJul1=data;
         
        }); 
  
        this._empleados.horasMensualConsulta(8,this.employees.nEmpleado ,this.anio)
        .subscribe(data=>{
          console.log(data);

          if (mes >= data[0].mes) {
            this.mesAgoB = true;
          }
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesAgo1=data;
         
        }); 
  
        this._empleados.horasMensualConsulta(9,this.employees.nEmpleado , this.anio)
        .subscribe(data=>{
          console.log(data);

          if (mes >= data[0].mes) {
            this.mesSetB = true;
          }
           this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesSet1=data;
         
        }); 
  
        this._empleados.horasMensualConsulta(10,this.employees.nEmpleado, this.anio)
        .subscribe(data=>{
          console.log(data);

          this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesOct1=data;
          if (mes >= data[0].mes) {
            this.mesOctB = true;
          }
        }); 
        
        this._empleados.horasMensualConsulta(11,this.employees.nEmpleado, this.anio)
        .subscribe(data=>{
          console.log(data);

          
          this.totalHTeoricas=this.totalHTeoricas + data[0].horasTeoricas;
          this.mesNov1=data;
          if (mes >= data[0].mes) {
            this.mesNovB = true;
          }
        }); 
        
        this._empleados.horasMensualConsulta(12,this.employees.nEmpleado, this.anio)
        .subscribe(data=>{
          console.log(data);

        
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
      this._empleados.horasMensualTrabajadaConsultas(this.employees.nEmpleado ,1 , this.anio)
      .subscribe(res=>{ 
        
        if (res) {
          this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
          
          this.mesTra= res;
  
    
           
          }
       });

       this._empleados.horasMensualTrabajadaConsultas(this.employees.nEmpleado ,2 , this.anio)
       .subscribe(res=>{ 
         if (res) {
           this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
           this.mesFe= res;

           }
        });

        this._empleados.horasMensualTrabajadaConsultas(this.employees.nEmpleado ,3 , this.anio)
        .subscribe(res=>{ 
          if (res) {
            this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
            this.mesMar= res;
 
            }
         });
         this._empleados.horasMensualTrabajadaConsultas(this.employees.nEmpleado ,4 , this.anio)
         .subscribe(res=>{ 
           if (res) {
             this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
             this.mesAbr= res;
  
             }
          });
          this._empleados.horasMensualTrabajadaConsultas(this.employees.nEmpleado ,5 , this.anio)
          .subscribe(res=>{ 
            if (res) {
              this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
              this.mesMay= res;
   
              }
           });
           this._empleados.horasMensualTrabajadaConsultas(this.employees.nEmpleado ,6 , this.anio)
           .subscribe(res=>{ 
             if (res) {
               this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
               this.mesJun= res;
    
               }
            });
            this._empleados.horasMensualTrabajadaConsultas(this.employees.nEmpleado ,7 , this.anio)
            .subscribe(res=>{ 
              if (res) {
                this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
                this.mesJul= res;
     
                }
             });
             this._empleados.horasMensualTrabajadaConsultas(this.employees.nEmpleado ,8 , this.anio)
             .subscribe(res=>{ 
               if (res) {
                 this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
                 this.mesAgo= res;
      
                 }
              });
              this._empleados.horasMensualTrabajadaConsultas(this.employees.nEmpleado ,9 , this.anio)
              .subscribe(res=>{ 
                if (res) {
                  this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
                  this.mesSet= res;
       
                  }
               });
               this._empleados.horasMensualTrabajadaConsultas(this.employees.nEmpleado ,10 , this.anio)
               .subscribe(res=>{ 
                 if (res) {
                   
                   this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
                   this.mesOct= res;
                   
                   }
                  });
                  this._empleados.horasMensualTrabajadaConsultas(this.employees.nEmpleado ,11 , this.anio)
                  .subscribe(res=>{ 
                    if (res) {
                      this.totalHTrabajadas=this.totalHTrabajadas+res[0].mesHora;
                      this.mesNov= res;
         
                    }
                  });
                  this._empleados.horasMensualTrabajadaConsultas(this.employees.nEmpleado ,12 , this.anio)
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

     
     this._empleados.horasMensualTrabajadaBolsaConsulta(this.employees.nEmpleado , this.anio)
     .subscribe(res=>{ 
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
      

  

    

     // verifica si tiene paros
  this.bolsas();
     
}


dataE:any;
exportAsXLSX():void {
  this._empleados.getEmplaedosActivosE(this.idServicio)
  .subscribe(data=>{ 
 this.dataE  = data;
  this.excelService.exportAsExcelFile(this.dataE, 'Empleados_activos');
  });

   
 }
     
  
 
 
 pri?:boolean;
 print(printer:any,arriba:any) : void{
   if (!this.errData) {
    this.pri=true;
    this._alerta.openToast1('DESCARGANDO PDF, ESPERE POR FAVOR.' , 'bg-warning text-white' , 'DESCARGA...');
setTimeout(()=>{
  let contenido:any = document.getElementById(printer);
  let pdf = new jsPDF(); 
  html2canvas(contenido).then(canvas => { 
    const pagina =  'Programación_' + '.pdf';
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 200, 158);
    pdf.setFontSize(15);
    pdf.save(pagina); // Generated PDF  
   }); 
   this.pri= false;
},500)
   } else {
    this._alerta.openToast1('NO HAY HORAS DISPONIBLES PARA DESCARGAR.', 'bg-warning text-white' , 'DESCARGA...');

   }

   
  }
  

  controlB?:boolean;
  control(){
    this.controlB = true;
    this.getTexto();
  }


 salir(){
  this.data=[];
  this.getEmpleadosActivos();
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

 this.mesTraB=false;
 this.mesFeB=false;
 this.mesMarB=false;
 this.mesAbrB=false;
 this.mesMayB=false;
 this.mesJunB=false;
 this.mesJulB=false;
 this.mesAgoB=false;
 this.mesSetB=false;
 this.mesOctB=false;
 this.mesNovB=false;
 this.mesDicB=false;
  this.controlB = false;
  this.errData = false;
  // console.log(this.mes);
}

datos:any;
descarga(){

  // tengo que enviarle el año.. tambiem
  this._empleados.consultaEmpleadoExcelHoras(this.emp_numero,this.anio)
  .subscribe(data=>{ 
    
    if (data != 'error') {
      this.datos = data;
      this.excelService.exportAsExcelFile(this.datos, 'Lista_Horas_' +  this.anio + '_' + this.ape);
    }else{
      alert('ERROR!');
    }
  });

}


}