import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { PefilModalComponent } from '../pefil-modal/pefil-modal.component';

@Component({
  selector: 'app-eliminar-modal',
  templateUrl: './eliminar-modal.component.html',
  styleUrls: ['./eliminar-modal.component.css']
})
export class EliminarModalComponent implements OnInit {

  constructor(
    public modalRef: MdbModalRef<PefilModalComponent>

  ) { }

  item: any | null = null;
  ubi: any | null = null;

  ngOnInit(): void {
    console.log(this.item);
    
  }

  no(){
    this.modalRef.close('success');
    
  }

}
