import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Usuario } from 'src/app/Models/usuario';
import { LoginService } from 'src/app/Services/login.service';
import { NotificacionService } from 'src/app/Services/notificacion.service';
import { TokenService } from 'src/app/Services/token.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private toastrService: NotificacionService,
    private ruta: Router,
    private _service: LoginService,
    private authService: TokenService
    ) { }

  ngOnInit() {

    if (this.authService.isAuthenticated()) {
      this.redirectUser();
    }
  }



  user =  Usuario;
  estado:boolean=false;
conectado:any;
dia:any;
mes:any;
anio:any;
fecha:any
  login(forma:NgForm){
   this.user=forma.value;
   this._service.isLogged(this.user)
   .subscribe(data=>{
   this.conectado=data;
   if(data == 'error'){
       this.toastrService.openToast1('Los datos ingresados son incorrectos' , 'bg-danger text-white', 'ERROR');
     }else{
      this.toastrService.openToast1('Datos correctos!' , 'bg-success text-white', 'OK');
        this.estado=true;
       localStorage.setItem('usuario', btoa(data.nombreUsuario));
       localStorage.setItem(btoa('servicio'), btoa(data.idServicio));
       localStorage.setItem('token' , data.token);
       this.redirectUser(); // Llamar a la función de redirección

     }
   })  
  }


  redirectUser() {
  
    const userRole = this.authService.getUserRole();
    
    switch (userRole) {
      case 'admin':
        this.ruta.navigate(['./Main/home']);
        break;
      case 'manager':
        this.ruta.navigate(['./Main/home']);
        break;
      case 'user':
        this.ruta.navigate(['/Empleados/Empleados']);
        break;
        case 'viewer':
          this.ruta.navigate(['/Empleados/Empleados']);
          break;
      default:
        this.ruta.navigate(['/Main/403']); // Página de acceso denegado
        break;
    }

 }
}