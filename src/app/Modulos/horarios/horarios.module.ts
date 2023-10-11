import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorariosRoutingModule } from './horarios-routing.module';
import { ProgramacionComponent } from './programacion/programacion.component';
import { HorasComponent } from './horas/horas.component';
import { MenuModule } from 'src/app/Component/menu/menu.module';
import { AlertasComponent } from './alertas/alertas.component';


@NgModule({
  declarations: [
    ProgramacionComponent,
    HorasComponent,
    AlertasComponent
  ],
  imports: [
    CommonModule,
    HorariosRoutingModule,
    MenuModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class HorariosModule { }
