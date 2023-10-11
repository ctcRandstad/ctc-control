import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService  implements HttpInterceptor {
  constructor(
    private router: Router,
    private http:HttpClient,
  ) {}
  url = environment.url;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // console.log('Interceptor');
  
    let token = localStorage.getItem('token');
    let idLog = localStorage.getItem('idLog');
    
    
    if (idLog) {
      req = req.clone({
        setHeaders: {
          'Content-Type': `${idLog}`
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
     return throwError(()=>error);
  }

}

