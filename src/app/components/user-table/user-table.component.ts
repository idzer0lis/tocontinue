/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import {
  ITdDataTableColumn,
  TdDataTableService,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
  IPageChangeEvent } from '@covalent/core';

@Component({
  selector: 'my-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  providers: [UserService]
})

export class UserTableComponent {
  @Output()selectedUsers = new EventEmitter<User[]>();
  public selectedRows: User[] = [];
  public tableData: User[] = [];
  public columns: ITdDataTableColumn[] = [
    { name: 'username', label: 'Username'}
  ];
  public filteredData: User[];
  public filteredTotal = 0;
  public searchTerm = '';
  public fromRow = 1;
  public currentPage = 1;
  public pageSize = 5;
  public sortBy = 'username';
  public sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;

  constructor(private userService: UserService, private _dataTableService: TdDataTableService) {
    this.userService.getAllUsers().subscribe(users => {
      this.tableData = users;
      this.filteredData = this.tableData;
      this.filteredTotal = this.tableData.length;
      this.filter();
    });
  }
  selectUsers(users: User[]) {
    this.selectedUsers.emit(users);
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.tableData;
    let excludedColumns: string[] = this.columns
      .filter((column: ITdDataTableColumn) => {
        return ((column.filter === undefined && column.hidden === true) ||
        (column.filter !== undefined && column.filter === false));
      }).map((column: ITdDataTableColumn) => {
        return column.name;
      });
    newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }
  showAddCompanyButton(): boolean {
    return !!this.selectedRows.length;
  }
}
