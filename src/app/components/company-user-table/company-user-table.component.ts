/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import {
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
  IPageChangeEvent,
  TdDataTableService } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

import { CompanyUserService } from '../../services/company-user/company-user.service';
import { Company } from '../../models/company';
import { CompanyUserRole } from '../../models/company-user-role';
import { CompanyUserRoleTable } from '../../models/company-user-role-table';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app-state';
import { CompanyUserRoleActions } from '../../actions/company-user-actions';

@Component({
  selector: 'my-company-user-table',
  templateUrl: './company-user-table.component.html',
  styleUrls: ['./company-user-table.component.scss'],
  providers: [CompanyUserService]
})

export class CompanyUserTableComponent implements OnChanges, OnInit {
  @Input() company: Company;
  @Input() newUsers: Observable<CompanyUserRole[]>;
  public tableData: Observable<CompanyUserRoleTable[]>;
  public columns: ITdDataTableColumn[] = [
    {name: 'id', label: 'id'},
    {name: 'role', label: 'User role'},
    {name: 'actions', label: 'Actions'}
  ];
  public fromRow = 1;
  public currentPage = 1;
  public pageSize = 5;
  public sortBy = 'username';
  public sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;
  dataLength = 0;
  constructor(
    public dialog: MdDialog,
    private _dataTableService: TdDataTableService,
    private store: Store<AppState>,
    private companyUserRoleActions: CompanyUserRoleActions
  ) {
     this.tableData = this.store.select('companyUserRoles');



    // this.filter();
  }
  ngOnInit() {
    console.log(this.company);
    if (this.company) {
      this.store.dispatch(this.companyUserRoleActions.CompanyUserRoleByCompanyId(this.company.id));
    }
    this.tableData.subscribe(x => console.log(x));
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.company) {
      this.store.dispatch(this.companyUserRoleActions.CompanyUserRoleByCompanyId(this.company.id));
    } else {
      console.log('set new users');
      /*if (this.newUsers !== undefined) {
        this.tableData = this.newUsers;
      }*/
    }
  }
  openDialog(data) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: data.text
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(data);
      if ( parseInt (result, 10) ) {
        this.store.dispatch(this.companyUserRoleActions.deleteCompanyUserRole(data));

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
  /*filter(): void {
    if (this.tableData) {
      let newData: any[];
      this.tableData.subscribe(data => {
        newData = data;
      });
      this.dataLength = newData.length;
      newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    }
  }*/
}
