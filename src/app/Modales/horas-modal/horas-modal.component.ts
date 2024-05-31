import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';

@Component({
  selector: 'app-horas-modal',
  templateUrl: './horas-modal.component.html',
  styleUrls: ['./horas-modal.component.css']
})
export class HorasModalComponent implements OnInit {
  optionsSelect: Array<any>;
  constructor(
    public modalRef: MdbModalRef<HorasModalComponent>,
    public _empleados :EmpleadosService,
    private _control : ControlHorasService,
    public _alerta :NotificacionService
  ) {
    this.optionsSelect = [
      { value: '8', label: '8 Horas' },
      { value: '7.75', label: '7.75 Horas' },
      { value: '7.50', label: '7.50 Horas' },
      { value: '7.25', label: '7.25 Horas' },
      { value: '7', label: '7 Horas' },
      { value: '6.75', label: '6.75 Horas' },
      { value: '6.50', label: '6.50 Horas' },
      { value: '6.25', label: '6.25 Horas' },
      { value: '6', label: '6 Horas' },
      { value: '5.75', label: '5.75 Horas' },
      { value: '5.50', label: '5.50 Horas' },
      { value: '5.25', label: '5.25 Horas' },
      { value: '5', label: '5 Horas' },
      { value: '4.75', label: '4.75 Horas' },
      { value: '4.50', label: '4.50 Horas' },
      { value: '4.25', label: '4.25 Horas' },
      { value: '4', label: '4 Horas' },
      { value: '3.75', label: '3.75 Horas' },
      { value: '3.50', label: '3.50 Horas' },
      { value: '3.25', label: '3.25 Horas' },
      { value: '3', label: '3 Horas' },
      { value: '2.75', label: '2.75 Horas' },
      { value: '2.50', label: '2.50 Horas' },
      { value: '2.25', label: '2.25 Horas' },
      { value: '2', label: '2 Horas' },
      { value: '1.75', label: '1.75 Horas' },
      { value: '1.50', label: '1.50 Horas' },
      { value: '1.25', label: '1.25 Horas' },
      { value: '1', label: '1 Horas' },
      { value: '0.75', label: '0.75 Horas' },
      { value: '0.50', label: '0.50 Horas' },
      { value: '0.25', label: '0.25 Horas' },

    
      ];
  }

  param: any | null = null;
  justi: any | null = null;
  valor:   any | null = null;
  horasAusentes:   any | null = null;
  horasNormales:   any | null = null;
  justiF:   any | null = null;
  idPlantillaF:   any | null = null;
  fechaTrabajo:   any | null = null;
  nEmpledo:   any | null = null;
  idServicio:   any | null = null;

  


  ngOnInit(): void {
  }


  close(): void {
    const closeMessage = 'closeMessage';
    this.modalRef.close(closeMessage)
  }


  selectedValue? :string;
  getSelectedValue(event:any){
    this.valor = event;
  }
  
  
  siCambiar(){

    
    if (this.valor > 0 ) {
      this.horasAusentes = this.valor;
      if (this.horasAusentes > this.horasNormales) {
        alert('Error de horas ausentes.')
      }else{
       this.siValidarJust(this.horasAusentes , this.horasNormales);
        this.selectedValue = '';
       
      }
      }else{
      this.modalRef.close('closeMessage');   
      }
  }

  salir(){
    this.modalRef.close('closeMessage');
  }


  siValidarJust(horasAusentes:any , horasNormales:any){
    this._control.editarJustificanteAdmin(this.justiF, this.idPlantillaF,this.fechaTrabajo, this.nEmpledo , horasAusentes , horasNormales,this.idServicio)
       .subscribe(res=>{ 
  
         if (res == 'success') {
           this._alerta.openToast1('Justificación asignada...' , 'bg-success text-white' , 'OK');
           
           this.modalRef.close('success');

         }else{
          this.modalRef.close('closeMessage');


         }
 
       });
 
     }

}
