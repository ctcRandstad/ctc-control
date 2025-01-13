import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificacionService } from './Services/notificacion.service';



@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService  implements HttpInterceptor {
  constructor(
    private ruta: NotificacionService,
  ) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
  
    let token = localStorage.getItem('token');
    let rol = localStorage.getItem('rols');
    if (token) {
      req = req.clone({
        setHeaders: {
          'Authorization': `${token}`+'@@' + `${rol}`,
        }
      });
    }
    
    return next.handle( req ).pipe(
      catchError( this.manejarError )
    );
}
    

  manejarError( error: HttpErrorResponse ) {

    console.log(error);
    
   
    if(error.error['text'] == 'Failed'){
      localStorage.clear();
       location.reload();
    }
    if(error.error['text'] == 'Mal'){
      //  localStorage.clear();
      //   location.reload();
   
    }
   

     return throwError(()=>error);
  }

}

