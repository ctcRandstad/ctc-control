import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from './Services/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private authService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRole = this.authService.getUserRole();
    const allowedRoles = route.data['roles'] as Array<string>; // Obtener roles permitidos desde la ruta
    
    if (!userRole || !allowedRoles.includes(userRole)) {
      // Si estamos en la ruta /403, no hacer la redirección
      if (state.url !== '/Main/403') {
        this.router.navigate(['/Main/403']);
      }
      return false;
    }
    return true
  }
}