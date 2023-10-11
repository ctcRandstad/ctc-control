import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor( private http:HttpClient) {}
  url = environment.url;
 
  getPerfiles(orden:any,columna:any): Observable<any>{
    return this.http.post(this.url +"Perfil/perfilController.php?id=getPerfiles", {'orden':orden,'columna':columna})
    .pipe(
      map((e)=> { 
        return e
      }));
  }
 

 
 addPerfil(data:any): Observable<any>{
  return this.http.post(this.url +"Perfil/perfilController.php?id=addPerfiles" , data)
  .pipe(
    map((e)=> { 

      return e
    }));
}

getRutaByIdPerfil(idPerfil:any): Observable<any>{
  return this.http.post(this.url +"Perfil/perfilController.php?id=getRutaByIdPerfil", {'idPerfil':idPerfil})
  .pipe(
    map((e)=> { 
      return e
    }));
}

activarPerfil(idPerfil:any,idLog:any): Observable<any>{
  return this.http.post(this.url +"Perfil/perfilController.php?id=activarPerfil", {'idPerfil':idPerfil,'idLog':idLog})
  .pipe(
    map((e)=> { 
      return e
    }));
}


getConatadores(){
  return this.http.get(this.url +"Perfil/perfilController.php?id=getConatadores")
    .pipe(
      map((e)=> { 
        return e
      }));
}


getBobinas(orden:any,columna:any): Observable<any>{
  return this.http.post(this.url +"Perfil/perfilController.php?id=getBobinas", {'orden':orden,'columna':columna})
  .pipe(
    map((e)=> { 
      return e
    }));
}

ubicarBobinas(of:any,ancho_real:any,ubicacion:any,instruccion:any,user:any): Observable<any>{
  return this.http.post(this.url +"Perfil/perfilController.php?id=ubicarBobinas", 
  {'of':of,'ancho_real':ancho_real, 'ubicacion':ubicacion,'instruccion':instruccion, 'user':user})
  .pipe(
    map((e)=> { 
      return e
    }));
}

getUbicaciones(orden:any,columna:any , web:number): Observable<any>{
  return this.http.post(this.url +"Ubicacion/ubicacionController.php?id=getUbicaciones", {'orden':orden,'columna':columna , 'web':web})
  .pipe(
    map((e)=> { 

      return e
    }));
}

getUbicacionesParam(param:any): Observable<any>{
  return this.http.post(this.url +"Ubicacion/ubicacionController.php?id=getUbicacionesParam", {'param':param})
  .pipe(
    map((e)=> { 

      return e
    }));
}
getOf(){
  return this.http.get(this.url +"Perfil/perfilController.php?id=getOf")
    .pipe(
      map((e)=> { 
        return e
      }));
}


 
getReubicarBobinas(data:any): Observable<any>{
  return this.http.post(this.url +"Perfil/perfilController.php?id=getReubicarBobinas" , data)
  .pipe(
    map((e)=> { 

      return e
    }));
}


setReubicarBobina(data:any): Observable<any>{
  return this.http.post(this.url +"Perfil/perfilController.php?id=setReubicarBobina", data)
  .pipe(
    map((e)=> { 
      return e
    }));
}

cambioEstado(valor:any,idBobinadora:any): Observable<any>{
  return this.http.post(this.url +"Perfil/perfilController.php?id=cambioEstado", {'valor':valor,'idBobinadora':idBobinadora})
  .pipe(
    map((e)=> { 

      return e
    }));
}



getSolicitudes(valor:any,solicitud:string, idMaquina:number){
  return this.http.post(this.url +"Perfil/perfilController.php?id=getSolicitudes" ,{'valor' :valor , 'solicitud' :solicitud, 'idMaquina':idMaquina} )
  .pipe(
    map((e)=> { 
      return e
   }));
}

getSolicitudesMaquina(){
  return this.http.get(this.url +"Cortadoras/cortadorasController.php?id=getSolicitudesMaquina" )
  .pipe(
    map((e)=> { 
      return e
   }));
}


setSolicitudes(valor:any,base:any,idJaula:number , idSolicitud:number){
  return this.http.post(this.url +"Perfil/perfilController.php?id=setSolicitudes" ,{'valor' :valor , 'base':base , 'idJaula':idJaula ,'idSolicitud':idSolicitud} )
  .pipe(
    map((e)=> { 
      return e
   }));
}

getUbicacionBobinas(of:any,ancho_real:any,instruccion:any): Observable<any>{
  return this.http.post(this.url +"Perfil/perfilController.php?id=getUbicacionBobinas", {'of':of,'ancho_real':ancho_real,'instruccion':instruccion})
  .pipe(
    map((e)=> { 
      return e
    }));
}

getBobinasById(of:any,ancho_real:any): Observable<any>{
  return this.http.post(this.url +"Perfil/perfilController.php?id=getBobinasById", {'of':of,'ancho_real':ancho_real})
  .pipe(
    map((e)=> { 
      return e
    }));
}



setUbicacionBobinas(data:any ): Observable<any>{
  return this.http.post(this.url +"Perfil/perfilController.php?id=setUbicacionBobinas", data)
  .pipe(
    map((e)=> { 
      return e
    }));
}

setSolicitudUbicacionBobinas(data:any ): Observable<any>{
  return this.http.post(this.url +"Perfil/perfilController.php?id=setSolicitudUbicacionBobinas", data)
  .pipe(
    map((e)=> { 
      return e
    }));
}

setSolicitudUbicacionBobinas1(data:any ): Observable<any>{
  return this.http.post(this.url +"Perfil/perfilController.php?id=setSolicitudUbicacionBobinas1", data)
  .pipe(
    map((e)=> { 
      return e
    }));
}

getBobinasInstruccion(){
  return this.http.get(this.url +"Buma/bumaController.php?id=getBobinasInstruccion")
    .pipe(
      map((e)=> { 
        return e
      }));
}

getDetailBobinas(of:any,ancho_real:any,instruccion:any, idMaquina:number): Observable<any>{
  return this.http.post(this.url +"Buma/bumaController.php?id=getDetailBobinas", {'of':of,'ancho_real':ancho_real,'instruccion':instruccion , 'idMaquina' :idMaquina})
  .pipe(
    map((e)=> { 
      return e
    }));
}

maquina(idPerfil:any): Observable<any>{
  return this.http.post(this.url +"Ubicacion/ubicacionController.php?id=maquina", {'idPerfil':idPerfil})
  .pipe(
    map((e)=> { 

      return e
    }));
}


setRequestBobinas(data:any){
  return this.http.post(this.url +"Buma/bumaController.php?id=setRequestBobinas", data)
    .pipe(
      map((e)=> { 
        return e
      }));
}

trashRequest(data:any){
  return this.http.post(this.url +"Buma/bumaController.php?id=trashRequest", data)
    .pipe(
      map((e)=> { 
        return e
      }));
}

getConceptos(orden:any,columna:any,estado:number): Observable<any>{
  return this.http.post(this.url +"Perfil/perfilController.php?id=getConceptos", {'orden':orden,'columna':columna, 'estado':estado})
  .pipe(
    map((e)=> { 

      return e
    }));
}


bajaBobinas(data:any): Observable<any>{
  return this.http.post(this.url +"Estadisticas/estadisticasController.php?id=bajaBobinas" , data)
  .pipe(
    map((e)=> { 

      return e
    }));
}

getEstraza(){
  return this.http.get(this.url +"Buma/bumaController.php?id=getEstraza")
    .pipe(
      map((e)=> { 
        return e
      }));
}

setRequestEstraza(data:any){
  return this.http.post(this.url +"Buma/bumaController.php?id=setRequestEstraza", data)
    .pipe(
      map((e)=> { 
        return e
      }));
}

verSolicitud(instruccion:any,anch_real:any): Observable<any>{
  return this.http.post(this.url +"Buma/bumaController.php?id=verSolicitud", {'instruccion':instruccion,'anch_real':anch_real})
  .pipe(
    map((e)=> { 

      return e;
    }));
}


getBobinasOf(idMaquina:number){
  return this.http.post(this.url +"Cortadoras/cortadorasController.php?id=getBobinasOf" , {'idMaquina':idMaquina})
    .pipe(
      map((e)=> { 
        return e
      }));
}

getBobinasOfPendiente(idMaquina:number){
  return this.http.post(this.url +"Cortadoras/cortadorasController.php?id=getBobinasOfPendiente" , {'idMaquina':idMaquina})
    .pipe(
      map((e)=> { 
        return e
      }));
}

consultarOf(data:any): Observable<any>{
  return this.http.post(this.url +"Buma/bumaController.php?id=consultarOf", data)
  .pipe(
    map((e)=> { 
      return e
    }));
}

bajaTotal(data:any){
  return this.http.post(this.url +"Cortadoras/cortadorasController.php?id=bajaTotal" , data)
    .pipe(
      map((e)=> { 
        return e
      }));
}


bajaTotalBuma(data:any){
  return this.http.post(this.url +"Cortadoras/cortadorasController.php?id=bajaTotalBuma" , data)
    .pipe(
      map((e)=> { 
        return e
      }));
}

gabiaRecorte(idMaquina:number,user:string){
  return this.http.post(this.url +"Cortadoras/cortadorasController.php?id=gabiaRecorte" , {'idMaquina':idMaquina, 'user':user})
    .pipe(
      map((e)=> { 
        return e
      }));
}

elimSoli(idSolicitud:any): Observable<any>{
  return this.http.post(this.url +"Ubicacion/ubicacionController.php?id=elimSoli", {'idSolicitud':idSolicitud})
  .pipe(
    map((e)=> { 

      return e
    }));
}



}
