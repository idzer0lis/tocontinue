/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */

import { Component, Input, Output, EventEmitter,  OnChanges  } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Role } from '../../services/role/role';
import { Company } from '../../services/company/company';
import { ITdDataTableColumn } from '@covalent/core';

@Component({
  selector: 'my-company-role-table',
  templateUrl: './company-role-table.component.html',
  providers: [UserService]
})

export class CompanyRoleTableComponent implements OnChanges {
  @Input()company: Company;
  @Output()selectedRoles = new EventEmitter<Role[]>();
  public tableData: Role[] = [];
  public selectedRows: Role[] = [];
  public columns: ITdDataTableColumn[] = [
    { name: 'name', label: 'Role'},
  ];

  constructor(private userService: UserService) {}
  ngOnChanges() {
    this.userService.getAllRoles().subscribe(roles => this.tableData = roles);
  }
  selectRoles(roles: Role[]) {
    console.log(roles);
    this.selectedRoles.emit(roles);
  }
}
