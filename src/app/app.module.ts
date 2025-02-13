import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MdbNotificationModule } from 'mdb-angular-ui-kit/notification';
import { MdbTableModule } from 'mdb-angular-ui-kit/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import localeEs from '@angular/common/locales/es';
import { ToastComponent } from './Component/Services/toast/toast.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { PefilModalComponent } from './Modales/pefil-modal/pefil-modal.component';
import { UbicarModalComponent } from './Modales/ubicar-modal/ubicar-modal.component';
import { AlertaModalComponent } from './Modales/alertas-modal/alerta-modal.component';
import { BajaModalComponent } from './Modales/baja-modal/baja-modal.component';
import { EliminarModalComponent } from './Modales/eliminar-modal/eliminar-modal.component';
import { AvisosComponent } from './Modales/avisos/avisos.component';
import { LoadingComponent } from './Modales/loading/loading.component';
import { HorasEComponent } from './Modulos/encargados/horas-e/horas-e.component';
import { EncargadosModalComponent } from './Modales/encargados-modal/encargados-modal.component';





export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({ declarations: [
        AppComponent,
        ToastComponent,
        PefilModalComponent,
        UbicarModalComponent,
        AlertaModalComponent,
        BajaModalComponent,
        EliminarModalComponent,
        AvisosComponent,
        LoadingComponent,
        EncargadosModalComponent,
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    imports: [FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MdbNotificationModule,
        MdbTableModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })], 
        providers: [
        AuthInterceptorService,
        { provide: LOCALE_ID, useValue: 'es-Es', },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
registerLocaleData(localeEs, 'es');
