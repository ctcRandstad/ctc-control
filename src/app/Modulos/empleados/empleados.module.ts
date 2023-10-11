import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './empleados/empleados.component';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MenuModule } from "../../Component/menu/menu.module";


@NgModule({
    declarations: [
        EmpleadosComponent
    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        CommonModule,
        EmpleadosRoutingModule,
        FormsModule,
        MdbFormsModule,
        MenuModule
    ]
})
export class EmpleadosModule { }
