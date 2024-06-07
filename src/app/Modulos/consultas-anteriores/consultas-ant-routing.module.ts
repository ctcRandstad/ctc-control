import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasComponent } from './consultas/consultas.component';
import { ConsultaHorarioComponent } from './consulta-horario/consulta-horario.component';
import { InformesAComponent } from './informes-a/informes-a.component';


const routes: Routes = [
  {
    path:'',
    children: [
      { path: 'Consultas-Anteriores' ,  component: ConsultasComponent },
      { path: 'Consultas-Anteriores-Horarios' ,  component: ConsultaHorarioComponent },
      { path: 'Consultas-Anteriores-Informes' ,  component: InformesAComponent },
      { path: '**' ,  redirectTo: 'Consultas-Anteriores' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasAntRoutingModule { }
