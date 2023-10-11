import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {


  constructor( private http:HttpClient) {

  }
 url = environment.url;
  token = localStorage.getItem('token');
 getServicio(idServicio:number){
  return this.http.post(this.url +"config/config.php?id=getServicio", {'idServicio': idServicio})
  .pipe(
    map((e)=> {
    
      return e
    }));
  }

  getConfogHoras(idServicio:number){
    return this.http.post(this.url +"config/config.php?id=getConfogHoras", {'idServicio':idServicio})
    .pipe(
      map((e)=> {
      
        return e
      }));
    }

  
  editServicio( datas:any):Observable<any>{
    return this.http.post(this.url +"config/config.php?id=editServicio", datas)
    .pipe(
      map((e)=> {  
        
        return e;
      }));
    }
    
    editTurnos( datas:any):Observable<any>{
      return this.http.post(this.url +"config/config.php?id=editTurnos", datas)
      .pipe(
        map((e)=> {  
      return e;
    }));
  }

  editPuestos( datas:any):Observable<any>{
    return this.http.post(this.url +"config/config.php?id=editPuestos", datas)
    .pipe(
      map((e)=> {  
        
    return e;
  }));
}
editConvenios( datas:any):Observable<any>{
  return this.http.post(this.url +"config/config.php?id=editConvenios", datas)
  .pipe(
    map((e)=> {  
  return e;
}));
}

editJustifi( datas:any):Observable<any>{
  return this.http.post(this.url +"config/config.php?id=editJustifi", datas)
  .pipe(
    map((e)=> {  
  return e;
}));
}

addContratos( datas:any):Observable<any>{
  return this.http.post(this.url +"config/config.php?id=addContratos", datas)
  .pipe(
    map((e)=> {  
  return e;
}));
}


getListadoContarto(idServicio:number){
  return this.http.post(this.url +"config/config.php?id=getListadoContarto", {'idServicio': idServicio})
  .pipe(
    map((e)=> {
      
      return e
    }));
  }
  
  bajaContratos( idContrato:any):Observable<any>{
    return this.http.post(this.url +"config/config.php?id=bajaContratos", {'idContrato' : idContrato})
    .pipe(
      map((e)=> {  
        return e;
      }));
    }
    
    estadoHoras( idHora:any, estadoColumna:any):Observable<any>{
      return this.http.post(this.url +"config/config.php?id=estadoHoras", {'idHora' : idHora , 'estadoColumna' :estadoColumna})
      .pipe(
        map((e)=> {  
          return e;
        }));
      }
      
      editarDesHoras( datas:any):Observable<any>{
        return this.http.post(this.url +"config/config.php?id=editarDesHoras", datas)
        .pipe(
          map((e)=> {  
        return e;
      }));
      }

      getComentario(desde:any, hasta:any,idServicio:number):Observable<any>{
        return this.http.post(this.url +"app/app.php?id=getComentarioAll" , {'desde' : desde, 'hasta':hasta,'idServicio': idServicio })
        .pipe(
          map((e)=> {  
            return e
          }));
      }
      getComentarioN(idServicio:number):Observable<any>{
        return this.http.post(this.url +"app/app.php?id=getComentarioAllN",{'idServicio': idServicio })
        .pipe(
          map((e)=> {  
            return e
          }));
      }

      abriM( nEmpleado:number,idMensaje:any):Observable<any>{
        return this.http.post(this.url +"app/app.php?id=abriM", {'nEmpleado' : nEmpleado, 'idMensaje':idMensaje})
        .pipe(
          map((e)=> {  
            return e;
          }));
        }
        
        comentarM( nEmpleado:number,idMensaje:any,respuesta:any):Observable<any>{
          return this.http.post(this.url +"app/app.php?id=comentarM", {'nEmpleado' : nEmpleado, 'idMensaje':idMensaje , 'respuesta':respuesta})
          .pipe(
            map((e)=> {  
              return e;
            }));
          }

          uploadFile(archivo:any) {
            return this.http.post(this.url +"config/config.php?id=fichajePersonal", archivo)
            .pipe(
              map((e)=>{
            //  console.log(e);
             
                return e;;
              })
            )
          }
        
      
    }
    