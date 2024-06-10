import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConfigService } from 'src/app/Services/config.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import { PefilModalComponent } from '../pefil-modal/pefil-modal.component';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { MdbTableDirective } from 'mdb-angular-ui-kit/table';

@Component({
  selector: 'app-encargados-modal',
  templateUrl: './encargados-modal.component.html',
  styleUrls: ['./encargados-modal.component.css']
})
export class EncargadosModalComponent implements OnInit {
  @ViewChild('table') table!: MdbTableDirective<any>;
  param: any | null = null;
  comentEmp: any | null = null;
  nombre: any | null = null;
  apellidos: any | null = null;
  idServicio: any | null = null;
  habilitarE: any | null = null;
  habilitarE1: any | null = null;
  habilitarE11: any | null = null;
  fecha: any | null = null;

  empleadoList: any | null = null;
  visua: any | null = null;
  constructor(
    public modalRef: MdbModalRef<PefilModalComponent>,
    public _empleados:EmpleadosService,
    public _config:ConfigService,
    public _alerta:NotificacionService,
    private  _control :ControlHorasService,

  ) { }

  advancedSearch(value: string): void {
    this.table.search(value);
  }

  ngOnInit(): void {
    this.getContolHoras();
    
  }

  siEditar1(){
  
    if (this.habilitarE1) {
      this.modalRef.close('habilitarE1F');
      } else {
      this.modalRef.close('habilitarE1T');
    }
  }

  siEditar(){

    if (this.habilitarE) {
    this.modalRef.close('habilitarEF');
    } else {
      this.modalRef.close('habilitarET');

    }

  }

  siEditar11(){
  
    if (this.habilitarE11) {
      this.modalRef.close('habilitarE11F');
    } else {
      this.modalRef.close('habilitarE11T');
    }
  }

  
fechaF:any;
empleadoF:any;
comentF:any;
addInfoError(infoError:any){
  if (infoError.value.fecha > this.fecha) {
    alert('No puedes adivinar el futuro!!!')
  } else {
    this._control.addErrorInfo( infoError.value)
    .subscribe(data=>{ 
        if (data == 'success') {
          this.fechaF = null;
          this.empleadoF = null;
          this.comentF = null;
          this._alerta.openToast1('Informe de error correcto...', 'bg-success text-white' , 'OK');
          
        } else {
          this.modalRef.close('closeMessage');
        }  
  });
  }
}


  no(){
    this.modalRef.close('error');
  }

  horas:any;
  // horas disponibles
  hora1?:boolean
  hora2?:boolean
  hora3?:boolean
  hora4?:boolean
  hora5?:boolean
  hora6?:boolean
  hora7?:boolean
  hora8?:boolean
  hora9?:boolean

  //bolsa de horas
  bolsa1?:boolean;
  bolsa2?:boolean;
  bolsa3?:boolean;
  bolsa4?:boolean;
  bolsa5?:boolean;
  //plus
  plus1?:boolean;
  plus2?:boolean;
  plus3?:boolean;

  getContolHoras(){
  this._control.configHoras(this.idServicio)
  .subscribe(data=>{
    this.horas = data;

    for (let i = 0; i < this.horas.length; i++) {
  
      if (this.horas[i].columna == 'hora1') {
        this.hora1 = true;
      }
      
      if (this.horas[i].columna == 'hora2') {
      this.hora2 = true;
      }
      if (this.horas[i].columna == 'hora3') {
      this.hora3 = true;
      }
      if (this.horas[i].columna == 'hora4') {
      this.hora4 = true;
      }
      if (this.horas[i].columna == 'hora5') {
      this.hora5 = true;
      }
      
      if (this.horas[i].columna == 'hora6') {
      this.hora6 = true;
      }
      if (this.horas[i].columna == 'hora7') {
      this.hora7 = true;
      }
      if (this.horas[i].columna == 'hora8') {
      this.hora8 = true;
      }
      if (this.horas[i].columna == 'hora9') {
      this.hora9 = true;
      }
      if (this.horas[i].columna == 'bolsa1') {
        this.bolsa1 = true;
      }
      if (this.horas[i].columna == 'bolsa2') {
        this.bolsa2 = true;
      }
      if (this.horas[i].columna == 'bolsa3') {
        this.bolsa3 = true;
      }
      if (this.horas[i].columna == 'bolsa4') {
        this.bolsa4 = true;
      }
      if (this.horas[i].columna == 'bolsa5') {
        this.bolsa5 = true;
      }

      if (this.horas[i].columna == 'plus1') {
        this.plus1 = true;
      }
      if (this.horas[i].columna == 'plus2') {
        this.plus2 = true;
      }
      if (this.horas[i].columna == 'plus3') {
        this.plus3 = true;
      }
  
}
     })
  }


  

}
