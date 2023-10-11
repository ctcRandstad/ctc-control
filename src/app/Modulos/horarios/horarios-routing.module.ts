import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorasComponent } from './horas/horas.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { AlertasComponent } from './alertas/alertas.component';

const routes: Routes = [
  {
    path:'',
    children: [
      { path: 'Control-horas-total' ,  component: HorasComponent },
      { path: 'Control-Programacion' ,  component: ProgramacionComponent },
      { path: 'Alertas' ,  component: AlertasComponent },
      { path: '**' ,  redirectTo: 'Control-horas-total' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorariosRoutingModule { }
