import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'dataFiltro'
})
export class FiltroEmpleado implements PipeTransform {

  transform(array: any[], query: string): any {

    // console.log(query.toLowerCase());
    let querys = query.toLowerCase();
    
    if (query) {
      return _.filter(array, row => (
        row.nombre+
        row.empresa+
        row.apellidos+
        row.nEmpleado+
        row.dni+
        row.fechaTrabajo
       
      ).toLowerCase().indexOf(querys) > -1

    );
  }else{
    return _.filter(array, row => (
      row.nombre+
      row.empresa+
      row.apellidos+
      row.nEmpleado+
      row.dni+
      row.fechaTrabajo

     
    ).indexOf(query) > -1

  );
  }
  // else{
  //    'Nada por mostrar'
  // }
    return array;
  }

}
