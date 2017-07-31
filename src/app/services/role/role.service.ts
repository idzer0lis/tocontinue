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
import { Role } from '../../models/role';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class RoleService {
  private rolesURI = 'api/roles';  // URL mockup web API
  private roles =  new BehaviorSubject<Role[]>([]);
  private lastId = 0;
  constructor( private http: Http ) {
    this.http.get(this.rolesURI)
      .map( (response: Response) => response.json().data )
      .subscribe((data) => {
        data.forEach(role => {
          if (role.id > this.lastId) { this.lastId = role.id; }
          this.roles.next([...this.roles.value, role]);
        });
      });
  }
  getAllRoles(): Observable<Role[]> {
    return this.roles;
  }
  getRoleName(id: number): any {
    return this.roles.value
      .filter( (role: Role) => role.id === id)
      .pop();
  }
  getLastRoleId(): number {
    return this.lastId;
  }
}

