import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabezeraRoutingModule } from './cabezera-routing.module';
import { MensajesComponent } from './mensajes/mensajes.component';
import { ConfigComponent } from './config/config.component';
import { InformesComponent } from './informes/informes.component';
import { MenuModule } from 'src/app/Component/menu/menu.module';
import { HuellaComponent } from './huella/huella.component';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTableModule } from 'mdb-angular-ui-kit/table';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbSelectModule } from 'mdb-angular-ui-kit/select';
import { AbsentismoComponent } from './informes/absentismo/absentismo.component';
import { AusentismoComponent } from './informes/ausentismo/ausentismo.component';
import { FichajeValidacionComponent } from './informes/fichaje-validacion/fichaje-validacion.component';
import { HorasExtrasComponent } from './informes/horas-extras/horas-extras.component';
import { HorasExtrasBolsaComponent } from './informes/horas-extras-bolsa/horas-extras-bolsa.component';
import { HorasNoTrabajadasComponent } from './informes/horas-no-trabajadas/horas-no-trabajadas.component';
import { HorasSeccinComponent } from './informes/horas-seccin/horas-seccin.component';
import { HorasComiteComponent } from './informes/horas-comite/horas-comite.component';


@NgModule({
  declarations: [
    MensajesComponent,
    ConfigComponent,
    InformesComponent,
    HuellaComponent,
    AbsentismoComponent,
    AusentismoComponent,
    FichajeValidacionComponent,
    HorasExtrasComponent,
    HorasExtrasBolsaComponent,
    HorasNoTrabajadasComponent,
    HorasSeccinComponent,
    HorasComiteComponent,
  ],
  imports: [
    CommonModule,
    CabezeraRoutingModule,
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
export class CabezeraModule { }
