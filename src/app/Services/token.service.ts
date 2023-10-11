import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor( private http:HttpClient) {}

  url = environment.url;

  getToken(token:any): Observable<any>{
   return this.http.post(this.url +"Config/validadrCorreo.php" , {token:'token'})
   .pipe(
     map((e)=> { 
 
       return e
     }));
 }

 getSesion(idLog:any,perfil:any){
  return this.http.post(this.url +"Sesion/sesionController.php?id=getSesion" , {'idLog':idLog, 'perfil':perfil})
  .pipe(
    map((e)=> { 

      return e
    }));
}

//  getTraba(idServicio:any): Observable<any>{
//   return this.http.get("http://localhost/ctc/controlHorarioApi/Controller/empleados/empleados.php?id=getEmpleadosWeb12Activos" )
//   .pipe(
//     map((e)=> { 

//       return e
//     }));
// }
}
