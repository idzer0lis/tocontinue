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
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CompanyService {
  private companiesURI = 'api/companies';
  private companies = new BehaviorSubject<Company[]>([]);
  private lastId = 0;
  constructor ( private http: Http ) {
    this.http.get(this.companiesURI)
      .map( (response: Response) => response.json().data )
      .subscribe((data) => {
        data.forEach(company => {
          this.companies.next([...this.companies.value, company]);
          if (company.id > this.lastId) { this.lastId = company.id; }
        });
      });
  }
  // Simulate POST /companies
  addCompany(company: Company): CompanyService {
    if (!company.id) {
      company.id = ++this.lastId;
    }
    this.companies.next([...this.companies.value, company]);
    return this;
  }

  // Simulate DELETE /companies/:id
  deleteCompanyById(id: number): CompanyService {
    this.companies.next(this.companies.value
      .filter(company => company.id !== id));
    return this;
  }

  // Simulate PUT /companies/:id
  updateCompanyById(id: number, values: Object = {}): Company {
    let company = this.getCompanyById(id);
    if (!company) {
      return null;
    }
    Object.assign(company, values);
    return company;
  }

  // Simulate GET /companies
  getAllcompanies(): Observable<Company[]> {
    return this.companies;
  }

  // Simulate GET /companies/:id
  getCompanyById(id: number): Company {
    return this.companies.value
      .filter(company => company.id === id)
      .pop();
  }
  getLastCompanyId(): number {
    return this.lastId;
  }
}
