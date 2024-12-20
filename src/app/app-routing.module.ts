import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule)
  },
 
  {
    path: 'Main',
    canActivate :[AuthGuard],
    loadChildren:()=> import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'Empleados',
    canActivate :[AuthGuard],
    loadChildren:()=> import('./Modulos/empleados/empleados.module').then(m => m.EmpleadosModule)
  },
  {
    path: 'Horas',
    canActivate :[AuthGuard],
    loadChildren:()=> import('./Modulos/horarios/horarios.module').then(m => m.HorariosModule)
  },
  {
    path: 'Cabezeras',
    canActivate :[AuthGuard],
    loadChildren:()=> import('./Modulos/cabezera/cabezera.module').then(m => m.CabezeraModule)
  },
  {
    path: 'Encargados',
    canActivate :[AuthGuard],
    loadChildren:()=> import('./Modulos/encargados/encargados.module').then(m => m.EncargadosModule)
  },
  {
    path: 'Consultas',
    canActivate :[AuthGuard],
    loadChildren:()=> import('./Modulos/consultas-anteriores/consultas-ant.module').then(m => m.ConsultasAntModule)
  },
  {
  path : '**',
  redirectTo: 'Main'

  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
