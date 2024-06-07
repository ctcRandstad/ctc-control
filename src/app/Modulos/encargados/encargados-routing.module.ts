import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasEComponent } from './consultas-e/consultas-e.component';
import { HorasEComponent } from './horas-e/horas-e.component';

const routes: Routes = [
  {
    path:'',
    children: [
      { path: 'Control-horas-total?-encargados' ,  component: HorasEComponent },
      { path: 'Consultas-year?-**' ,  component: ConsultasEComponent },
      { path: '**' ,  redirectTo: 'Control-horas-total-encargados' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncargadosRoutingModule { }
