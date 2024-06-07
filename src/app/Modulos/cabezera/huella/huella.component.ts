import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LoadingComponent } from 'src/app/Modales/loading/loading.component';
import { ConfigService } from 'src/app/Services/config.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';


@Component({
  selector: 'app-huella',
  templateUrl: './huella.component.html',
  styleUrls: ['./huella.component.css']
})
export class HuellaComponent implements OnInit {

  ubicar : MdbModalRef<LoadingComponent> | null = null;

  constructor(
    private _config:ConfigService,
    private _alerta:NotificacionService,
    private modalService: MdbModalService,
    private ruta: Router,
  ) { }
  idServicio:any;
  tipoUsuario:any;

  ngOnInit() {
   
    let ser:any = localStorage.getItem(btoa('servicio'));
    this.idServicio = atob(ser);
    let tipoUsuario:any = localStorage.getItem('rol');
    this.tipoUsuario = atob(tipoUsuario);
    if (this.tipoUsuario == 'E2020') {
      this.ruta.navigate(['Empleados']);
      return;
    }
  }



   
  files:any[]=[];

  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: '',
     fechaSubido:null,
     caducidad:null,
     idDocumento:null,
     idServicio:null,
  }

  showFiles() {
    let files = '';
    for (let i = 0; i < this.files.length; i ++) {
      files += this.files[i].name;
       if (!(this.files.length - 1 === i)) {
         files += ',';
      }
    }
    return this.files;
 }


  seleccionarArchivo(event:any) {
    var files = event.target.files;
    var file = files[0];
  
  
    if (!file.type ) {
      alert('Solo se adminten archivos con extensión .PDF');
      location.reload();
    }else{
      this.archivo.nombreArchivo = file.name;
    this.archivo.idServicio = this.idServicio;

  
      if(files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      }
  
    }
  
  }

  _handleReaderLoaded(readerEvent:any) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }


  cargar:boolean=false; 

  upload() {

    let confirmar = confirm("El sistema de fichajes se actualiza a partir de las 17:00. La subida de fichajes antes de esa hora provocará un error en las alertas, excepto si filtras manualmente el fichero.");
    if (!confirmar) {
      return;
    } else {
      if (this.archivo.nombreArchivo == null || this.archivo.nombreArchivo == undefined) {
        alert ('Archivo vacio.');
      } else {
     this.ubicar =   this.modalService.open(LoadingComponent, {
          modalClass: 'modal-dialog-centered',
          ignoreBackdropClick: true,
          
        });
        
        this._config.uploadFile(this.archivo)
        .subscribe(res=> { 
          console.log(res);
              
      
          if (res == 'success') {
            this.archivo.base64textString='';
            this.archivo.nombreArchivo=null;
            this.archivo.nombre=null;
            this.archivo.idDocumento=null;
            this.archivo.fechaSubido=null;
            this.archivo.caducidad=null;
            this._alerta.openToast1('Documento cargado correctamente.' , 'bg-success' , 'OK');
            this.ubicar?.close();
            
          } else if(res == 'errorExtencion') {
            this._alerta.openToast1('Solo se adminten archivos con extensión .CSV' , 'bg-danger' , 'ERROR');
          
          } else if(res == 'errorSubir') {
            this._alerta.openToast1('Este documento, no se ha podido subir.' , 'bg-danger' , 'ERROR');
          
          }else if(res == 'cabecera') {
            this._alerta.openToast1('Este documento tiene cabecera, bórrela.' , 'bg-danger' , 'ERROR');
          
          }
         
        });
      }
      
    }
  
      // location.reload();
  }



}
