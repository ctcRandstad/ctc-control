import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';

@Component({
  selector: 'app-ubicar-modal',
  templateUrl: './ubicar-modal.component.html',
  styleUrls: ['./ubicar-modal.component.css']
})
export class UbicarModalComponent implements OnInit {
 
  constructor(
    public modalRef: MdbModalRef<UbicarModalComponent>,
    private _noti:NotificacionService,
    private _empleados:EmpleadosService,

    ) {}

    
    archivo = {
      nombre: null,
      nombreArchivo: null,
      base64textString: '',
       fechaSubido:'',
       caducidad:'',
       idDocumento:null,
       idServicio:null,
    }

 
    idDocumento: any | null = null;
    nEmpleado: any | null = null;
    idServicio: any | null = null;
    caduDocu: any | null = null;
  
    
        
    ngOnInit(): void {
      this.archivo.idDocumento =this.idDocumento;
      this.archivo.idServicio =this.idServicio;
      this.archivo.nombre =this.nEmpleado;
  
  }



  out(){
      this.archivo.base64textString='';
      this.archivo.nombreArchivo=null;
      this.archivo.nombre=null;
      this.archivo.idDocumento=null;
      this.archivo.fechaSubido='';
      this.archivo.caducidad='';  
    this.modalRef.close();
    
  }

cargar:boolean=false;
  upload() {
  
    if (this.archivo.nombreArchivo == null || this.archivo.nombreArchivo == undefined) {
      alert ('Archivo vacio.');
    } else {
      if(this.archivo.caducidad != ""){
        if(this.archivo.caducidad < this.archivo.fechaSubido){
            return  alert ('Error de fechas.');
        }

      }

      this._empleados.uploadFile(this.archivo)
      .subscribe(res=> {
       
        if (res == 'success') {
          this.cargar = true;
          // this.getDocu(this.archivo.nombre);
          this.archivo.base64textString='';
          this.archivo.nombreArchivo=null;
          this.archivo.nombre=null;
          this.archivo.idDocumento=null;
          this.archivo.fechaSubido='';
          this.archivo.caducidad='';
          this.cargar = false;
         
          this._noti.openToast1('Documento cargado correctamente.' ,'bg-success text-white' ,'Documento');
          this.modalRef.close('success');
        } else if(res == 'repe') {
          this._noti.openToast1('Este documento, ya fue cargado. Si quiere  volver a cargar un documento nuevo, por favor elimine el antiguo.','bg-danger text-white' ,'ERROR');
         this.out();
        } else if(res == 'errorSubir') {
          this._noti.openToast1('Este documento, no se ha podido subir.','bg-danger text-white' ,'ERROR');
         this.out();
        }
       
      });
    }
      // location.reload();
  }


  seleccionarArchivo(event:any) {
    var files = event.target.files;
    var file = files[0];
  
  // return console.log(file.type);
  
    if (!file.type ) {
      alert('Solo se adminten archivos con extensión .PDF');
      location.reload();
    }else{
      this.archivo.nombreArchivo = file.name;
  
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
  

}
