import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MensajesComponent } from './mensajes/mensajes.component';
import { ConfigComponent } from './config/config.component';
import { HuellaComponent } from './huella/huella.component';
import { InformesComponent } from './informes/informes.component';
import { HorasSeccinComponent } from './informes/horas-seccin/horas-seccin.component';
import { HorasNoTrabajadasComponent } from './informes/horas-no-trabajadas/horas-no-trabajadas.component';
import { FichajeValidacionComponent } from './informes/fichaje-validacion/fichaje-validacion.component';
import { HorasComiteComponent } from './informes/horas-comite/horas-comite.component';
import { HorasExtrasBolsaComponent } from './informes/horas-extras-bolsa/horas-extras-bolsa.component';
import { AusentismoComponent } from './informes/ausentismo/ausentismo.component';
import { AbsentismoComponent } from './informes/absentismo/absentismo.component';
import { HorasExtrasComponent } from './informes/horas-extras/horas-extras.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path:'',
    children: [
      { path: 'Mensajes' ,  component: MensajesComponent , canActivate: [AuthGuard] , data: { roles: ['user',  'admin'] } },
      { path: 'Config' ,  component: ConfigComponent , canActivate: [AuthGuard] , data: { roles: [ 'admin'] } },
      { path: 'Huellas' ,  component: HuellaComponent , canActivate: [AuthGuard] , data: { roles: ['user' , 'admin'] } },
      { path: 'Informes' ,  component: InformesComponent , canActivate: [AuthGuard] , data: { roles: ['user', 'manager', 'admin'] },
          children:[
          
            { path: 'HS' ,  component: HorasSeccinComponent },
            { path: 'HNT' ,  component: HorasNoTrabajadasComponent },
            { path: 'HE' ,  component: HorasExtrasComponent },
            { path: 'ABSENTISMO' ,  component: AbsentismoComponent },
            { path: 'AUSENTISMO' ,  component: AusentismoComponent },
            { path: 'HEBOLSA' ,  component: HorasExtrasBolsaComponent },
            { path: 'horasComite' ,  component: HorasComiteComponent },
            { path: 'validacion-fichajes' ,  component: FichajeValidacionComponent },
          ]
     },
      { path: '**' ,  redirectTo: 'Mensajes' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabezeraRoutingModule { }
