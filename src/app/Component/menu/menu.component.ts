import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/Services/config.service';
import { LoginService } from 'src/app/Services/login.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import { TokenService } from 'src/app/Services/token.service';
const jwt_decode = require('jwt-decode');




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  isLoggedIn = false;
  userRole: string = '';
  userRuler:boolean=false;
  constructor(

    private _ser: LoginService,
    private _config: ConfigService,
    private authService: TokenService
    ) {
     
      this.isLoggedIn = this.authService.isAuthenticated();
      // Obtener el rol del usuario (puede venir del JWT almacenado en el localStorage)
    this.userRole = this.authService.getUserRole();

     }


// Función para verificar si el usuario tiene un rol específico
hasRole(role: string): boolean {
  return this.userRole === role;
}


  tipoUsuario:any;
  usuario:any;
  ultima:any;
  servicio:string='';
  foto:any;
  public href: string = "";
  clase:boolean=false;
  idServicio:any;

  ngOnInit() {
   
    let ser:any = localStorage.getItem(btoa('servicio'));
    this.usuario = localStorage.getItem('usuario');
    this.idServicio = atob(ser);
    this.usuario =  atob(this.usuario);



    this._config.getServicio(this.idServicio)
    .subscribe(data=>{
      Object.entries(data).forEach(item => {
        this.servicio =   item[1];
    });
   })
   if (this.userRole != 'viewer') {
     this.getCaducidadDocumentos();
     this.getVacaciones();  
     this.getAlertas();
     this.getComentarios();
     this.getAlertasHoras()
    
   }

    
    this.fecha();


      
    }
    
    logout() {
      this.authService.logout();
      this.isLoggedIn = false;
    }
  

  fechaHoy:any
  fecha(){
    var f = new Date();
    //  this.fechaHoy =  f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
    this.fechaHoy =  f.getFullYear() + '/' + (f.getMonth() +1) + "/" +  f.getDate() ;
    
  }

  
  da:any;
  aler:boolean=false;
  getAlertas(){
    this._ser.getAlertas(this.idServicio)
    .subscribe(data=>{   
      if (data != 'nada') {
      
        this.da = data;
        if (this.da.length > 0) {
          this.aler = true;
        } else {
          this.aler = false;
          
        }
        
      }else{
        this.aler = false;
      }
      
    });
  }
  

  cantidad:number=0;
  cant:any;
  getCaducidadDocumentos(){
    this._ser.getCaducidadDocumentos(this.idServicio)
    .subscribe(data=>{ 
    
      if (data != 'error') {
        this.cant = data ;
        this.cantidad = this.cant.length;       
      }else{
        this.cantidad = 0;
      }
    });
    
  }
  
  
  canti:number=0;
  canty:any;
  getVacaciones(){
    this._ser.verVacaciones(this.idServicio)
    .subscribe(data=>{ 
       
    if (data != 'error') {
      this.canty = data;
      this.canti = this.canty.length;
    }else{
      this.canti = 0;
    }
  });
  
}

  
cantiAlerta:number=0;
cantyAlerta:any;
getAlertasHoras(){
  this._ser.getAlertasBolsa(this.idServicio)
  .subscribe(data=>{ 
  if (data != 'error') {
    this.cantyAlerta = data;
    this.cantiAlerta = this.cantyAlerta.length;
  }else{
    this.cantiAlerta = 0;
  }
});

}

alarmaHoras(item:any){
 
  let con = confirm('¿Eliminar la alarma?');

  if (con) {
    this._ser.eliAlarmaHoras(item)
    .subscribe(res=>{
      if (res == 'success') {
        alert('Alarma Eliminada');
      }else{
        alert('Error en el servidor');
      }
    })
  }
  
}

alarma(item:any){
 
  let con = confirm('¿Eliminar la alarma?');

  if (con) {
    this._ser.eliAlarma(item.idAV)
    .subscribe(res=>{
      if (res == 'success') {
        alert('Alarma Eliminada');
      }else{
        alert('Error en el servidor');
      }
    })
  }
  
}


mensajes:any;
getComentarios(){

    this._config.getComentarioN(this.idServicio)
    .subscribe(data=>{ 
     
     
      if (data != 'vacio') {
        this.mensajes = data.length;
   
      } else {
      
       this.mensajes=0; 
      }
    });

  }

setColor:any;
  color(dato:any){
    localStorage.setItem('color' , dato);
    location.reload();
  }

  modo(val:any){
   document.body.classList.toggle('dark');
   
  }


  
}