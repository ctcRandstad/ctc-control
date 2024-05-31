import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  color:any;
  ngOnInit(): void {
    this.color = document.querySelector(".modal-content");
    this.color.classList.remove('modal-content')
  }

}
