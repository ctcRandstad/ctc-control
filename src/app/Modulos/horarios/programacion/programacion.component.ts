import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { HorasModalComponent } from 'src/app/Modales/horas-modal/horas-modal.component';
import { ControlHorasService } from 'src/app/Services/control-horas.service';
import { EmpleadosService } from 'src/app/Services/empleados.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import { JoinMapPipe } from 'src/app/pipes/join-map.pipe';

@Component({
  selector: 'app-programacion',

  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css'],
})
export class ProgramacionComponent implements OnInit {

  constructor(
    private ruta:Router,
    private _empleados: EmpleadosService,
    private _alerta: NotificacionService,
    private _control: ControlHorasService,
    private excelService: ExcelService,
    private modalService: MdbModalService,
  ) { }

  usuario: any;
  idServicio: any;
  ngOnInit() {
    let ser: any = localStorage.getItem(btoa('servicio'));
    let rol: any = localStorage.getItem('usuario');
    this.usuario = atob(rol);  
    this.idServicio = atob(ser);
  }

  filtarTuros: any;
  modalM: any;
  mos: boolean = false;
  filtrarModal() {
    this.modalM = this.modalService.open(HorasModalComponent, {
      containerClass: 'right',
      modalClass: 'modal-side modal-top-right',
      ignoreBackdropClick: true,
      data: {
        param: 8,
        idServicio: this.idServicio
      },
    });
    this.modalM.onClose.subscribe((message: any) => {
      if (message != 'closeMessage') {
        this.filtarTuros = message.tur;
        this.mos = true;
      } else {
        this.mos = false;
      }
    });
  }

  justi: boolean = false;
  datas: boolean = false;
  loading: boolean = false;
  todoTurnos: any[] = [];
  fechasData: any;
  mostrarBtn: boolean = false;
  programaciones: any[] = [];
  programacionesPorFecha: { [fecha: string]: any[] } = {};

  horarioMap: any = {
    'M': 1,  // Mañana
    'P': 2,  // Partido
    'T': 3,  // Tarde
    'N': 4,  // Noche
    'V': 5   // Vacaciones
  };


  validarRangoFechas(): boolean {
    const fechaInicio = new Date(this.fechasData.fechaInicio);
    const fechaFinal = new Date(this.fechasData.fechaFinal);
  
    // Calculamos la diferencia en milisegundos y la convertimos a días
    const diferenciaDias = (fechaFinal.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24);
  
    return diferenciaDias <= 7; // Retorna true si la diferencia es 7 o menor
  }

  loadingPerfil: boolean = false;
  buscar(action: any) {
    this.fechasData = action.value;
    if (this.validarRangoFechas() === false) {
      this._alerta.openToast1('EL RANGO DE FECHAS NO PUEDE SER MAYOR A 7 DÍAS', 'bg-danger text-white', 'OK');
      return;
    }
    this.loadingPerfil = true;
    this.mostrarBtn = true;


    this._empleados.consultaProgramacionJusFNoche(this.fechasData)
      .subscribe(
        (data) => {
          this.programaciones = data;

          this._empleados.consultaTurnoTotales(this.fechasData)
            .subscribe(data => {
              this.todoTurnos = data;
              this.todoTurnos.sort((a: any, b: any) => {
                return this.horarioMap[a.horario] - this.horarioMap[b.horario];
              });
              this.agruparPorFecha();
            });

          this.programaciones.sort((a, b) => {
            return this.horarioMap[a.horario] - this.horarioMap[b.horario];
          });

          if (data === 'no') {
            this.justi = false;
            this.datas = false;
            this.loading = false;

            this._alerta.openToast1(
              'LA FECHA DE INICIO ES MENOR A LA DE HOY...', 
              'bg-success text-white', 
              'OK'
            );
          } else {
            this.justi = true;
            this.mostrarBtn = false;
          }
          setTimeout(() => {
            this.loadingPerfil = false;
          }, 500);
        },
        (error) => {
          console.error('Error en la consulta:', error);
          this.loading = false;
          this._alerta.openToast1('Hubo un error al realizar la consulta', 'bg-danger text-white', 'OK');
        }
      );
  }

  agruparPorFecha(): void {
    this.programaciones.forEach(programacion => {
      if (!this.programacionesPorFecha[programacion.fechaTrabajo]) {
        this.programacionesPorFecha[programacion.fechaTrabajo] = [];
      }
      this.programacionesPorFecha[programacion.fechaTrabajo].push(programacion);
    });
  }

  pri?: boolean;
  print(printer:any) : void{
    this.pri=true;
    this._alerta.openToast1('DESCARGANDO PDF, ESPERE POR FAVOR.' , 'bg-warning text-white' , 'DESCARGA...');
    
    let DATA: any = document.getElementById('htmlData');
    const options = {
      dpi: 300,
      scale: 3,
      useCORS: true,
      logging: true
    };

    const PDF = new jsPDF('p', 'mm', 'a4');
    PDF.setFont('helvetica', 'bold');
    PDF.setFontSize(30);

    html2canvas(DATA, options).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      let pageHeight = 295;
      let currentHeight = 0;

      const FILEURI = canvas.toDataURL('image/jpeg');
      
      while (currentHeight < fileHeight) {
        PDF.addImage(FILEURI, 'JPEG', 0, currentHeight, fileWidth, pageHeight, 'FAST');
        currentHeight += pageHeight;
        
        if (currentHeight < fileHeight) {
          PDF.addPage();
        }
      }

      PDF.save('Programación' + this.fechasData.fechaInicio +'_' + this.fechasData.fechaFinal + '.pdf');
    }).catch(error => {
      console.error('Error generando el PDF:', error);
    });
  
    
   }




// Método para verificar si existe algún turno para un horario específico
tieneTurnosPorHorario(fecha: string, horario: string): boolean {
  return this.todoTurnos.some(turm => turm.fechaTrabajo === fecha && turm.horario === horario);
}

// Método para obtener los turnos de una fecha y un horario específico
getTurnosPorHorario(fecha: string, horario: string): any[] {
  return this.todoTurnos.filter(turm => turm.fechaTrabajo === fecha && turm.horario === horario);
}

// Método para obtener las personas asociadas a un turno y horario específico
getPersonasPorTurno(fecha: string, horario: string, turno_dia: number): any[] {
  return this.programaciones.filter(programacion => 
    programacion.fechaTrabajo === fecha && 
    programacion.horario === horario && 
    programacion.turno_dia === turno_dia
  );
}

getTurnosPorHorarioString(fecha: string, horario: string): string {
  const turnos = this.getTurnosPorHorario(fecha, horario);
  return turnos.map(turm => turm.turno_dia).join(', ');
}

tienePersonasConApellidos(fecha: string, horario: string, turnoDia: any): boolean {
  // Filtra las programaciones que correspondan a la fecha, al horario y al turno, y verifica si hay apellidos
  return this.getPersonasPorTurno(fecha, horario, turnoDia).some(persona => persona.apellidos && persona.apellidos.trim() !== '');
}


}
