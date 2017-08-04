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
import { Http , Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpHelperService } from '../http-utils/http-helper.service';

@Injectable()
export class CompanyService {
  private companiesURI = '/company';
  private companies = new BehaviorSubject<Company[]>([]);
  private lastId = 0;
  constructor ( private http: Http ) {
    this.http.get(this.companiesURI)
      .map( (response: Response) => response.json().data )
      .subscribe(
        (data: any) => {
          data.forEach(company => {
            this.companies.next([...this.companies.value, company]);
            if (company.id > this.lastId) { this.lastId = company.id; }
          });
        },
        (err: HttpErrorResponse) => {
          HttpHelperService.handleError(err);
        }
      );
  }
  /**
   * Add a company
   * @param company  company object
   * @returns BehaviorSubject with the all the companies plus the new one
   */
  public addCompany(company: Company): CompanyService {
    if (!company.id) {
      company.id = ++this.lastId;
    }
    this.http
      .post(this.companiesURI, company)
      .subscribe(
      (data?: any) => {
        this.companies.next([...this.companies.value, company]);
       },
      (err: HttpErrorResponse) => {
        HttpHelperService.handleError(err);
      }
      );
    return this;
  }
  /**
   * Delete a company by id
   * @param id id of the company to be removed
   * @returns BehaviorSubject with the all the companies minus the new one
   */
  // Simulate DELETE /companies/:id
  public deleteCompanyById(id: number): CompanyService {
    this.companies.next(this.companies.value
      .filter(company => company.id !== id));
    return this;
  }
  /**
   * Update a company by id
   * @param id id of the company to be updated
   * @param object with the new values
   * @returns the updated object
   */
  // Simulate PUT /companies/:id
  public updateCompanyById(id: number, values: Object = {}): Company {
    let company = this.getCompanyById(id);
    if (!company) {
      return null;
    }
    Object.assign(company, values);
    return company;
  }
  /**
   * Get all companies
   * @returns BehaviorSubject with the all the companies
   */
  // Simulate GET /companies
  public getAllcompanies(): Observable<Company[]> {
    return this.companies;
  }
  /**
   * Get a company by id
   * @param id id of the company to be retrived
   * @returns the company object
   */
  // Simulate GET /companies/:id
  public getCompanyById(id: number): Company {
    return this.companies.value
      .filter(company => company.id === id)
      .pop();
  }
  /**
   * Method to get the last 'table' id
   * @returns the last id found in company table
   */
  public getLastCompanyId(): number {
    return this.lastId;
  }
}
