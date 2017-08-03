/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'my-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit {
  message: any;
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.getMessage().subscribe(message => { this.message = message; });
  }
}
