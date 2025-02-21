import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';
import { PapeleraComponent } from './papelera/papelera.component';
import { JustiicacionesComponent } from './justiicaciones/justiicaciones.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { AddEmpleadosComponent } from './add-empleados/add-empleados.component';
import { PerfilComponent } from './papelera/perfil/perfil.component';
import { AuthGuard } from 'src/app/auth.guard';


const routes: Routes = [
  {
    path:'',
    children: [
      { path: 'Empleados' ,  component: EmpleadosComponent , canActivate: [AuthGuard] , data: { roles: ['user', 'manager' , 'viewer' , 'admin'] }},
      { path: 'Add-Empleados' ,  component: AddEmpleadosComponent , canActivate: [AuthGuard] , data: { roles: ['user', 'manager' , 'admin'] }},
      { path: 'Papelera' ,  component: PapeleraComponent , canActivate: [AuthGuard] , data: { roles: ['user', 'manager' ,  'admin'] }},
      { path: 'Perfil/:id' ,  component: PerfilComponent , canActivate: [AuthGuard] , data: { roles: ['user', 'manager' ,  'admin'] }},
      { path: 'Justificaciones' ,  component: JustiicacionesComponent , canActivate: [AuthGuard] , data: { roles: ['user', 'manager' , 'admin'] }},
      { path: 'Solicitudes' ,  component: SolicitudesComponent , canActivate: [AuthGuard] , data: { roles: ['user', 'manager'  , 'admin'] }},
      { path: '**' ,  redirectTo: 'Empleados' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
