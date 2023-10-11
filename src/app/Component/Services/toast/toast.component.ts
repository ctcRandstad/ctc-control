import { Component, OnInit } from '@angular/core';
import { MdbNotificationRef } from 'mdb-angular-ui-kit/notification';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  text: string | null = null;
  color: string | null = null;
  cabezera: string | null = null;
  constructor(public notificationRef: MdbNotificationRef<ToastComponent>) {}

  ngOnInit(): void {
  }

}
