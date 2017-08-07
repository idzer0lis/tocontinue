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
import { Company } from '../../models/company';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpHelperService } from '../http-utils/http-helper.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../../models/appstore.model';

@Injectable()
export class CompanyService {

  private COMPANIES_URI = '/company';
  public companies: Observable<Company[]>;
  private lastId = 0;

  constructor ( private http: Http, private store: Store<AppStore> ) {
    this.companies = store.select('companies');
  }
  /**
   * Get all companies
   * Action dispaches companies payload to the store
   * returns void
   */
  public getAllCompanies(): void {
    this.http.get(this.COMPANIES_URI)
      .map(res => res.json())
      .map((company: Company) => {
        if (company.id > this.lastId) { this.lastId = company.id; }
      })
      .map(payload => ({ type: 'GET_COMPANIES', payload }))
      .subscribe(
        action => this.store.dispatch(action),
        err => HttpHelperService.handleError(err)
      );
  }
  /**
   * Get a company by UUID
   * @param id id of the company to be retrived
   * @returns the company object
   */
  public getCompanyById(id: number): void {
    this.http.get(`${this.COMPANIES_URI}/${id}`)
      .subscribe(
        action => this.store.dispatch({type: 'GET_COMPANY_BY_ID', payload: id}),
        err => HttpHelperService.handleError(err)
      );
  }
  /**
   * Get last company id
   * @param last company id from company table
   * @returns last company id table
   */
  public getLastCompanyId(): number {
    return this.lastId;
  }
  /**
   * Wrapper for create/update company
   * @param company  company object
   * @returns void
   */
  saveCompany(company: Company): void {
    (company.id) ? this.updateCompanyById(company) : this.createCompany(company);
  }
  /**
   * Add a company
   * @param company  company object
   * @returns companies observable with the new company
   */
  public createCompany(company: Company): void {
    this.http.post(`${this.COMPANIES_URI}`, company)
      .map(res => res.json())
      .map(payload => ({ type: 'CREATE_COMPANY', payload }))
      .subscribe(
        action => this.store.dispatch(action),
        err => HttpHelperService.handleError(err)
      );
  }
  /**
   * Update a company by UUID
   * @param company to be updated
   * @returns void
   *
   */
  public updateCompanyById(company: Company): void {
    this.http.put(`${this.COMPANIES_URI}${company.id}`, company)
      .subscribe(
        action => this.store.dispatch({type: 'UPDATE_COMPANY', payload: company}),
        err => HttpHelperService.handleError(err)
      );
  }
  /**
   * Delete a company by UUID
   * @param company object to be removed
   * @returns void
   */
  public deleteCompany(company: Company): void {
    this.http.delete(`${this.COMPANIES_URI}${company.id}`)
      .subscribe(
        action => this.store.dispatch({ type: 'DELETE_COMPANY', payload: company }),
        err => HttpHelperService.handleError(err)
      );
  }
}
