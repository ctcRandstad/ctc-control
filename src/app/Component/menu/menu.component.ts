import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/Services/config.service';
import { LoginService } from 'src/app/Services/login.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {



  
  constructor(
    private ruta:Router,
    private _ser: LoginService,
    private _config: ConfigService,
   
    ) {
     this.setColor= localStorage.getItem('color');
    
      if (this.setColor == null) {
        this.setColor = 'green';
      }

      setTimeout(()=>{
        this.showAndHideModal(1);
  
      },800)
        

     
     }

     showAndHideModal(n:any) {
      //  this.demoBasic.show();
       
       setTimeout(() => {
        if (n == 11) {
          location.reload();
        }
        // this.demoBasic.hide();
      }, 300);

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
    this.getCaducidadDocumentos();
    let ser:any = localStorage.getItem(btoa('servicio'));
    let rol:any = localStorage.getItem('rol');
    this.usuario = localStorage.getItem('usuario');
    this.ultima = localStorage.getItem('ultima');
    this.foto = localStorage.getItem('foto');
    this.idServicio = atob(ser);
    this.tipoUsuario = atob(rol);
    this.usuario =  atob(this.usuario);

    this._config.getServicio(this.idServicio)
    .subscribe(data=>{
      Object.entries(data).forEach(item => {
        this.servicio =   item[1];
    });
   })
    this.mueveReloj();
    
    setInterval(()=>{
      this.mueveReloj();
      this.getAlertas();
      this.href = this.ruta.url;

      
      let separar = this.href.split('/principal/');
      
      
      if (separar[1] == 'empleadosBajas') {
        this.clase = true;
      }else if(separar[1] == 'justificaciones'){
        this.clase = true;
      }else{
        this.clase = false;
      }
      
    },1000)
    this.fecha();
    
    setInterval(()=>{
      this.getCaducidadDocumentos();
      this.getVacaciones();  
    },1000)
    
    this.getComentarios();
   
      
    }
    
    salir(){
   

      this._ser.sesionOut(this.usuario)
      .subscribe(data=>{
        console.log(data);
        
        if (data == 'success') {
          localStorage.removeItem('token');
          this.ruta.navigate(['./auth']);
        }
      })
   
  }
  
  minuto:any;
  segundo:any;
  horaImprimible:any;
  
  mueveReloj(){
    let momentoActual = new Date();
    let hora = momentoActual.getHours();
    this.minuto = momentoActual.getMinutes();
    this.segundo = momentoActual.getSeconds();
    
    if (this.minuto < 10) {
      this.minuto = '0' + this.minuto
    } 
    if (this.segundo < 10) {
      this.segundo = '0' + this.segundo
    } 
    
    this.horaImprimible = hora + " : " + this.minuto + " : " + this.segundo
    
    // document.form_reloj.reloj.value = horaImprimible
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
      // console.log(data);
      
    if (data != 'error') {
      this.canty = data;
      this.canti = this.canty.length;

     
    }else{
      this.canti = 0;
    }
  });
  
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