export interface MesData {
    horas: number;
    ausentes: number;
    hora1: number;
    hora2: number;
    hora3: number;
   
  }
  
  export interface PuestoData {
    puesto: number;
    descripcionPuesto: string;
    meses: { [key: number]: MesData };
  }
  
  export interface Result {
    hora1: number;  // Horas extras
    hora2: number;  // Horas extras nocturnas
    hora3: number;  // Horas extras festivas
  
  }
  