import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncargadosRoutingModule } from './encargados-routing.module';
import { ConsultasEComponent } from './consultas-e/consultas-e.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbSelectModule } from 'mdb-angular-ui-kit/select';
import { MdbTableModule } from 'mdb-angular-ui-kit/table';
import { MenuModule } from 'src/app/Component/menu/menu.module';
import { HorasEComponent } from './horas-e/horas-e.component';
import { MdbNotificationModule } from 'mdb-angular-ui-kit/notification';



@NgModule({
  declarations: [
    HorasEComponent,
    ConsultasEComponent,
    // DataFilterPipe
  ],
  imports: [
    CommonModule,
    EncargadosRoutingModule,
    MenuModule,
    MdbSelectModule, 
    FormsModule,
    MdbFormsModule,
    ReactiveFormsModule,
    MdbTableModule,
    MdbNotificationModule 
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class EncargadosModule { }
