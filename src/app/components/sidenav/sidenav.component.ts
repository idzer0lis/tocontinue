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
import { slideInLeftAnimation } from '../../animations/animations';


@Component({
  selector: 'my-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [slideInLeftAnimation]
})
export class SidenavComponent {
  public openNavbar = false;
  public showCompanies = false;
  constructor() {}
}
