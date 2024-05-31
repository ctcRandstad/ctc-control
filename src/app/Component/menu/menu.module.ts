import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbLoadingModule } from 'mdb-angular-ui-kit/loading';
import { RouterModule } from '@angular/router';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MdbLoadingModule,
    MdbDropdownModule,
    MdbModalModule
  ],
  exports:[
    MenuComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class MenuModule { }
