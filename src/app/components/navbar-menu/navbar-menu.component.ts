/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'my-navbar-menu',
  templateUrl: 'navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
  providers: [UserService]
})
export class NavbarMenuComponent {
  constructor(private userService: UserService) {}
  doLogout() {
    this.userService.logout();
  }
}
