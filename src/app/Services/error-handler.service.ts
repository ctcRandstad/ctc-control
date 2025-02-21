// error-handler.service.ts
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root' // 💡 Esto permite que el servicio se inyecte en toda la app sin necesidad de importarlo en providers
})
export class ErrorHandlerService {
  constructor() {}

  public handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '⚠️ Error desconocido. Inténtalo más tarde.';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `🔴 Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400: errorMessage = '❌ Petición incorrecta.'; break;
        case 401: errorMessage = '🔒 No autorizado.'; break;
        case 403: errorMessage = '🚫 Acceso denegado.'; break;
        case 404: errorMessage = '🔍 No encontrado.'; break;
        case 500: errorMessage = '🔥 Error del servidor.'; break;
      }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
