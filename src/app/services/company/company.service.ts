import { Injectable } from '@angular/core';
import { Company } from './company';
import { Http , Response } from '@angular/http';

@Injectable()
export class CompanyService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  private lastId = 0;
  // variable for holding companies
  private companies: Company[] =  [];
  // URL mockup web API
  private backendData = 'api/companies';
  constructor ( private http: Http ) {
    // Populate the companies variable on instantiation
    this.http.get(this.backendData)
      .map( (response: Response) => response.json().data )
      .subscribe((data) => {
        data.forEach(company => {
          this.companies.push(company);
          if (company.id > this.lastId) { this.lastId = company.id; }
        });
      });
  }

  // Simulate POST /companies
  addCompany(company: Company): CompanyService {
    if (!company.id) {
      company.id = ++this.lastId;
    }
    this.companies.push(company);
    return this;
  }

  // Simulate DELETE /companies/:id
  deleteCompanyById(id: number): CompanyService {
    this.companies = this.companies
      .filter(company => company.id !== id);
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
  getAllcompanies(): Company[] {
    return this.companies;
  }

  // Simulate GET /companies/:id
  getCompanyById(id: number): Company {
    return this.companies
      .filter(company => company.id === id)
      .pop();
  }
}
