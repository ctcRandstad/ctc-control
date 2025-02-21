import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorasComponent } from './horas/horas.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { AlertasComponent } from './alertas/alertas.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path:'',
    children: [
      { path: 'Control-horas-total' ,  component: HorasComponent , canActivate: [AuthGuard] , data: { roles: ['user', 'manager' , 'admin'] }},
      { path: 'Control-Programacion' ,  component: ProgramacionComponent , canActivate: [AuthGuard] , data: { roles: [ 'manager' , 'admin'] }},
      { path: 'Alertas' ,  component: AlertasComponent , canActivate: [AuthGuard] , data: { roles: ['user', 'manager', 'admin'] } },
      { path: '**' ,  redirectTo: 'Control-horas-total' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorariosRoutingModule { }
