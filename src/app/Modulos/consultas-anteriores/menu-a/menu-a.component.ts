import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/Services/config.service';

@Component({
  selector: 'app-menu-a',
  templateUrl: './menu-a.component.html',
  styleUrls: ['./menu-a.component.css']
})
export class MenuAComponent implements OnInit {

  constructor(
    private _config: ConfigService,
  ) { }
 
  servicio:string='';
  idServicio:any;
  ngOnInit(): void {

    let ser:any = localStorage.getItem(btoa('servicio'));
    this.idServicio = atob(ser);
    this._config.getServicio(this.idServicio)
    .subscribe(data=>{
      Object.entries(data).forEach(item => {
        this.servicio =   item[1];
    });
  })
  }
  salir(){
    
  }
}
