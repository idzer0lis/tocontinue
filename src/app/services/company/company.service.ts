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

@Injectable()
export class CompanyService {

  private COMPANIES_URI = 'api/company';
  private lastId = 0;

  constructor ( private http: Http ) {}
  /**
   * Get all companies
   * Action dispaches companies payload to the store
   * returns void
   */
  public getAllCompanies(): Observable<Company[]> {
    return this.http.get(this.COMPANIES_URI)
      .map(res => res.json().data)
      .do((company: Company) => {
        if (company.id > this.lastId) { this.lastId = company.id; }
      });
  }
  /**
   * Get a company by UUID
   * @param id id of the company to be retrived
   * @returns Observable of company
   */
  public getCompanyById(id: number): Observable<Company> {
    return this.http.get(`${this.COMPANIES_URI}/${id}`)
      .map(res => res.json().data);
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
   * @returns company observable with the new company
   */
  public createCompany(company: Company): Observable<Company> {
    return this.http.post(`${this.COMPANIES_URI}`, company)
      .map(res => res.json().data);
  }
  /**
   * Update a company by UUID
   * @param company to be updated
   * @returns void
   *
   */
  public updateCompanyById(company: Company): Observable<Company> {
    return this.http.put(`${this.COMPANIES_URI}/${company.id}`, company)
      .map(res => res.json().data);
  }
  /**
   * Delete a company by UUID
   * @param company object to be removed
   * @returns void
   */
  public deleteCompany(company: Company): any {
    return this.http.delete(`${this.COMPANIES_URI}/${company.id}`);
  }
}
