/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
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
import { CompanyRoleTable } from '../../models/company-role-table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CompanyRoleService {
  private companyRolesURI = 'api/companyRoles';  // URL mockup web API
  private companyRoles =  new BehaviorSubject<CompanyRoleTable[]>([]);
  constructor( private http: Http ) {
    this.http.get(this.companyRolesURI)
      .map( (response: Response) => response.json().data )
      .subscribe((data) => {
        data.forEach(role => {
          this.companyRoles.next([...this.companyRoles.value, role]);
        });
      });
  }
  getAllCompanyRoles(): Observable<CompanyRoleTable[]> {
    return this.companyRoles;
  }
  getCompanyRoleName(id: number): CompanyRoleTable {
    return this.companyRoles.value
      .filter( (role: CompanyRoleTable) => role.id === id)
      .pop();
  }
}

