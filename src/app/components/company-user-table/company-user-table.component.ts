/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Company } from '../../services/company/company';
import { ITdDataTableColumn, TdDataTableSortingOrder, ITdDataTableSortChangeEvent } from '@covalent/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'my-company-user-table',
  templateUrl: './company-user-table.component.html',
  providers: [UserService]
})

export class CompanyUserTableComponent implements OnChanges, OnInit {
  @Input()company: Company;
  @Input()newUsers: Observable<Object>;
  public tableData: Object;
  public columns: ITdDataTableColumn[] = [
    { name: 'username', label: 'Username'},
    { name: 'role', label: 'User role' },
  ];
  public sortBy = 'username';
  public sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;
  constructor(private userService: UserService) {
    // this.userService.getUsersByCompany(this.company.id).subscribe(users => this.tableData = users);
  }
  ngOnInit() {
    this.userService.getUsersByCompany(this.company.id).subscribe(users => this.tableData = users);
  }
  ngOnChanges() {
    if (this.newUsers !== undefined) {
      this.newUsers.subscribe(user => this.tableData = user);
    }
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
  }
}
