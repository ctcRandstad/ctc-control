import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorariosRoutingModule } from './horarios-routing.module';
import { ProgramacionComponent } from './programacion/programacion.component';
import { HorasComponent } from './horas/horas.component';
import { MenuModule } from 'src/app/Component/menu/menu.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { AlertasComponent } from './alertas/alertas.component';
import { MdbTableModule } from 'mdb-angular-ui-kit/table';
import { MdbSelectModule } from 'mdb-angular-ui-kit/select';
import { HorasModalComponent } from 'src/app/Modales/horas-modal/horas-modal.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { DataFilterPipe } from 'src/app/pipes/data-filter.pipe';


@NgModule({
  declarations: [
    ProgramacionComponent,
    HorasComponent,
    AlertasComponent,
    HorasModalComponent,
    DataFilterPipe
  ],
  imports: [
    CommonModule,
    HorariosRoutingModule,
    MenuModule,
    MdbSelectModule, 
    FormsModule,
    MdbFormsModule,
    ReactiveFormsModule,
    MdbTableModule,
    MdbTabsModule,
    MdbAccordionModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class HorariosModule { }
