import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbTableDirective } from 'mdb-angular-ui-kit/table';
import { EliminarModalComponent } from 'src/app/Modales/eliminar-modal/eliminar-modal.component';
import { Servicio } from 'src/app/Models/servicios';
import { ConfigService } from 'src/app/Services/config.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  @ViewChild('table') table!: MdbTableDirective<any>;
  @ViewChild('tableHoras') tableHoras!: MdbTableDirective<any>;
  sRef: MdbModalRef<EliminarModalComponent> | null = null;
  urlA= '';
  constructor( 
    private _config:ConfigService,
    private _empleados:EmpleadosService,
    private _alerta: NotificacionService,
    private ruta: Router,
    private modalService: MdbModalService,

    ) { 

    }

    datas:any;
    dataTotal:any;
    getEmpleadosActivos(){
     this._empleados.getEmplaedosActivos(this.idServicio)
     .subscribe(resp=>{
  
  
       if (resp != 'error') {
         this.datas = resp;
         this.dataTotal = this.datas.length;
       } else {
         alert('Error en el servidor, no hay empleados registrados.')
       }
       
     })
    }
    
    data:any;
    dataP:any;
    dataC:any;
    dataJu:any;
    usuario:any;
    texto:any;
    idServicio:any;
    ngOnInit() {
      let ser:any = localStorage.getItem(btoa('servicio'));
      let rol:any = localStorage.getItem('usuario')
      this.usuario = atob(rol);
      this.idServicio = atob(ser);

      
      this.getEmpleadosActivos();
      this.getServicio();
      this.getT();
      this.getP();
      this.getConvenio();
      this.getJustificacion();
      this.getListadoContrato();
    
      // if (this.usuario != 'admin') {
      //   this.ruta.navigate(['principal/control-horas']);
      // }
      this.getTexto();
      this.bolsas();
    }

url:any;
get_t:any=[];
getTexto(){
  this._empleados.getTexto(this.idServicio)
  .subscribe(data=>{ 
    this.get_t = data;
    for (let i = 0; i < this.get_t.length; i++) {
      this.texto =  this.get_t[i].texto;
      this.url =  this.get_t[i].url;
    }
  });

}
  

    block:boolean = false;
    bloquear(){
      if (this.block) {
        this.block = false;
      } else {
        this.block = true;
      }
    }
    cambiarHoras(item:any){
      this._empleados.editarParos(item)
      .subscribe(data=>{ 
      
         if (data == 'success') {
           this._alerta.openToast1('Mes de paro editado' , 'bg-success text-white' , 'OK');
           this.bloquear();
         }else{
           this._alerta.openToast1('Error el editar...' , 'bg-danger text-white' , 'OK');
         }
      });
      
    }

  getT(){
    this._empleados.getTurnos1(this.idServicio)
      .subscribe(data=>{
        this.data =  data;
          
        })
  }
  getP(){
    this._empleados.getPuestos1(this.idServicio)
      .subscribe(data=>{
        this.dataP =  data;
          
        })
  }
  getConvenio(){
    this._empleados.getConvenio1(this.idServicio)
      .subscribe(data=>{
        this.dataC =  data;
     
          
        })
  }
  getJustificacion(){
    this._empleados.getJustificacion(this.idServicio)
      .subscribe(data=>{
      
        this.dataJu =  data;
     
          
        })
  }

  servicio?:any = new  Servicio
  getServicio(){
  this._config.getServicio(this.idServicio)
  .subscribe(res=>{
    this.servicio = res;
    
  })
  }

  btnSi?:boolean;
  editar(editarS:any){
    this.btnSi = true;
    this._config.editServicio(editarS.value)
    .subscribe(res=>{
   if (res=='success') {
     this._alerta.openToast1('El servicio se ha editado correctamente.' ,'bg-success text-white' , 'OK');
    this.getServicio();
    setTimeout(()=>{
      this.btnSi=false;
    },1500);
   }else{
     alert('Error:::');
     this.btnSi =false;
   }
    })
    
  }
  selectedValue = '';
  id:any;
  des:any;
  jefeTurno:any;
  mostrarI?:boolean;
  estado:any;
  getSelectedValue(event:any) {
   this.id =event;
   this._empleados.getTurnosById(this.id)
   .subscribe(data=>{
      this.des = data.descripcion;
      this.jefeTurno = data.jefeTurno;
      if (data.activo == 1) {
        this.estado = true;
      } else {
        this.estado = false;
        
      }
   })
  
    this.mostrarI = true;
  }

  editarT(ed:any){
// return console.log(ed.value);

    if (ed.value.jefeTurno == '') {
      ed.value.jefeTurno =this.jefeTurno;
    }
    
    this._config.editTurnos(ed.value)
    .subscribe(data=>{
      
      if (data == 'success') {
        this._alerta.openToast1('TURNO EDITADO EXITOSAMENTE' , 'bg-success text-white' , 'OK');
        this.getT();
        this.mostrarI =false;
      } else {
        this._alerta.openToast1('ERROR AL EDITAR' , 'bg-danger text-white' , 'ERROR');
      }
    })
    
  }

  // puestoas

  idP:any;
  desP:any;
  mostrarP?:boolean;
  estadoP:any;
  selectedValueP=''
  getSelectedValueP(event:any) {
   this.idP =event;
   this._empleados.getPuestosById(this.idP)
   .subscribe(data=>{
     
      this.desP = data.descripcionPuesto;
      if (data.estado == 1) {
        this.estadoP = true;
      } else {
        this.estadoP = false;
        
      }
   })
  
    this.mostrarP = true;
  }


  editarP(ed:any){

    this._config.editPuestos(ed.value)
    .subscribe(data=>{
      
      if (data == 'success') {
        this._alerta.openToast1('PUESTO EDITADO EXITOSAMENTE' , 'bg-success text-white' , 'OK');
        this.getP();
        this.mostrarP =false;
      } else {
        this._alerta.openToast1('ERROR AL EDITAR' , 'bg-danger text-white' , 'ERROR');
      }
    })
    
  }

  // Convenios

  
  idC:any;
  horas:any;
  horaDias:any;
  mostrarC?:boolean;
  estadoC:any;
  vacaciones?:number;
  selectedValueC=''
  getSelectedValueC(event:any) {
   this.idC =event;
   this._empleados.getConveniosById(this.idC , this.idServicio)
   .subscribe(data=>{
     
      this.horas = data.horasAnuales;
      this.horaDias = data.horaDias;
      this.vacaciones = data.vacaciones;
      if (data.estadoC == 1) {
        this.estadoC = true;
      } else {
        this.estadoC = false;
        
      }
   })
  
    this.mostrarC = true;
  }


  idJu:any;
  mostrarJu?:boolean;
  estadoJu:any;
  selectedValueJu=''
  detalle=''
  getSelectedValueJu(event:any) {
  
    
   this.idJu =event;
   

    this.mostrarJu = true;
    this._empleados.getJustificacionById(this.idJu,this.idServicio)
    .subscribe(data=>{ 
    this.detalle =  data.detallesJ
      if (data.pluses == 1) {
        this.estadoJu = true;
      } else {
        this.estadoJu = false;
        
      }
  
    });
    
  }

  editarJ(edJ:any){
    
    this._config.editJustifi(edJ.value)
    .subscribe(data=>{
      
      if (data == 'success') {
        this._alerta.openToast1('JUSTIFICACIÓN EDITADA EXITOSAMENTE' , 'bg-success text-white' , 'OK');
        this.getJustificacion();
        this.mostrarJu =false;
      } else {
        this._alerta.openToast1('ERROR AL EDITAR' , 'bg-danger text-white' , 'ERROR');
      }
    })
    
  }
  
  editarC(ed:any){

    this._config.editConvenios(ed.value)
    .subscribe(data=>{
      
      if (data == 'success') {
        this._alerta.openToast1('CONVENIO EDITADO EXITOSAMENTE' , 'bg-success text-white' , 'OK');
        this.getConvenio();
        this.mostrarC =false;
      } else {
        this._alerta.openToast1('ERROR AL EDITAR'   , 'bg-danger text-white' , 'ERROR');
      }
    })
    
  }

  reset(){
    location.reload();
  }


  dataContrato:any
  getListadoContrato(){
  this._config.getListadoContarto(this.idServicio)
  .subscribe(res=>{

    
     if (res != 'error') {
       this.dataContrato = res;
     }else{
      this._alerta.openToast1('ERROR:: en el servidor' , 'bg-danger text-white' , 'ERROR');

     }
  })
  }

  contratos:any = new Servicio
  addContratos(contrato:any , frame:any){
    this.contratos = contrato.value;
    
    this._config.addContratos(this.contratos)
    .subscribe(res=>{
  
      if (res == 'success') {
        this._alerta.openToast1('Tipo de contrato agregado con éxito!', 'bg-success text-white' , 'OK');
        this.getListadoContrato();
        frame.hide();
        this.contratos=[]
      } else {
        this._alerta.openToast1('ERROR:: en el servidor', 'bg-success text-white' , 'OK');
        
      }
    })
    
  }
  // add
  addModal(){
    this.modalM =  this.modalService.open(EliminarModalComponent, {
      containerClass: 'right',
      modalClass: 'modal-side modal-top-right',
      ignoreBackdropClick: true,
      data: {
       eliminar:7,
       idServicio:this.idServicio,
       idContrato:0,
       
      },
    });
    this.modalM.onClose.subscribe((message: any) => {
      if(message == 'success'){
       setTimeout(()=>{
        this.getListadoContrato();
         this.contratos=[]
       },500);

      }
   });

  }

  // editar
  modalM:any;
  modal(item:any){
   
    this.contratos = item;
    this.modalM =  this.modalService.open(EliminarModalComponent, {
      containerClass: 'right',
      modalClass: 'modal-side modal-top-right',
      ignoreBackdropClick: true,
      data: {
       eliminar:6,
       contratos:item,
       idServicio:this.idServicio,
       
      },
    });
    this.modalM.onClose.subscribe((message: any) => {
      if(message == 'success'){
       setTimeout(()=>{
        this.getListadoContrato();
         this.contratos=[]
       },500);

      }else{
        this.getListadoContrato();
      }
   });
  }

  salir(frame:any){
    this.contratos=[];
    this.name = '';
    this.idContratoBaja = 0;
    frame.hide();
  }


  name?:string;
  idContratoBaja?:number;
  eliE:any;
  eliminarE(item:any, id:any ){  
   
  
    this.modalM =  this.modalService.open(EliminarModalComponent, {
      containerClass: 'right',
      modalClass: 'modal-side modal-top-right',
      ignoreBackdropClick: true,
      data: {
        eliminar:8,
        name: item,
       idServicio:this.idServicio,
       idContratoBaja:id
      
      },
    });
    this.modalM.onClose.subscribe((message: any) => {
      if(message == 'success'){
       setTimeout(()=>{
        this.getListadoContrato();
         this.contratos=[]
       },500);

      }
   });
   
  }



  configHoras:any=[];
  loadingHoras:boolean=true;
  getConfogHoras(){
  
    this._config.getConfogHoras(this.idServicio)
    .subscribe(data=>{
     console.log(data);
     
      if (data != 'error' ) {
        this.configHoras = data;
        setTimeout(()=>{
        this.loadingHoras = false;
        },2000);
      }else{
        this._alerta.openToast1('Nada para mostrar!', 'bg-danger text-white' , 'ERROR');
        this.configHoras=[];
      }
    })
  }


  desc?:string
  idHora?:number;
  edit:any
  editH(idHora:any ,descripcion:any ){
   
  this.idHora = idHora;
    if (descripcion == null) {
      this.desc = 'Sin descripción';
    }else{
      this.desc = descripcion;
    }
    this.modals =  this.modalService.open(EliminarModalComponent, {
      containerClass: 'right',
      modalClass: 'modal-side modal-top-right',
      ignoreBackdropClick: true,
      data: {
        eliminar:5,
        idHora:  this.idHora,
        desc:this.desc
      },
    });
    this.modals.onClose.subscribe((message: any) => {
      if(message == 'success'){
       setTimeout(()=>{
        this.getConfogHoras()
       },500);
  
      }
   });
    
  }



  estadoHoras(idHora:any, estadoColumna:any){
   
    if (estadoColumna == 0) {
      estadoColumna = 1;
    }else{
      estadoColumna = 0;
    }
    this._config.estadoHoras(idHora, estadoColumna)
    .subscribe(res=>{
      if (res == 'success') {
        this._alerta.openToast1('Campo editado!', 'bg-success text-white' , 'OK');
        this.getConfogHoras();
      } else {
        this._alerta.openToast1('Error al editar el campo!', 'bg-danger text-white' , 'ERROR');;  
      }
    })
    
  }




  // paroHabilitado:boolean;
  // estatus:any;
//   paros(){
//     this._empleados.getJustificacionById(100)
//     .subscribe(data=>{ 
//  this.estatus = data.estatus;
//     if (data.estatus == 1) {
//       this.paroHabilitado = true;
//     } else {
//       this.paroHabilitado = false;
//     }
//     });
    
//   }

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

  // parosH(estatus){
    

  //   if (estatus == 1) {
  //     this._empleados.cambioJustiParo(0)
  //     .subscribe(data=>{ 
      
  //       if (data == 'success') {
  //         this.paros();
  //         this.getJustificacion();
  //      this._alerta.success('Paros Deshabilitado');
  //       }else{
  //         this._alerta.error('ERROR...');

  //       }
  //     });
  //   } else {
  //     this._empleados.cambioJustiParo(1)
  //     .subscribe(data=>{ 
      
  //   if (data == 'success') {
  //         this.paros();
  //         this.getJustificacion();
  //         this._alerta.success('Paros Habilitado');
       
  //       }else{
  //         this._alerta.error('ERROR...');
          
  //       }
  //     });
  //   }
    
  // }

  bolsaH(bolsa:any){
    

    if (bolsa == 1) {
      this._empleados.cambioBolsa(0, this.idServicio)
      .subscribe(data=>{ 
   
        if (data == 'success') {
          
       this._alerta.openToast1('Bolsa de horas Deshabilitado', 'bg-success text-white' , 'OK');
       this.bolsas();
        }else{
          this._alerta.openToast1('ERROR...', 'bg-danger text-white' , 'ERROR');
         this.bolsas();

        }
      });
    } else {
      this._empleados.cambioBolsa(1, this.idServicio)
      .subscribe(data=>{ 
      
    if (data == 'success') {
        
          this._alerta.openToast1('Bolsa de horas Habilitado', 'bg-success text-white' , 'OK');
          this.bolsas();
       
        }else{
          this._alerta.openToast1('ERROR AL HABILITAR...', 'bg-danger text-white' , 'OK');
         this.bolsas();

          
        }
      });
    }
    
  }

   abrirVentana(url:any) {
   
     let urls = this.url + url + this.idServicio;
     window.open(urls, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes,toolbar=yes, statusbar=no, tittlebar=no, width=1100, height=600, left=270 , top=70" );
}


titulo?:string;
cadu?:number;
addTitulo(doc:any){
  // return console.log(doc.value);
  
  this._empleados.addTitulo(doc.value)
  .subscribe(data=>{ 
 
    if(data == 'success'){
      this.titulo = '';
      this.cadu = 0;
      this.idDocumento=0;
      this.getTitulos();
    }
  });
  
}

todoTitulos:any;
getTitulos(){
  this._empleados.getTitulo(this.idServicio)
  .subscribe(todoTitulos=>{ 
   
    if (todoTitulos == 'error') {
      this._alerta.openToast1('No hay documento para mostrar.', 'bg-danger text-white' , 'ERROR');
      this.todoTitulos=[];
    }else{
      this.todoTitulos = todoTitulos;
    }
    
 
  });
}

idDocumento?:number;
editT(item:any){

  this.titulo=item.titulo;
  this.cadu=item.caducidadD;
  this.idDocumento=item.idDocumento;
}


docs:any;
tit?:string
modals:any;
borrar(item:any,docs:any){
this.docs = docs;
  this.tit=item.titulo;
  this.idDocumento=item.idDocumento;
  this.modals =  this.modalService.open(EliminarModalComponent, {
    containerClass: 'right',
    modalClass: 'modal-side modal-top-right',
    ignoreBackdropClick: true,
    data: {
      eliminar:4,
      idDocumento:  this.idDocumento,
      tit:this.tit
    },
  });
  this.modals.onClose.subscribe((message: any) => {
    if(message == 'success'){
     setTimeout(()=>{
      this.getTitulos()
     },500);

    }
 });
}



addConfig(config:any){

  this._empleados.setTexto(config.value)
  .subscribe(res=>{ 
   
  if(res == 'success'){
    this._alerta.openToast1('Configuración guardada.', 'bg-success text-white' , 'OK');
    this.getTexto();
  }else{
    this._alerta.openToast1('Error en el servidor.', 'bg-danger text-white' , 'ERROR');
  }
  });
  
}



tipoPlus?:number;
sBasic:any;
configPluses(item:any){
this.idHora = item.idHora;
this.desc = item.descripcion;
this.tipoPlus = item.tipoPlus;
// this.sBasic = basics;

// this.sBasic.show();
}

// 
// comanterios de los fichajes
// 

tituloF?:string;
addTitulo1(doc:any){
  this._empleados.addComentarioFichaje(doc.value)
  .subscribe(data=>{ 
    if(data == 'success'){
      this.tituloF = '';
      this.idDocumentoF=0;
      this.getTitulos1();
    }
  });
  
}


todoTitulos1:any=[];
loading:boolean = true;
getTitulos1(){
  this._empleados.getComentarioFichaje(this.idServicio)
  .subscribe(data=>{ 
    if (data == 'error') {
      this._alerta.openToast1('No hay comentarios para mostrar.', 'bg-danger text-white' , 'ERROR');
      this.todoTitulos1=[];
    }else{
      this.todoTitulos1 = data;
      console.log(this.todoTitulos1  );
    }
    
    setTimeout(()=>{
      this.loading = false
    },2000)
 
  });
}

idDocumentoF?:number;
editT1(item:any){
  this.tituloF=item.tituloF;
  this.idDocumentoF=item.idDocumentoF;
}


docs1:any;
tit1?:string
borrar1(item:any,docs:any){
this.docs = docs;
this.docs.show();
  this.tit=item.titulo;
  this.idDocumento=item.idDocumento;
}

eliminarD1(){
  this._empleados.eliminarD(this.idDocumento)
  .subscribe(data=>{ 
   if(data == 'success'){
     this.docs.hide();
    this.getTitulos();
    this._alerta.openToast1('Asignación eliminada.', 'bg-success text-white' , 'OK');
   }else{
     alert('No se ha podido eliminar la asignación.');
     this.docs.hide();
   }
  });
}



tituloL?:string;
idListado?:number;
addSolicitud(doc:any){
  this._empleados.addSolicitud(doc.value)
  .subscribe(data=>{ 
   
    if(data == 'success'){
      this.tituloL = '';
      this.idListado=0;
      this.getSolicitud();
    }
  });
  
}


todoSolicitud:any;
getSolicitud(){
  this._empleados.getSolicitudes(this.idServicio)
  .subscribe(data=>{ 
   
    if (data == 'error') {
      this._alerta.openToast1('No hay comentarios para mostrar.', 'bg-danger text-white' , 'ERROR');
      this.todoSolicitud=[];
    }else{
      this.todoSolicitud = data;
    }
    
 
  });
}

editSoli(item:any){
  this.tituloL=item.tituloL;
  this.idListado=item.idListado;
}

bo(idListado:any, estadoS:any){
  this._empleados.estadoSolicitudes(idListado , this.idServicio,estadoS)
  .subscribe(data=>{ 
   
    if(data == 'success'){
      this.tituloL = '';
      this.idListado=0;
      this.getSolicitud();
    }
  });
  
}


}
