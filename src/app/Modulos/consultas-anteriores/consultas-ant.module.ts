import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'src/app/Component/menu/menu.module';
import { ConsultasAntRoutingModule } from './consultas-ant-routing.module';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbSelectModule } from 'mdb-angular-ui-kit/select';
import { MdbTableModule } from 'mdb-angular-ui-kit/table';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { ConsultasComponent } from './consultas/consultas.component';
import { ConsultaHorarioComponent } from './consulta-horario/consulta-horario.component';
import { MenuAComponent } from './menu-a/menu-a.component';
import { InformesAComponent } from './informes-a/informes-a.component';
import { HorasSeccionAntComponent } from './informes-a/horas-seccion-ant/horas-seccion-ant.component';
import { AbsentismoAntComponent } from './informes-a/absentismo-ant/absentismo-ant.component';
import { AusentismoAntComponent } from './informes-a/ausentismo-ant/ausentismo-ant.component';
import { FichajeValidacionAntComponent } from './informes-a/fichaje-validacion-ant/fichaje-validacion-ant.component';
import { HorasExtrasAntComponent } from './informes-a/horas-extras-ant/horas-extras-ant.component';
import { HorasExtrasBolsaAntComponent } from './informes-a/horas-extras-bolsa-ant/horas-extras-bolsa-ant.component';
import { HorasNoTrabajadasAntComponent } from './informes-a/horas-no-trabajadas-ant/horas-no-trabajadas-ant.component';
import { HorasComiteAntComponent } from './informes-a/horas-comite-ant/horas-comite-ant.component';


@NgModule({
  declarations: [
    ConsultasComponent,
    ConsultaHorarioComponent,
    MenuAComponent,
    InformesAComponent,
    HorasSeccionAntComponent,
    AbsentismoAntComponent,
    AusentismoAntComponent,
    FichajeValidacionAntComponent,
    HorasExtrasAntComponent,
    HorasExtrasBolsaAntComponent,
    HorasNoTrabajadasAntComponent,
    HorasComiteAntComponent,
  ],
  imports: [
    CommonModule,
    ConsultasAntRoutingModule,
    MenuModule,
    FormsModule,
    MdbFormsModule,
    MdbTabsModule,
    MdbTableModule,
    MdbPopoverModule,
    MdbSelectModule
  ],
   schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class ConsultasAntModule { }
