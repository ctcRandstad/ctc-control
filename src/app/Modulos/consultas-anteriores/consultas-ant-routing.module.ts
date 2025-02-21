import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasComponent } from './consultas/consultas.component';
import { ConsultaHorarioComponent } from './consulta-horario/consulta-horario.component';
import { InformesAComponent } from './informes-a/informes-a.component';
import { HorasExtrasAntComponent } from './informes-a/horas-extras-ant/horas-extras-ant.component';
import { HorasSeccionAntComponent } from './informes-a/horas-seccion-ant/horas-seccion-ant.component';
import { HorasNoTrabajadasAntComponent } from './informes-a/horas-no-trabajadas-ant/horas-no-trabajadas-ant.component';
import { FichajeValidacionAntComponent } from './informes-a/fichaje-validacion-ant/fichaje-validacion-ant.component';
import { HorasComiteAntComponent } from './informes-a/horas-comite-ant/horas-comite-ant.component';
import { HorasExtrasBolsaAntComponent } from './informes-a/horas-extras-bolsa-ant/horas-extras-bolsa-ant.component';
import { AusentismoAntComponent } from './informes-a/ausentismo-ant/ausentismo-ant.component';
import { AbsentismoAntComponent } from './informes-a/absentismo-ant/absentismo-ant.component';
import { AuthGuard } from 'src/app/auth.guard';


const routes: Routes = [
  {
    path:'',
    children: [
      { path: 'Consultas-Anteriores' ,  component: ConsultasComponent  , canActivate: [AuthGuard] , data: { roles: ['user', 'manager' , 'admin'] }},
      { path: 'Consultas-Anteriores-Horarios' ,  component: ConsultaHorarioComponent  , canActivate: [AuthGuard] , data: { roles: ['user', 'manager' , 'admin'] }},
      { path: 'Consultas-Anteriores-Informes' ,  component: InformesAComponent,  canActivate: [AuthGuard] , data: { roles: ['user', 'manager' , 'admin'] },
        children:[
          { path: 'HS-A' ,  component: HorasSeccionAntComponent },
          { path: 'HNT-A' ,  component: HorasNoTrabajadasAntComponent },
          { path: 'HE-A' ,  component: HorasExtrasAntComponent },
          { path: 'ABSENTISMO-A' ,  component: AbsentismoAntComponent },
          { path: 'AUSENTISMO-A' ,  component: AusentismoAntComponent },
          { path: 'HEBOLSA-A' ,  component: HorasExtrasBolsaAntComponent },
          { path: 'horasComite-A' ,  component: HorasComiteAntComponent },
          { path: 'validacion-fichajes-A' ,  component: FichajeValidacionAntComponent },
        ]
       },
      { path: '**' ,  redirectTo: 'Consultas-Anteriores' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasAntRoutingModule { }
