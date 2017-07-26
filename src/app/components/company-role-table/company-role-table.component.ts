/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */

import { Component, Input, Output, EventEmitter,  OnInit  } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { CompanyRoleTable } from '../../models/company-role-table';
import { Company } from '../../models/company';
import { ITdDataTableColumn } from '@covalent/core';

@Component({
  selector: 'my-company-role-table',
  templateUrl: './company-role-table.component.html',
  providers: [UserService]
})

export class CompanyRoleTableComponent implements OnInit {
  @Input()company: Company;
  @Output()selectedRoles = new EventEmitter<CompanyRoleTable[]>();
  public tableData: CompanyRoleTable[] = [];
  public selectedRows: CompanyRoleTable[] = [];
  public columns: ITdDataTableColumn[] = [
    { name: 'name', label: 'Role'}
  ];
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.getAllCompanyRoles().subscribe(roles => this.tableData = roles);
  }
  setRoles(roles: CompanyRoleTable[]) {
    this.selectedRoles.emit(roles);
  }
  showAddCompanyButton(): boolean {
   return !!this.selectedRows.length;
  }
}
