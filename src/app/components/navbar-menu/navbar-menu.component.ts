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
import { Store } from '@ngrx/store';
import * as Auth from '../../actions/auth';
import * as fromAuth from '../../reducers';

@Component({
  selector: 'my-navbar-menu',
  templateUrl: 'navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent {
  constructor(private store: Store<fromAuth.State>) {}

  doLogout() {
    this.store.dispatch(new Auth.Logout());
  }
}
