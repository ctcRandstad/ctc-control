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


@NgModule({
  declarations: [
    ConsultasComponent,
    ConsultaHorarioComponent,
    MenuAComponent,
    InformesAComponent
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
