import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';


const routes: Routes = [
  {
    path:'',
    children: [
      { path: 'Empleados' ,  component: EmpleadosComponent },
      { path: '**' ,  redirectTo: 'Empleados' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
