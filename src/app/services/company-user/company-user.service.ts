/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */

import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserService } from '../user/user.service';
import { CompanyRoleService } from '../company-role/company-role.service';
import { CompanyUserRole } from '../../models/company-user-role';
import { CompanyUserRoleTable } from '../../models/company-user-role-table';

@Injectable()
export class CompanyUserService {
  private companyUserRolesURI = 'api/companyUserRoles';  // URL mockup web API
  private companyUsers = new BehaviorSubject<CompanyUserRoleTable[]>([]);
  private lastUserCompanyId = 0;
  constructor(
    private http: Http,
    private userService: UserService,
    private companyRoleService: CompanyRoleService) {
      this.http.get(this.companyUserRolesURI)
        .map( (response: Response) => response.json().data )
        .subscribe((data: CompanyUserRole[]) => {
          data.forEach((row: CompanyUserRole) => {
            if (row.id > this.lastUserCompanyId) { this.lastUserCompanyId = row.id; }
          });
        });
  }
  getCompanyUserRoleById(userId: number, companyId: number): Observable<CompanyUserRoleTable> {
    return this.http
      .get(this.companyUserRolesURI + '?userId=' + userId + '&companyId=' + companyId)
      .map( (response: Response) => response.json().data);
  }
  getCompanyRoleIdById(id: number): CompanyUserRoleTable {
    return this.companyUsers.value
      .filter((companyRole: CompanyUserRoleTable) => companyRole.id === id)
      .pop();
  }
  setUsersInCompany(companyId: number, values: CompanyUserRole): Observable<CompanyUserRoleTable[]> {
    if (!values.companyRole || !values.userId || !values.id) { return; }
    this.http.post('api/companyUserRoles', values).subscribe();
    return this.getUsersByCompany(companyId);
  }
  setRoleInCompany(companyId: number, values: CompanyUserRole): Observable<CompanyUserRoleTable[]> {
    if (!values.companyRole || !values.userId || !values.id) { return; }
    let company = this.getUsersByCompany(companyId);
    if (!company) {
      return null;
    }
    Object.assign(company, values);
    return company;
  }

  public getUsersByCompany(companyId: number): Observable<CompanyUserRoleTable[]> {
    this.companyUsers = new BehaviorSubject<CompanyUserRoleTable[]>([]);
    this.http.get('api/companyUserRoles?companyId=' + companyId )
      .map( (response: Response) => response.json().data)
      .subscribe((data: CompanyUserRole[]) => {
        data.forEach((row: CompanyUserRole) => {
          let username: string = this.userService.getUserById(row.userId).username;
          row.companyRole.forEach(roleId => {
            let roleName: string = this.companyRoleService.getCompanyRoleName(roleId).name;
            let newValue: CompanyUserRoleTable = {
              id: row.userId,
              username: username,
              roleId: roleId,
              role: roleName
            };
            this.companyUsers.next([...this.companyUsers.value, newValue]);
          });
        });
      });
    return this.companyUsers;
  }
  public removeUserRoleInCompany(userId: number, roleId: number): Observable<CompanyUserRoleTable[]> {
    // broken, this.companyUsers should be the same as the one set in setUsersInCompany but its not
    this.companyUsers.subscribe(x => console.log(x));
    let newUsers: any = this.companyUsers
      .getValue()
      .filter((user: CompanyUserRoleTable) => !(user.id === userId && user.roleId === roleId));
    this.companyUsers.next(newUsers);
    return this.companyUsers;
  }
  public getLastUserCompanyId(): number {
    return this.lastUserCompanyId;
  }
}
