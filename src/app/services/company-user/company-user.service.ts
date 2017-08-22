/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to CompanyUserRole instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */

import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { CompanyUserRole } from '../../models/company-user-role';
import { Observable } from 'rxjs/Observable';
// TODO import { HttpHelperService } from '../http-utils/http-helper.service';


@Injectable()
export class CompanyUserService {
  private companyUserRolesURI = 'api/companyUserRoles';
  private lastId = 0;

  constructor ( private http: Http ) {
  }
  /**
   * Get all company user roles
   * @returns Observable with all company user roles
   */
  getAllCompaniesUserRoles(): Observable<CompanyUserRole[]> {
    return this.http.get(`${this.companyUserRolesURI}`)
      .map((res: Response) => res.json().data || [] )
      .do((companyUserRole: CompanyUserRole) => {
        if (companyUserRole.id > this.lastId) { this.lastId = companyUserRole.id; }
      });
  }
  /**
   * Get a companyUserRole by UUID
   * @param id id of the company user role to be queried
   * @returns Observable
   */
  public getCompanyUserRoleById(id: number): Observable<CompanyUserRole> {
    return this.http.get(`${this.companyUserRolesURI}/?id=${id}`)
      .map((res: Response) => res.json().data || [] );
  }
  /**
   * Get a company user role by companyId
   * @param companyId id of the company to be queried
   * @returns any, because we dont know if its a collection or single item coming from the request
   */
  public getUsersByCompany(companyId: number): Observable<CompanyUserRole[]> {
    return this.http.get(`${this.companyUserRolesURI}?companyId=${companyId}`)
      .map((res: Response) => res.json().data);
  }
  /**
   * Sets new user-roles inside a company
   * @param companyId id of the company for which new user-role are added
   * @param companyUserRole object
   * @returns Observable
   */
  public setUsersInCompany(companyUserRole: CompanyUserRole): Observable<CompanyUserRole[]> {
    return this.http.post(`${this.companyUserRolesURI}`, companyUserRole)
      .map((res: Response) => res.json().data || [] );
  }
  /**
   * Delete a companyUserRole by UUID
   * @param companyUserRole object to be removed
   * @returns Observable
   */
  public removeUserRoleInCompany(companyUserRole: CompanyUserRole): Observable<CompanyUserRole> {
    return this.http.delete(`${this.companyUserRolesURI}/?id=${companyUserRole.id}`)
      .map((res: Response) => res.json().data || [] );
  }
  /**
   * Update a companyUserRole by UUID
   * Dont know if its needed for now as we insert/delete new user company roles
   * @param companyUserRole to be updated
   * @returns Observable
   *
   */
  public updateCompanyById(companyUserRole: CompanyUserRole): Observable<CompanyUserRole> {
    return this.http.put(`${this.companyUserRolesURI}/?id=${companyUserRole.id}`, companyUserRole)
      .map((res: Response) => res.json().data || [] );
  }
  /**
   * TO BE REMOVED; Kept only for backwards compatibility
   * Get a companyUserRole by user id and role id
   * @param userId user id of the companyUserRole to be queried
   * @param companyId company id of the companyUserRole to be queried
   * @returns Observable
   */
  public getCompanyUserRoleByIds(userId: number, companyId: number): Observable<CompanyUserRole> {
    return this.http.get(`${this.companyUserRolesURI}/?userId=${userId}&companyId=$\{companyId}`)
      .map((res: Response) => res.json().data || [] );
  }
  /**
   * Get last companyUserRole id
   * @returns last companyUserRole id table
   */
  public getlastId(): number {
    return this.lastId;
  }
}
