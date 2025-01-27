import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './empleados/empleados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MenuModule } from "../../Component/menu/menu.module";
import { PapeleraComponent } from './papelera/papelera.component';
import { JustiicacionesComponent } from './justiicaciones/justiicaciones.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { MenuSComponent } from './menu-s/menu-s.component';
import { AddEmpleadosComponent } from './add-empleados/add-empleados.component';
import { MdbTableModule } from 'mdb-angular-ui-kit/table';
import { MdbSelectModule } from 'mdb-angular-ui-kit/select';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { PerfilComponent } from './papelera/perfil/perfil.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { FiltroEmpleado } from 'src/app/pipes/filtro-empleado';



@NgModule({
    declarations: [
        EmpleadosComponent,
        PapeleraComponent,
        JustiicacionesComponent,
        SolicitudesComponent,
        MenuSComponent,
        AddEmpleadosComponent,
        PerfilComponent,
        FiltroEmpleado,
      
    ],
    imports: [
        CommonModule,
        EmpleadosRoutingModule,
        FormsModule,
        MdbFormsModule,
        MenuModule,
        MdbTableModule,
        MdbSelectModule, 
        ReactiveFormsModule,
        MdbTabsModule,
        MdbAccordionModule,
        ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class EmpleadosModule { }
