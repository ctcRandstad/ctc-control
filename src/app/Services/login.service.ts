import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../Models/usuario';
import {io , Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor( private http:HttpClient) 
  { 
    // this.socket = io(this.server);
  }
 url = environment.url;

 
 socket:any;
//  server = 'http://192.168.88.58:3000';
 server = 'http://92.54.11.138:3000';


 isLogged(usuario:Usuario): Observable<any>{
  return this.http.post(this.url +"login/loginUser.php?id=getUserLogin" , usuario)
  .pipe(
    map((e)=> { 

      return e
    }));
}

sesionOut(nombreUsuario:string,id:any){
  return this.http.post(this.url +"login/loginUser.php?id=sesionOut",{'nombreUsuario': nombreUsuario, 'id':id})
  .pipe(
    map((e)=> {
      return e
    }));
}

loginUrl(id:any,ruta:any, rol:any){
  return this.http.post(this.url +"login/loginUser.php?id=loginUrl",{'id': id , 'ruta':ruta, 'rol':rol})
  .pipe(
    map((e)=> {
      return e
    }));
}

getAlertas(idServicio:number){
  return this.http.post(this.url +"login/login.php?id=getAlerta", {'idServicio':idServicio})
  .pipe(
    map((e)=> {
      return e
    }));
}
getAlertas1(idServicio:number){
  return this.http.post(this.url +"login/login.php?id=getAlerta1" , {'idServicio':idServicio})
  .pipe(
    map((e)=> {
      return e
    }));
}
getAlertas2(idServicio:number){
  return this.http.post(this.url +"login/login.php?id=getAlerta2", {'idServicio':idServicio})
  .pipe(
    map((e)=> {
      return e
    }));
}
getAlertas3(idServicio:number){
  return this.http.post(this.url +"login/login.php?id=getAlerta3", {'idServicio':idServicio})
  .pipe(
    map((e)=> {
      return e
    }));
}

getAlertas4(idServicio:number){
  return this.http.post(this.url +"login/login.php?id=getAlerta4", {'idServicio':idServicio})
  .pipe(
    map((e)=> {
      return e
    }));
}

getAlertas5(idServicio:number){
  return this.http.post(this.url +"login/login.php?id=getAlerta5", {'idServicio':idServicio})
  .pipe(
    map((e)=> {
      return e
    }));
}

getAlertas6(idServicio:number){
  return this.http.post(this.url +"login/login.php?id=getAlerta6", {'idServicio':idServicio})
  .pipe(
    map((e)=> {
      return e
    }));
}

verErrorId(nEmpleado:number, fechaTrabajo:any,idServicio:number){
  return this.http.post(this.url +"login/login.php?id=verErrorId",{'nEmpleado': nEmpleado , 'fechaTrabajo':fechaTrabajo ,'idServicio':idServicio})
  .pipe(
    map((e)=> {
      return e
    }));
}

verErrorId5(nEmpleado:number, fechaTrabajo:any,idServicio:number){
  return this.http.post(this.url +"login/login.php?id=verErrorId5",{'nEmpleado': nEmpleado , 'fechaTrabajo':fechaTrabajo ,'idServicio':idServicio})
  .pipe(
    map((e)=> {
      return e
    }));
}

validarTodo(alerta:any,idServicio:number){
  return this.http.post(this.url +"login/login.php?id=validarTodo",{'alerta': alerta, 'idServicio':idServicio })
  .pipe(
    map((e)=> {
      return e
    }));
}

getCaducidadDocumentos(idServicio:number){
  return this.http.post(this.url +"login/login.php?id=getCaducidadDocumentos",{'idServicio': idServicio })
  .pipe(
    map((e)=> {
      return e
    }));
}

verVacaciones(idServicio:number){
  return this.http.post(this.url +"login/login.php?id=verVacaciones",{'idServicio': idServicio })
  .pipe(
    map((e)=> {
      return e
    }));
}



getAlertasBolsa(idServicio:number){
  return this.http.post(this.url +"login/login.php?id=getAlertasBolsa",{'idServicio': idServicio })
  .pipe(
    map((e)=> {
      return e
    }));
}


eliAlarma(idAV:number){
  return this.http.post(this.url +"login/login.php?id=eliAlarma" ,{'idAV': idAV })
  .pipe(
    map((e)=> {
      return e
    }));
}

eliAlarmaHoras(id_alerta_bolsa:number){
  return this.http.post(this.url +"login/login.php?id=eliAlarmaHoras" ,{'id_alerta_bolsa': id_alerta_bolsa })
  .pipe(
    map((e)=> {
      return e
    }));
}

controlHorarioByEmpleado(nEmpleado:number, fecha_inicio:any,fecha_fin:any,idServicio:number){
  return this.http.post(this.url +"login/login.php?id=controlHorarioByEmpleado",
  {'nEmpleado': nEmpleado , 'fecha_inicio':fecha_inicio,'fecha_fin':fecha_fin ,'idServicio':idServicio})
  .pipe(
    map((e)=> {
      return e
    }));
}

getCreditos(): Observable<any>{
  return this.http.get(this.url +"Sms/getCreditos.php?id=getCreditos" )
  .pipe(
    map((e)=> { 
      return e
    }));
}


enviarSms(nEmpleado:number, telefono:any,id:any,estado:any,mensaje:any,credito:any): Observable<any>{
  return this.http.post(this.url +"Sms/enviarSms.php?id=sms" ,
  {'nEmpleado': nEmpleado , 'telefono':telefono,'id':id ,'estado':estado,'mensaje':mensaje ,'credito':credito})
  .pipe(
    map((e)=> { 
      return e
    }));
}

enviarSmsValidar(nEmpleado:number, telefono:any,id:any,estado:any,mensaje:any,credito:any): Observable<any>{
  return this.http.post(this.url +"Sms/enviarSms.php?id=enviarSmsValidar" ,
  {'nEmpleado': nEmpleado , 'telefono':telefono,'id':id ,'estado':estado,'mensaje':mensaje ,'credito':credito})
  .pipe(
    map((e)=> { 
      return e
    }));
}

listen(eventName : String) : Observable<any>{
  return new Observable((observer)=>{
    this.socket.on(eventName , (data:any)=>{
    
      observer.next(data);
    });
    return () => {};
  })
 }

 // emitir 
 emit(eventName : String , data:any) {
 
  this.socket.emit(eventName, data);
  return new Observable((observer)=>{
    this.socket.on('hello' , (data:any)=>{
      observer.next(data);
    });
    return () => {};
  })
   
 }


}
