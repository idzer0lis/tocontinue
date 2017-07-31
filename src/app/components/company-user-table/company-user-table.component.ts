/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import {
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
  IPageChangeEvent } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

import { CompanyUserService } from '../../services/company-user/company-user.service';
import { Company } from '../../models/company';
import { CompanyUserRoleTable } from '../../models/company-user-role-table';

@Component({
  selector: 'my-company-user-table',
  templateUrl: './company-user-table.component.html',
  styleUrls: ['./company-user-table.component.scss'],
  providers: [CompanyUserService]
})

export class CompanyUserTableComponent implements OnChanges {
  @Input() company: Company;
  @Input() newUsers: Observable<CompanyUserRoleTable[]>;
  public tableData: CompanyUserRoleTable[] = [];
  public columns: ITdDataTableColumn[] = [
    {name: 'username', label: 'Username'},
    {name: 'role', label: 'User role'},
    {name: 'actions', label: 'Actions'}
  ];
  public fromRow = 1;
  public currentPage = 1;
  public pageSize = 5;
  public sortBy = 'username';
  public sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;
  constructor(
    private companyUserService: CompanyUserService,
    public dialog: MdDialog) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.company) {
      this.companyUserService.getUsersByCompany(this.company.id).subscribe( (users: CompanyUserRoleTable[]) => this.tableData = users);
    } else {
      if (this.newUsers !== undefined) {
        this.newUsers.subscribe((users: CompanyUserRoleTable[]) => {
          this.tableData = users;
        });
      }
    }
  }
  openDialog(data) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: data.text
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(data);
      if ( parseInt (result, 10) ) {
        this.companyUserService
          .removeUserRoleInCompany(data.userId, data.roleId)
          .subscribe(newUsers => this.tableData = newUsers);
      }
    });
  }
  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
  }
  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
  }
}
