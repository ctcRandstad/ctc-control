import { Component, OnInit } from '@angular/core';
import { MdbNotificationRef } from 'mdb-angular-ui-kit/notification';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  text: string | null = null;
  color: string | null = null;
  constructor(public notificationRefAlert: MdbNotificationRef<AlertComponent>) {}

  ngOnInit(): void {
  }

  close(): void {
    const closeMessage = 'Alert closed';
    this.notificationRefAlert.close(closeMessage)
  }

}
