import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path:'',
    children: [
      { path: 'home' ,  component: MainComponent , canActivate: [AuthGuard] , data: { roles: ['admin', 'manager' , 'user'] }},
      { path: '403' ,  component: ForbiddenComponent , canActivate: [AuthGuard] , data: { roles: ['user', 'manager' , 'viewer' , 'admin'] }},
      { path: '**' ,  redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
