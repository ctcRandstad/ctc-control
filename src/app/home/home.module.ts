import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MdbLoadingModule } from 'mdb-angular-ui-kit/loading';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';



import { MainComponent } from './main/main.component';
import { MenuModule } from '../Component/menu/menu.module';
import { FormsModule } from '@angular/forms';
import { ForbiddenComponent } from './forbidden/forbidden.component';



@NgModule({
  declarations: [
    MainComponent,
    ForbiddenComponent
  ],
  imports: [
    MenuModule,
    MdbLoadingModule,
    MdbDropdownModule,
    FormsModule,
    CommonModule,
    HomeRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    })
  ],
  schemas: [ NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class HomeModule { }
