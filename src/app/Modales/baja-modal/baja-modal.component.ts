import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Conceptos } from 'src/app/Models/conceptos';
import { PageService } from 'src/app/Services/page.service';

@Component({
  selector: 'app-baja-modal',
  templateUrl: './baja-modal.component.html',
  styleUrls: ['./baja-modal.component.css']
})
export class BajaModalComponent implements OnInit {

  constructor(
    public modalRef: MdbModalRef<BajaModalComponent>,
    private services:PageService,
    private ruta:Router

    ) {
    }
    
    param: string | null = null;
    idBobina: string | null = null;
    estado: string | null = null;
    datas:any=[]
    email:any;
    ngOnInit(): void {
      this.email = localStorage.getItem('operario');
      this.datas = this.param;
      this.getConceptos('DESC' , 'estadoConcepto');
      this.idBobina = this.datas.idBobinadora;
      this.estado = this.datas.estado;
  }

  data:any;
  selectedValue = new FormControl('8');
  getConceptos(orden:any , columna:any){
    this.services.getConceptos(orden, columna,1)
    .subscribe(data=>{ 
    this.data = data;
    for (let i = 0; i < this.data.length; i++) {
      if(this.data[i].defecto == 1){
        const a:any  = this.data[i].idConcepto
        this.selectedValue = new FormControl(a);
        this.idConcepto = this.data[i].idConcepto;
      }
      
    }
    });
  }

  idConcepto:any;
  idConceptos(option:any){
   this.idConcepto=option;

  }
  btn:boolean=false;
  bajaBobina(action:any){
    this.btn=true;
    this.services.bajaBobinas(action.value)
    .subscribe(data=>{ 
      
      if (data == 'success') {
      this.modalRef.close('success');
    }else{
      alert('ERROR...')
    }
   });
   
  }
}
