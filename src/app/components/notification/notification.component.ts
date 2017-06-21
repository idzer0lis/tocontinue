import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'my-notification',
  templateUrl: './notification.component.html'
})

export class NotificationComponent implements OnInit {
  message: any;
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.getMessage().subscribe(message => { this.message = message; });
  }
}
