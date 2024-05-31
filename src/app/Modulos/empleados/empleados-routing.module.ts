import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';
import { PapeleraComponent } from './papelera/papelera.component';
import { JustiicacionesComponent } from './justiicaciones/justiicaciones.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { AddEmpleadosComponent } from './add-empleados/add-empleados.component';
import { PerfilComponent } from './papelera/perfil/perfil.component';


const routes: Routes = [
  {
    path:'',
    children: [
      { path: 'Empleados' ,  component: EmpleadosComponent },
      { path: 'Add-Empleados' ,  component: AddEmpleadosComponent },
      { path: 'Papelera' ,  component: PapeleraComponent },
      { path: 'Perfil/:id' ,  component: PerfilComponent },
      { path: 'Justificaciones' ,  component: JustiicacionesComponent },
      { path: 'Solicitudes' ,  component: SolicitudesComponent },
      { path: '**' ,  redirectTo: 'Empleados' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
