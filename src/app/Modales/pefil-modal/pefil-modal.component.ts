import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { PageService } from 'src/app/Services/page.service';

@Component({
  selector: 'app-pefil-modal',
  templateUrl: './pefil-modal.component.html',
  styleUrls: ['./pefil-modal.component.css']
})
export class PefilModalComponent implements OnInit {

  constructor(
    public modalRef: MdbModalRef<PefilModalComponent>,
    private services:PageService,
    private parametro:ActivatedRoute,
    private ruta:Router

    ) {}
 
    param: string | null = null;
    text: string | null = null;
    ngOnInit(): void {
      console.log(this.param);

      
  }


  btn:boolean=false;
  addPerfil(action:any){
    this.btn=true;
    console.log(action.value);
    this.services.addPerfil(action.value)
    .subscribe(data=>{ 

      if (data== 'success') {
        this.ruta.navigate(['./perfil', action.value.nombrePerfil]);
        setTimeout(()=>{
          location.reload();
        },1000)
      }else{
        alert('Error')
      }

    });
  }
}
