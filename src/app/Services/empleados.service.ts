import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map} from "rxjs/operators";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor( private http:HttpClient,) {

  }
 url = environment.url;

 getEmplaedosActivos(idServicio:any){
  return this.http.post(this.url +"empleados/empleados.php?id=getEmpleadosActivosControl",{'idServicio':idServicio})
  .pipe(
    map((e)=> {
      return e
    }));
  }

  
 bajaTotal(){
  return this.http.get(this.url +"empleados/empleados.php?id=bajaTotal")
  .pipe(
    map((e)=> {
      return e
    }));
  }

  getEmplaedos(idServicio:any){
    return this.http.post(this.url +"consultas/consultas.php?id=getEmpleados", {'idServicio':idServicio})
    .pipe(
      map((e)=> {
        return e
      }));
    }
  getEmplaedosActivosE(idServicio:any){
    return this.http.post(this.url +"empleados/empleados.php?id=getEmpleadosWeb12ActivosE", {'idServicio':idServicio})
    .pipe(
      map((e)=> {
        return e
      }));
    }
  
    getCountJust(idServicio:any){
      return this.http.post(this.url +"empleados/empleados.php?id=getCountJust", {'idServicio':idServicio})
      .pipe(
        map((e)=> {
          return e
        }));
      }
    // getCountHExtras(idServicio:any){
    //   return this.http.post(this.url +"empleados/empleados.php?id=getCountHExtras", {'idServicio':idServicio})
    //   .pipe(
    //     map((e)=> {
    //       return e
    //     }));
    //   }

      getCountHExtrasPorcentaje(idServicio:any){
        return this.http.post(this.url +"empleados/empleados.php?id=getCountHExtrasPorcentaje", {'idServicio':idServicio})
        .pipe(
          map((e)=> {
            return e
          }));
        }
    // getCountHExtrasA(anio ,idServicio){
    //   return this.http.post(this.url +"consultas/consultas.php?id=getInformeConsultaExtra", {'anio':anio ,'idServicio':idServicio})
    //   .pipe(
    //     map((e)=> {
    //       return e
    //     }));
    //   }

      getCountHExtrasPorcentajeA(idServicio:any){
        return this.http.post(this.url +"empleados/empleados.php?id=getCountHExtrasPorcentajeA", {'idServicio':idServicio})
        .pipe(
          map((e)=> {
            return e
          }));
        }
  getBolsa(idServicio:any){
  
    return this.http.post(this.url +"empleados/empleados.php?id=getBolsa", {'idServicio':idServicio})
    .pipe(
      map((e)=> {
        return e
      }));
    }


  getEmplaedosBaja(idServicio:any){
    return this.http.post(this.url +"empleados/empleados.php?id=getEmpleadosWeb12Baja", {'idServicio':idServicio})
    .pipe(
      map((e)=> {
        return e
      }));
    }

    getEmplaedosBajaE(){
      return this.http.get(this.url +"empleados/empleados.php?id=getEmpleadosWeb12BajaE")
      .pipe(
        map((e)=> {
          return e
        }));
      }


    getTurnos(idServicio:any):Observable<any>{
      return this.http.post(this.url +"empleados/empleados.php?id=getTurnos", {'idServicio':idServicio})
      .pipe(
        map((e)=> {
          
          return e
        }));
      }
      getTurnos1(idServicio:any):Observable<any>{
        return this.http.post(this.url +"empleados/empleados.php?id=getTurnos1", {'idServicio':idServicio})
        .pipe(
          map((e)=> {
            
            return e
          }));
        }
        getTurnos1A(idServicio:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=getTurnos1A", {'idServicio':idServicio})
          .pipe(
            map((e)=> {
              
              return e
            }));
          }
          getContratosA(idServicio:any):Observable<any>{
            return this.http.post(this.url +"empleados/empleados.php?id=getContratosA" , {'idServicio':idServicio})
            .pipe(
              map((e)=> {
                
                return e
              }));
            }
        getTurnosById( id:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=getTurnosById", {'id' : id})
          .pipe(
            map((e)=> {  
          
            return e;
          }));
        }
        getPuestosById( id:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=getPuestosById", {'id' : id})
          .pipe(
            map((e)=> {  
          
            return e;
          }));
        }
      getNumeroE():Observable<any>{
        return this.http.get(this.url +"empleados/empleados.php?id=getNumeroE")
        .pipe(
          map((e)=> {
         
            return e
          }));
        }
  
      getPuestos(idServicio:any):Observable<any>{
        return this.http.post(this.url +"empleados/empleados.php?id=getPuestos" ,{'idServicio':idServicio})
        .pipe(
          map((e)=> {
            return e
          }));
        }
        
        getPuestos1(idServicio:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=getPuestos1",{'idServicio':idServicio})
          .pipe(
            map((e)=> {
              return e
            }));
          }
          getConvenio(idServicio:any):Observable<any>{
            return this.http.post(this.url +"empleados/empleados.php?id=getConvenioWeb",{'idServicio':idServicio})
            .pipe(
              map((e)=> {
                return e
              }));
            }
            getConvenio1(idServicio:any):Observable<any>{
              return this.http.post(this.url +"empleados/empleados.php?id=getConvenio1",{'idServicio':idServicio})
              .pipe(
                map((e)=> {
                  return e
                }));
              }
              getJustificacion(idServicio:any):Observable<any>{
                return this.http.post(this.url +"empleados/empleados.php?id=getJustificacion",{'idServicio':idServicio})
                .pipe(
                  map((e)=> {
                    return e
                  }));
                }

                getJustifEmpleados(valor:any,idServicio:any):Observable<any>{
                  return this.http.post(this.url +"empleados/empleados.php?id=getJustifEmpleados" , {'valor' : valor, 'idServicio':idServicio})
                  .pipe(
                    map((e)=> {
                      return e
                    }));
                  }

                  getJustifEmpleadosData(data:any):Observable<any>{
                    return this.http.post(this.url +"empleados/empleados.php?id=getJustifEmpleadosData" , data)
                    .pipe(
                      map((e)=> {
                        return e
                      }));
                    }
                    getSolicitudesData(data:any):Observable<any>{
                      return this.http.post(this.url +"empleados/empleados.php?id=getSolicitudesData" , data)
                      .pipe(
                        map((e)=> {
                          return e
                        }));
                      }
              getConveniosById( id:any,idServicio:any):Observable<any>{
                return this.http.post(this.url +"empleados/empleados.php?id=getConveniosById", {'id' : id , 'idServicio' :idServicio})
                .pipe(
                  map((e)=> {  
                
                  return e;
                }));
              }

              verSms(idEvento:any):Observable<any>{
                return this.http.post(this.url +"empleados/empleados.php?id=verSms" , {'idEvento' : idEvento})
                .pipe(
                  map((e)=> {
                    return e
                  }));
                }

              cambioJustiParo(valor:any):Observable<any>{
                return this.http.post(this.url +"empleados/empleados.php?id=cambioJustiParo" , {'valor' : valor})
                .pipe(
                  map((e)=> {
                    return e
                  }));
                }

                cambioBolsa(valor:any , idServicio:number):Observable<any>{
                  return this.http.post(this.url +"empleados/empleados.php?id=cambioBolsa" , {'valor' : valor,'idServicio':idServicio})
                  .pipe(
                    map((e)=> {
                      return e
                    }));
                  }

               getJustificacionById( id:number,idServicio:number):Observable<any>{
                return this.http.post(this.url +"empleados/empleados.php?id=getJustificacionById", {'id' : id,'idServicio':idServicio})
                .pipe(
                  map((e)=> {  
                
                  return e;
                }));
              }

              getJustificacionByIdEmpleados( id:number,idServicio:number):Observable<any>{
                return this.http.post(this.url +"empleados/empleados.php?id=getJustificacionByIdEmpleados", {'id' : id,'idServicio':idServicio})
                .pipe(
                  map((e)=> {  
                
                  return e;
                }));
              }

              getJustificacionByIdEmpleadosTotal( id:number):Observable<any>{
                return this.http.post(this.url +"empleados/empleados.php?id=getJustificacionByIdEmpleadosTotal", {'id' : id})
                .pipe(
                  map((e)=> {  
                
                  return e;
                }));
              }
              
    
        addEmpleados( datas:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=addEmpleados", datas)
          .pipe(
            map((e)=> {  
              
            return e;
          }));
        }
        
        addEmpleadosCalendarioNuevo( datas:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=addEmpleadosCalendarioNuevo", datas)
          .pipe(
            map((e)=> {  
              
            return e;
          }));
        }

        alta( datas:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=alta", datas)
          .pipe(
            map((e)=> {  
                            
            return e;
          }));
        }

        vacacionesNoDis( datas:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=vacacionesNoDis", datas)
          .pipe(
            map((e)=> {  
                            
            return e;
          }));
        }

        getTurnosExcel( datas:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=getTurnosExcel", datas)
          .pipe(
            map((e)=> {  
                            
            return e;
          }));
        }

        asignarPuestoMultiple( datas:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=asignarPuestoMultiple", datas)
          .pipe(
            map((e)=> {  
                            
            return e;
          }));
        }

        getContratosExcel( datas:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=getContratosExcel", datas)
          .pipe(
            map((e)=> {  
                            
            return e;
          }));
        }


        altaEmpleados( data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=altaEmpleados", data)
          .pipe(
            map((e)=> {  
              
            return e;
          }));
        }
        consultaPuesto( puesto_id:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=consultaPuesto", {'puesto_id' : puesto_id})
          .pipe(
            map((e)=> {  
            return e;
          }));
        }

        consultaContrato( idContrato:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=consultaContrato", {'idContrato' : idContrato})
          .pipe(
            map((e)=> {  
            return e;
          }));
        }

        buscador( parametro:any):Observable<any>{
          return this.http.post(this.url +"consultas/consultas.php?id=buscador", {'parametro' : parametro})
          .pipe(
            map((e)=> {  
            return e;
          }));
        }


        consultaEmpleado( nEmpleado:number):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=consultaEmpleado", {'nEmpleado' : nEmpleado})
          .pipe(
            map((e)=> {  
            return e;
          }));
        }

        
        getPuestosAsignados( nEmpleado:number):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=getPuestosAsignados", {'nEmpleado' : nEmpleado})
          .pipe(
            map((e)=> {  
            return e;
          }));
        }

        
        consultaEmpleadoPerfil( nEmpleado:number):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=consultaEmpleadoPerfil", {'nEmpleado' : nEmpleado})
          .pipe(
            map((e)=> {  
            return e;
          }));
        }

        consultaEmpleadoHoras( nEmpleado:number):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=consultaEmpleadoHoras", {'nEmpleado' : nEmpleado})
          .pipe(
            map((e)=> {  
            return e;
          }));
        }

        consultaEmpleadoHorasConsulta( nEmpleado:number, year:any):Observable<any>{
          return this.http.post(this.url +"consultas/consultas.php?id=consultaEmpleadoHoras", {'nEmpleado' : nEmpleado, 'year' : year})
          .pipe(
            map((e)=> {  
             
            return e;
          }));
        }

        borrarPestoAsignadoConsulta( nEmpleado:number, idEPuesto:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=borrarPestoAsignado", {'nEmpleado' : nEmpleado, 'idEPuesto' : idEPuesto})
          .pipe(
            map((e)=> {  
             
            return e;
          }));
        }


        borrarJust( nEmpleado:number , fechaInicioJ:any , fechaFinJ:any,idJE:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=borrarJust", {'nEmpleado' : nEmpleado , 'fechaInicioJ':fechaInicioJ , 'fechaFinJ':fechaFinJ, 'idJE':idJE})
          .pipe(
            map((e)=> {  
            return e;
          }));
        }
        
        asignarApp( apellidos:any, nombre:any, nEmpleado:number,dni:any,app_:number, tabla:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=asignarApp", {'apellidos' : apellidos , 'nombre':nombre , 'nEmpleado':nEmpleado, 'dni':dni , 'app_':app_, 'tabla':tabla})
          .pipe(
            map((e)=> {  
            return e;
          }));
        }

        borrarJust1(data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=borrarJust1", data)
          .pipe(
            map((e)=> {  
            return e;
          }));
        }

        cambioJUsti( data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=cambioJUsti", data)
          .pipe(
            map((e)=> {  
              
            return e;
          }));
        }
        
        antiguedad( nEmpleado:number):Observable<any>{
          return this.http.post(this.url +"control/control.php?id=antiguedad", {'nEmpleado' : nEmpleado})
          .pipe(
            map((e)=> {  
            return e;
          }));
        }

        reset( nEmpleado:number):Observable<any>{
          return this.http.post(this.url +"control/control.php?id=reset", {'nEmpleado' : nEmpleado})
          .pipe(
            map((e)=> {  
            return e;
          }));
        }

        comentarios( nEmpleado:number, year:any):Observable<any>{
          return this.http.post(this.url +"control/control.php?id=comentarios", {'nEmpleado' : nEmpleado , 'year':year})
          .pipe(
            map((e)=> {  
            return e;
          }));
        }

        getDiasVacaciones( nEmpleado:number):Observable<any>{
          return this.http.post(this.url +"control/control.php?id=getDiasVacaciones", {'nEmpleado' : nEmpleado})
          .pipe(
            map((e)=> {  
            return e;
          }));
        }

        bajaEmpleados(data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=bajaEmpleados", data)
          .pipe(
            map((e)=> {  
            return e;
          }));
        }
        editarEmpleados(data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=editarEmpleados", data)
          .pipe(
            map((e)=> {  
              
            return e;
          }));
        }

        editarSoloTurno(data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=editarSoloTurno", data)
          .pipe(
            map((e)=> {                                            
            return e;
          }));
        }

        vacacionesTurno(fechaCambio:any,nEmpleado:number):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=vacacionesTurno", {'fechaCambio':fechaCambio , 'nEmpleado':nEmpleado})
          .pipe(
            map((e)=> {                                            
            return e;
          }));
        }

        addJusti( data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=addJusti", data)
          .pipe(
            map((e)=> {                
            return e;
          }));
        }

        consultaProgramacion( data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=consultaProgramacion", data)
          .pipe(
            map((e)=> {   
              
              return e;
            }));
          }
          
        consultaProgramacionExcel( data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=consultaProgramacionExcel", data)
          .pipe(
            map((e)=> {   
              
              return e;
            }));
          }
          
          consultaProgramacionAdmin( data:any):Observable<any>{
            return this.http.post(this.url +"empleados/empleados.php?id=consultaProgramacionAdmin", data)
            .pipe(
              map((e)=> {   
            
            return e;
          }));
        }
        horasComite( data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=horasComite", data)
          .pipe(
            map((e)=> {   
          
          return e;
        }));
      }

      informeFichajes( data:any):Observable<any>{
        return this.http.post(this.url +"empleados/empleados.php?id=informeFichajes", data)
        .pipe(
          map((e)=> {   
        
        return e;
      }));
    }
        consultaProgramacionAdminExcel( data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=consultaProgramacionAdminExcel", data)
          .pipe(
            map((e)=> {   
            
          return e;
        }));
      }

        consultaProgramacionAdminAnterior( data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=consultaProgramacionAdminAnterior", data)
          .pipe(
            map((e)=> {   
                         
          return e;
        }));
      }
        consultaProgramacionJus( data:any):Observable<any>{
          
          return this.http.post(this.url +"empleados/empleados.php?id=consultaProgramacionJus", data)
          .pipe(
            map((e)=> {                
            return e;
          }));
        }

        alertaSinValidar( data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=alertaSinValidar", data)
          .pipe(
            map((e)=> {   
                         
          return e;
        }));
      }

      alertaSinValidarEncargado( data:any):Observable<any>{
        return this.http.post(this.url +"empleados/empleados.php?id=alertaSinValidarEncargado", data)
        .pipe(
          map((e)=> {   
                       
        return e;
      }));
    }

        // no se usa de momento!!!
        consultaProgramacionJusF( data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=consultaProgramacionJusFecha", data)
          .pipe(
            map((e)=> {                
            return e;
          }));
        }
        consultaProgramacionJusFNoche(data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=consultaProgramacionJusFechaNoche",data)
          .pipe(
            map((e)=> {    
       
            return e;
          }));
        }

        consultaTurnoTotales( data:any ):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=consultaTurnoTotales",data)
          .pipe(
            map((e)=> {                
            return e;
          }));
        }

        cambiarHorario( data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=cambiarHorario", data)
          .pipe(
            map((e)=> {  
            return e;
          }));
        }

        horasMensual( nEmpleado:number):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=horasMensualWeb", {'nEmpleado':nEmpleado})
          .pipe(
            map((e)=> {  
      
            return e;
          }));
        }


        paroAnoAnterior( nEmpleado:number):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=paroAnoAnterior" , {'nEmpleado':nEmpleado})
          .pipe(
            map((e)=> {  
          
            return e;
          }));
        }

        paroAnoActual(nEmpleado:number ):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=paroAnoActual" , {'nEmpleado':nEmpleado})
          .pipe(
            map((e)=> {  
          
            return e;
          }));
        }
        editarParos( data:any):Observable<any>{
          return this.http.post(this.url +"empleados/empleados.php?id=editarParos", data)
          .pipe(
            map((e)=> {  
          
            return e;
          }));
        }

                        // subir archivos
  uploadFile(archivo:any) {
    return this.http.post(this.url +"empleados/empleados.php?id=pdf", archivo)
    .pipe(
      map((e)=>{
    //  console.log(e);
     
        return e;;
      })
    )
  }

  getPdf(nEmpleado:number ):Observable<any>{
    return this.http.post(this.url +"empleados/empleados.php?id=getPdf" , {'nEmpleado':nEmpleado})
    .pipe(
      map((e)=> {  
    
      return e;
    }));
  }

  borrarPdf(nEmpleado:number,nombreDocumento:any, idDocumento:number ):Observable<any>{
    return this.http.post(this.url +"empleados/empleados.php?id=borrarPdf" , {'nEmpleado':nEmpleado,'nombreDocumento':nombreDocumento , 'idDocumento':idDocumento})
    .pipe(
      map((e)=> {  
    
      return e;
    }));
  }

  addTitulo( datas:any):Observable<any>{
    return this.http.post(this.url +"empleados/empleados.php?id=addTitulo", datas)
    .pipe(
      map((e)=> {  
        
      return e;
    }));
  }

  addComentarioFichaje( datas:any):Observable<any>{
    return this.http.post(this.url +"empleados/empleados.php?id=addComentarioFichaje", datas)
    .pipe(
      map((e)=> {  
        
      return e;
    }));
  }


  addSolicitud( datas:any):Observable<any>{
    return this.http.post(this.url +"empleados/empleados.php?id=addSolicitud", datas)
    .pipe(
      map((e)=> {  
        
      return e;
    }));
  }
    

  getSolicitudes(idServicio:number ):Observable<any>{
    return this.http.post(this.url +"empleados/empleados.php?id=getSolicitudes", {'idServicio' : idServicio})
    .pipe(
      map((e)=> {  
        
      return e;
    }));
  }
    

  estadoSolicitudes( idListado:any, idServicio:number , estadoS:any):Observable<any>{
    return this.http.post(this.url +"empleados/empleados.php?id=estadoSolicitudes", {'idListado' : idListado , 'idServicio' :idServicio , 'estadoS':estadoS})
    .pipe(
      map((e)=> {  
      return e;
    }));
  }
    
  
  getTitulo(idServicio:number ):Observable<any>{
    return this.http.post(this.url +"empleados/empleados.php?id=getTitulo", {'idServicio' : idServicio})
    .pipe(
      map((e)=> {  
        
      return e;
    }));
  }

  getComentarioFichaje(idServicio:number ):Observable<any>{
    return this.http.post(this.url +"empleados/empleados.php?id=getComentarioFichaje", {'idServicio' : idServicio})
    .pipe(
      map((e)=> {  
        
      return e;
    }));
  }

  eliminarD( idDocumento:any):Observable<any>{
    return this.http.post(this.url +"empleados/empleados.php?id=eliminarD", {'idDocumento' : idDocumento})
    .pipe(
      map((e)=> {  
     
      return e;
    }));
  }

  addCometario( data:any):Observable<any>{
    return this.http.post(this.url +"empleados/empleados.php?id=addCometario", data)
    .pipe(
      map((e)=> {  
        // console.log(e);
      return e;
    }));
  }

  consultaEmpleadoExcelHoras( nEmpleado:number, anio:any):Observable<any>{
    return this.http.post(this.url +"empleados/empleados.php?id=consultaEmpleadoExcelHoras", {'nEmpleado' : nEmpleado , 'anio' :anio})
    .pipe(
      map((e)=> {  
      return e;
    }));
  }

  

  
 getTexto(idServicio:any){
  return this.http.post(this.url +"config/config.php?id=getTexto" , {'idServicio' : idServicio})
  .pipe(
    map((e)=> {
      return e
    }));
  }

  setTexto( data:any):Observable<any>{
    return this.http.post(this.url +"config/config.php?id=setTexto", data)
    .pipe(
      map((e)=> {  
      return e;
    }));
  }

  error:boolean=false;

  horasMensualConsulta( mes:any,nEmpleado:number , year:any):Observable<any>{
    return this.http.post(this.url +"consultas/consultas.php?id=horasMensual", {'mes' : mes,'nEmpleado':nEmpleado , 'year':year})
    .pipe(
      map((e)=> { 
        
        if (e == 'error') {
          return this.error;
        } else {
          return e;
          
        }
        
      }));
    }
    
    horasMensualTrabajadaConsultas( nEmpleado:number ,mes:any , year:any):Observable<any>{
      return this.http.post(this.url +"consultas/consultas.php?id=horasMensualTrabajadas", {'nEmpleado':nEmpleado , 'mes':mes , 'year':year})
      .pipe(
        map((e)=> {  

          
          return e;
        }));
      }


      horasMensualTrabajadaBolsaConsulta( nEmpleado:number , year:any):Observable<any>{
        return this.http.post(this.url +"consultas/consultas.php?id=horasMensualTrabajadasBolsa", {'nEmpleado':nEmpleado , 'year':year})
        .pipe(
          map((e)=> {  
  
    
      return e;
    }));
  }

  cambiarHorarioConsulta( data:any):Observable<any>{
    return this.http.post(this.url +"consultas/consultas.php?id=cambiarHorario", data)
    .pipe(
      map((e)=> {  
      return e;
    }));
  }

  addCometarioConsulta( data:any):Observable<any>{
    return this.http.post(this.url +"consultas/consultas.php?id=addCometario", data)
    .pipe(
      map((e)=> {  
        // console.log(e);
      return e;
    }));
  }
  consultaProgramacionAdminExcelConsultas( data:any):Observable<any>{
    return this.http.post(this.url +"consultas/consultas.php?id=consultaProgramacionAdminExcel", data)
    .pipe(
      map((e)=> {   
    return e;
  }));
}

addCoemntarioEmpleado( nEmpleado:number , comentario:any, idServicio:number):Observable<any>{
  return this.http.post(this.url +"consultas/consultas.php?id=addComentarioEmpleado", {'nEmpleado':nEmpleado , 'comentario':comentario,'idServicio':idServicio})
  .pipe(
    map((e)=> {  


return e;
}));
}

getDiasVacacionesConsultas( nEmpleado:number , anio:any):Observable<any>{
  return this.http.post(this.url +"consultas/consultas.php?id=getDiasVacacionesConsulta", {'nEmpleado' : nEmpleado , 'anio':anio})
  .pipe(
    map((e)=> {  
    return e;
  }));
}

viewTurno(idServicio:number,today:any):Observable<any>{
  return this.http.post(this.url +"consultas/consultas.php?id=viewTurno" , {'idServicio':idServicio, 'today':today})
  .pipe(
    map((e)=> {
      return e
    }));
  }

  editarComantarioFichaje( idAlertaFichaje:any, comentarioF:any):Observable<any>{
    return this.http.post(this.url +"empleados/empleados.php?id=editarComantarioFichaje", {'idAlertaFichaje' : idAlertaFichaje , 'comentarioF' :comentarioF})
    .pipe(
      map((e)=> {  
      return e;
    }));
  }

  validarComantarioFichaje( idAlertaFichaje:any):Observable<any>{
    return this.http.post(this.url +"empleados/empleados.php?id=validarComantarioFichaje", {'idAlertaFichaje' : idAlertaFichaje })
    .pipe(
      map((e)=> {  
      return e;
    }));
  }

  validarFichaTodo(idServicio:any):Observable<any>{
    return this.http.post(this.url +"consultas/consultas.php?id=validarFichaTodo" , {'idServicio':idServicio})
    .pipe(
      map((e)=> {
        return e
      }));
    }
    
}
