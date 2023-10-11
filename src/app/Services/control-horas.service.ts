import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map} from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlHorasService {

  constructor( private http:HttpClient) {

  }
 url = environment.url;

 configHoras(idServicio:number){
  return this.http.post(this.url +"control/control.php?id=configHoras",{'idServicio':idServicio})
  .pipe(
    map((e)=> {
    
      return e
    }));
  }

  
 getHorarios(){
  return this.http.get(this.url +"control/control.php?id=getHorarios")
  .pipe(
    map((e)=> {
    
      return e
    }));
  }

  getControlEmpleadosTM(idServicio:number){
    return this.http.post(this.url +"control/control.php?id=getControlEmpleadosTM", {'idServicio' : idServicio})
    .pipe(
      map((e)=> {
      
        return e
      }));
    }

    getHorasTurnos(){
      return this.http.get(this.url +"control/control.php?id=getHorasTurnos")
      .pipe(
        map((e)=> {
        
          return e
        }));
      }

    getControlEmpleadosTT(idServicio:number){
      return this.http.post(this.url +"control/control.php?id=getControlEmpleadosTT", {'idServicio' : idServicio})
      .pipe(
        map((e)=> {
        
          return e
        }));
      }
      getControlEmpleadosTN(fecha:any,idServicio:number){
        return this.http.post(this.url +"control/control.php?id=getControlEmpleadosTN" , {'fecha':fecha,'idServicio' : idServicio})
        .pipe(
          map((e)=> {
          
            return e
          }));
        }

        getControlEmpleadosValidados(turno:any , fechaTrabajo:any,idServicio:number){
          return this.http.post(this.url +"control/control.php?id=getControlEmpleadosValidados" , { 'turno' : turno, 'fechaTrabajo' : fechaTrabajo,'idServicio':idServicio})
          .pipe(
            map((e)=> {              
            
              return e
            }));
          }

          editarHNormales(hora:any , idPlantilla:number,usuario:any){
            return this.http.post(this.url +"control/control.php?id=editarHNormales" , { 'hora' : hora, 'idPlantilla' : idPlantilla, 'usuario':usuario})
            .pipe(
              map((e)=> {
              
                return e
              }));
            }

            editarHAusentes(hora:any , idPlantilla:number,usuario:any){
              return this.http.post(this.url +"control/control.php?id=editarHAusentes" , { 'hora' : hora, 'idPlantilla' : idPlantilla, 'usuario':usuario})
              .pipe(
                map((e)=> {
                
                  return e
                }));
              }

            editarJustificante(hora:any , idPlantilla:any , fechaTrabajo:any,nEmpleado:any , horasAusentes:any , horasNormales:any,idServicio:any){
              return this.http.post(this.url +"control/control.php?id=editarJustificante" ,
              { 'hora' : hora, 'idPlantilla' : idPlantilla, 'fechaTrabajo':fechaTrabajo, 'nEmpleado':nEmpleado 
              , 'horasAusentes':horasAusentes ,'horasNormales' :horasNormales, 'idServicio':idServicio})
              .pipe(
                map((e)=> {
                
                  return e
                }));
              }
              editarJustificanteAdmin(hora:any , idPlantilla:any, fechaTrabajo:any,nEmpleado:number , horasAusentes:any , horasNormales:any,idServicio:number){
                return this.http.post(this.url +"control/control.php?id=editarJustificanteAdmin" , 
                { 'hora' : hora, 'idPlantilla' : idPlantilla, 'fechaTrabajo':fechaTrabajo, 'nEmpleado':nEmpleado , 'horasAusentes':horasAusentes ,'horasNormales' :horasNormales , 'idServicio':idServicio})
                .pipe(
                  map((e)=> {
                  
                    return e
                  }));
                }
  
    editplantillasColumn( fechaTrabajo:any , nEmpleado:number , datos:any , columna:any,idPlantilla:number,usuario:any, idServicio:number):Observable<any>{
      return this.http.post(this.url +"control/control.php?id=editplantillasColumn", {'fechaTrabajo':fechaTrabajo , 'nEmpleado':nEmpleado  , 'datos':datos , 'columna':columna ,'idPlantilla' :idPlantilla ,'usuario' :usuario , 'idServicio':idServicio})
      .pipe(
        map((e)=> {            
          return e;
        }));
      }

      validarEmpleado( fechaTrabajo:any , nEmpleado:number, idPlantilla:number ):Observable<any>{
        return this.http.post(this.url +"control/control.php?id=validarEmpleado", {'fechaTrabajo':fechaTrabajo , 'nEmpleado':nEmpleado,'idPlantilla' :idPlantilla })
        .pipe(
          map((e)=> {            
            return e;
          }));
        }

        
      validarEmpleadoAdd( data:any ):Observable<any>{
        return this.http.post(this.url +"control/control.php?id=validarEmpleadoAdd", data)
        .pipe(
          map((e)=> {            
            return e;
          }));
        }

        validarEmpleadoInfo( data:any ):Observable<any>{
          return this.http.post(this.url +"control/control.php?id=validarEmpleadoInfo", data)
          .pipe(
            map((e)=> {            
              return e;
            }));
          }

        eliminarAlertaCambio( idPlantilla:number ):Observable<any>{
          return this.http.post(this.url +"control/control.php?id=eliminarAlertaCambio", {'idPlantilla':idPlantilla})
          .pipe(
            map((e)=> {            
              return e;
            }));
          }

          addParosActuales(paro:any, idPlantilla:number ):Observable<any>{
            return this.http.post(this.url +"control/control.php?id=addParosActuales", {'paro' :paro,'idPlantilla':idPlantilla})
            .pipe(
              map((e)=> {            
                return e;
              }));
            }

        addErrorInfo( data:any ):Observable<any>{
          return this.http.post(this.url +"control/control.php?id=addErrorInfo",data)
          .pipe(
            map((e)=> {                
              return e;
            }));
          }

          cambioPuest( data:any ):Observable<any>{
            return this.http.post(this.url +"control/control.php?id=cambioPuest",data)
            .pipe(
              map((e)=> {                
                return e;
              }));
            }
          
       getDatos(){
        return this.http.get(this.url +"control/control.php?id=getDatos")
        .pipe(
          map((e)=> {
            return e
          }));
        }

        cambioTurno( data:any ):Observable<any>{
          return this.http.post(this.url +"control/control.php?id=cambioTurno",data)
          .pipe(
            map((e)=> {                
              return e;
            }));
          }
      
        getEmpleadoPlantilla( data:any ):Observable<any>{
          return this.http.post(this.url +"control/control.php?id=getEmpleadoPlantilla",data)
          .pipe(
            map((e)=> {                
              return e;
            }));
          }
          getEmpleadoPlantilla1( data:any ):Observable<any>{
            return this.http.post(this.url +"control/control.php?id=getEmpleadoPlantilla1",data)
            .pipe(
              map((e)=> {                
                return e;
              }));
            }

            getJustificaciones(idServicio:number){
              return this.http.post(this.url +"control/control.php?id=justificacion", {'idServicio':idServicio})
              .pipe(
                map((e)=> {
                  return e
                }));
              }

              getEncargados(turno:any,idServicio:number){
                return this.http.post(this.url +"control/control.php?id=getEncargados" , {'turno':turno,'idServicio':idServicio})
                .pipe(
                  map((e)=> {
                  
                    return e
                  }));
                }
        
            cambioPuestConsulta( data:any ):Observable<any>{
              return this.http.post(this.url +"consultas/consultas.php?id=cambioPuest",data)
              .pipe(
                map((e)=> {                
                  return e;
                }));
              }

              cambioTurnoConsulta( data:any ):Observable<any>{
                return this.http.post(this.url +"consultas/consultas.php?id=cambioTurno",data)
                .pipe(
                  map((e)=> {                
                    return e;
                  }));
                }

            editarHNormalesConsultas(hora:any , idPlantilla:any,plantillas:any){
              return this.http.post(this.url +"consultas/consultas.php?id=editarHNormales" , { 'hora' : hora, 'idPlantilla' : idPlantilla, 'plantillas':plantillas})
              .pipe(
                map((e)=> {
                
                  return e
                }));
              }
  
      editarHAusentesConsultas(hora:any , idPlantilla:any,plantillas:any){
        return this.http.post(this.url +"consultas/consultas.php?id=editarHAusentes" , { 'hora' : hora, 'idPlantilla' : idPlantilla, 'plantillas':plantillas})
        .pipe(
          map((e)=> {
          
            return e
          }));
        }
        editplantillasColumnConsultas( fechaTrabajo:any , nEmpleado:any , datos:any , columna:any,idPlantilla:any,plantillas:any):Observable<any>{
          return this.http.post(this.url +"consultas/consultas.php?id=editplantillasColumn", {'fechaTrabajo':fechaTrabajo , 'nEmpleado':nEmpleado  , 'datos':datos , 'columna':columna ,'idPlantilla' :idPlantilla ,'plantillas' :plantillas})
          .pipe(
            map((e)=> {            
              return e;
            }));
          }

          getInforme(idServicio:number){
            return this.http.post(this.url +"consultas/consultas.php?id=getInforme", { 'idServicio':idServicio})
            .pipe(
              map((e)=> {
                return e
              }));
            }

            getInformeConsulta(anio:any,idServicio:number){
              return this.http.post(this.url +"consultas/consultas.php?id=getInformeConsulta" , {'anio' : anio, 'idServicio':idServicio})
              .pipe(
                map((e)=> {
                  return e
                }));
              }

              getInformeExcelConsultaExtras(anio:any,idServicio:number){
                return this.http.post(this.url +"consultas/consultas.php?id=getInformeConsultaExtra" , {'anio' : anio,'idServicio':idServicio})
                .pipe(
                  map((e)=> {
                    return e
                  }));
                }
            getInformeExcel(idServicio:number){
              return this.http.post(this.url +"consultas/consultas.php?id=getInformeExcel", { 'idServicio':idServicio})
              .pipe(
                map((e)=> {
                  return e
                }));
              }

       getInformeExcelConsulta(anio:any,estado:any,idServicio:number){
          return this.http.post(this.url +"consultas/consultas.php?id=getInformeExcelConsulta" , {'anio' : anio , 'estado':estado,'idServicio':idServicio})
          .pipe(
            map((e)=> {
              return e
            }));
          }

          getInformeConsultaEmpleados(anio:any,idServicio:number){
            return this.http.post(this.url +"consultas/consultas.php?id=getInformeConsultaEmpleados" , {'anio' : anio,'idServicio':idServicio})
            .pipe(
              map((e)=> {
                return e
              }));
            }

            getInformeConsultaHoras(anio:any,mes:any,idServicio:number){
              return this.http.post(this.url +"consultas/consultas.php?id=getInformeConsultaHorasExtras" , {'anio' : anio , 'mes' : mes,'idServicio':idServicio})
              .pipe(
                map((e)=> {
                  return e
                }));
              }

              getAbsentismo1(anio:any,idServicio:number){
                return this.http.post(this.url +"consultas/consultas.php?id=getAbsentismo1" , {'anio' : anio,'idServicio':idServicio})
                .pipe(
                  map((e)=> {
                    return e
                  }));
                }

                getAusentismo(anio:any,idServicio:number){
                  return this.http.post(this.url +"consultas/consultas.php?id=getAusentismo" , {'anio' : anio,'idServicio':idServicio})
                  .pipe(
                    map((e)=> {
                      return e
                    }));
                  }
}
