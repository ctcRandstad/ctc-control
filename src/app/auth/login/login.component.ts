import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Usuario } from 'src/app/Models/usuario';
import { LoginService } from 'src/app/Services/login.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private toastrService: NotificacionService,
    private ruta: Router,
    private _service: LoginService
    ) { }

  ngOnInit() {

    let token= localStorage.getItem('token')
      

    if (token != null) {
      this.ruta.navigate(['/principal/empleados'])

    }
  }



  user =  Usuario;
  estado:boolean=false;
  conectado:boolean=false;
dia:any;
mes:any;
anio:any;
fecha:any
  login(forma:NgForm){
   this.user=forma.value;
    
   this._service.isLogged(this.user)
   .subscribe(data=>{
    console.log(data);
    
  
     if (data == 'conectado') {
     this.conectado = true;
     setTimeout(()=>{
       this.conectado=false;
     },3000)
     }else if(data == 'error'){
       this.toastrService.openToast1('Los datos ingresados son incorrectos' , 'bg-danger text-white', 'ERROR');
     }else{
      this.toastrService.openToast1('Datos correctos!' , 'bg-success text-white', 'OK');
        this.estado=true;
   
     
       localStorage.setItem('token', data.token);
       localStorage.setItem('rol', btoa(data.rol));
       localStorage.setItem('rols', data.rols);
       localStorage.setItem('usuario', btoa(data.nombreUsuario));
       localStorage.setItem('ultima', data.ultimaVez);
       localStorage.setItem('id', data.idUsuario);
        localStorage.setItem(btoa('servicio'), btoa(data.idServicio));
       localStorage.setItem('foto', data.foto);
       setTimeout(()=>{ 
        if (data.rol == 'E2020') {
          this.ruta.navigate(['./Empleados']);
          
        }else{

          this.ruta.navigate(['./Main']);
        }

       },2000)

     }


     
   })
     
  }

}
