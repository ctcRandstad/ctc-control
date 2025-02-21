import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; // Para hacer redirección en caso de error

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
  
    // Si el token está disponible, se agrega al header Authorization
    if (token) {
      req = req.clone({
        setHeaders: {
          'Authorization': `${token}`, // Mejor usar Bearer si es un token JWT
        }
      });
    }
    
    return next.handle(req).pipe(
      catchError(this.manejarError.bind(this)) // Se debe asegurar que 'this' está correctamente enlazado
    );
  }

  manejarError(error: HttpErrorResponse) {
    console.log('Error:', error.status);

    // Si el error es 403, redirige a la página de acceso denegado
    if (error.status === 403) {
      console.log('Acceso denegado');
      this.router.navigate(['/Main/403']); // Asegúrate de que la ruta '/Main/403' exista en tu enrutador
    }
    
    // Si el error tiene un mensaje específico "Failed"
    if (error.error?.text === 'Failed') {
      console.log('Error "Failed" recibido');
      // Aquí puedes hacer un manejo específico, por ejemplo, cerrar sesión o redirigir
      localStorage.clear(); // Limpiar los datos locales
      location.reload(); // Recargar la página
    }
    
    // Si el error tiene un mensaje específico "Mal"
    if (error.error?.text === 'Mal') {
      console.log('Error "Mal" recibido');
      // También puedes limpiar el localStorage y recargar la página si es necesario
      localStorage.clear();
      location.reload();
    }

    // Retornar el error para que pueda ser manejado más arriba si es necesario
    return throwError(() => error);
  }
}
