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
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserService } from '../user/user.service';
import { CompanyRoleService } from '../companyUserRole-role/companyUserRole-role.service';
import { CompanyUserRole } from '../../models/company-user-role';

import { Store } from '@ngrx/store';
import { AppState } from '../../models/appstore.model';
import { HttpHelperService } from '../http-utils/http-helper.service';

@Injectable()
export class CompanyUserService {
  private companyUserRolesURI = 'api/companyUserRoles';
  public companyUsers: Observable<CompanyUserRole[]>;
  private lastId = 0;

  constructor ( private http: Http, private store: Store<AppState> ) {
    this.companyUsers = store.select('companiesUserRole');
  }
  /**
   * Get a company user role by companyId
   * @param companyId id of the company to be queried
   * @returns void
   */
  public getUsersByCompany(companyId: number): void {
    this.http.get(`${this.companyUserRolesURI}companyId=?${companyId}`)
      .map(res => res.json())
      .subscribe(
        action => this.store.dispatch({type: 'GET_COMPANY_USER_ROLE_BY_COMPANY_ID', payload: companyId}),
        err => HttpHelperService.handleError(err)
      );
  }
  /**
   * Get a companyUserRole by UUID
   * @param id id of the company user role to be queried
   * @returns void
   */
  public getCompanyById(id: number): void {
    this.http.get(`${this.companyUserRolesURI}/${id}`)
      .map(res => res.json())
      .subscribe(
        action => this.store.dispatch({type: 'GET_COMPANY_USER_ROLE_BY_ID', payload: id}),
        err => HttpHelperService.handleError(err)
      );
  }
  /**
   * TO BE REMOVED; Kept only for backwards compatibility
   * Get company role Id by UUID
   * @param id UUID
   * returns void
   */
  getCompanyRoleIdById(id: number): void {
    this.http.get(`${this.companyUserRolesURI}`)
      .map(res => res.json())
      .subscribe(
        action => this.store.dispatch({type: 'GET_COMPANY_USER_ROLE_BY_ROLE_ID', payload: id}),
        err => HttpHelperService.handleError(err)
      );
  }
  /**
   * TO BE REMOVED; Kept only for backwards compatibility
   * Get a companyUserRole by user id and role id
   * @param userId user id of the companyUserRole to be queried
   * @param companyId company id of the companyUserRole to be queried
   * @returns void
   */
  public getCompanyUserRoleByIds(userId: number, companyId: number): void {
    this.http.get(`${this.companyUserRolesURI}/?userId=${userId}&companyId=$\{companyId}`)
      .map(res => res.json())
      .subscribe(
        action => this.store.dispatch({type: 'GET_COMPANY_USER_ROLE_BY_IDS', payload: {userId, companyId}}),
        err => HttpHelperService.handleError(err)
      );
  }
  /**
   * Get last companyUserRole id
   * @returns last companyUserRole id table
   */
  public getlastId(): number {
    return this.lastId;
  }
  /**
   * Sets new user-roles inside a company
   * @param companyId id of the company for which new user-role are added
   * @param companyUserRole object
   * @returns void
   */
  public setUsersInCompany(companyId: number, companyUserRole: CompanyUserRole): void {
    this.http.post(`${this.companyUserRolesURI}`, companyUserRole)
      .map(res => res.json())
      .map(payload => ({ type: 'SET_USERS_IN_COMPANY', payload }))
      .subscribe(
        action => this.store.dispatch(action),
        err => HttpHelperService.handleError(err)
        );
  }
  /**
   * Delete a companyUserRole by UUID
   * @param companyUserRole object to be removed
   * @returns void
   */
  public removeUserRoleInCompany(companyUserRole: CompanyUserRole): void {
    this.http.delete(`${this.companyUserRolesURI}${companyUserRole.id}`)
      .subscribe(
        action => this.store.dispatch({ type: 'DELETE_COMPANY_USER_ROLE', payload: companyUserRole }),
        err => HttpHelperService.handleError(err)
      );
  }
  /**
   * Update a companyUserRole by UUID
   * @param companyUserRole to be updated
   * @returns void
   *
   */
  public updateCompanyById(companyUserRole: CompanyUserRole): void {
    this.http.put(`${this.companyUserRolesURI}${companyUserRole.id}`, JSON.stringify(companyUserRole))
      .subscribe(
        action => this.store.dispatch({type: 'UPDATE_ITEM', payload: companyUserRole}),
        err => HttpHelperService.handleError(err)
      );
  }
}
