
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor( private router: Router) { }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si el token existe
  }

  // Obtener el rol del usuario desde el token (suponiendo que el rol está en el JWT)
  getUserRole(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeJwt(token);
      return decodedToken.data.rol; // Aquí debes cambiar 'role' por la propiedad que tenga tu JWT
    }else{
      this.router.navigate(['/auth/login']); // Redirige a página prohibida si el rol no está permitido
    }
    return '';
  }

  // Decodificar el JWT
  decodeJwt(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  // Cerrar sesión (eliminar el token)
  logout() {
    localStorage.removeItem('token');
    location.reload();
  }
}
