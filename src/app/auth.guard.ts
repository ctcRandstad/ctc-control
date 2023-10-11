import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token:any;
  constructor(
    private ruta:Router,
    ){ }
   
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.token = localStorage.getItem('token');
     
         if (!this.token) {
          localStorage.clear();
        
          this.ruta.navigate(['/auth']);
          return false;
        }
        else{
          return true;
        }
  }
}