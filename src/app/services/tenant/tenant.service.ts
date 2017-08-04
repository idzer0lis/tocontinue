/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Tenant instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { Injectable } from '@angular/core';
import { Company } from '../../models/company';
import { Tenant } from '../../models/tenant';
import { Http , Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CompanyService } from '../company/company.service';

@Injectable()
export class TenantService {
  private companiesURI = 'api/companies';
  private companies = new BehaviorSubject<Company[]>([]);
  private lastId = 0;
  constructor ( private http: Http, private companyService: CompanyService ) {
    this.http.get(this.companiesURI)
      .map( (response: Response) => response.json().data )
      .subscribe((data) => {
        data.forEach(company => {
          this.companies.next([...this.companies.value, company]);
          if (company.id > this.lastId) { this.lastId = company.id; }
        });
      });
  }
  // Simulate POST /tenants
  addTenant(companyId: number, tenant: Tenant): void {
    if (!tenant.id) {
      tenant.id = ++this.lastId;
    }
    let company: Company = this.companyService.getCompanyById(companyId);
    Object.assign(company.tenants.push(tenant), company);
  }

  // Simulate DELETE /tenants/:id
  deleteTenantById(id: number): TenantService {
    this.companies.next(this.companies.value
      .filter(company => company.tenants.forEach(tenant => tenant.id !== id )));
    return this;
  }

  // Simulate PUT /tenants/:id
  updateTenantById(id: number, values: Object = {}): Tenant {
    let tenant = this.getTenantById(id);
    if (!tenant) {
      return null;
    }
    Object.assign(tenant, values);
    return tenant;
  }

  // Simulate GET /tenants
  getAlltenants(): Tenant[] {
    let tenants: Tenant[] = [];
    this.companies.value.forEach( (company: Company) => {
      company.tenants.forEach( (tenant: Tenant) => {
        tenants.push(tenant);
      });
    });
    return tenants;
  }

  // Simulate GET /tenants/:id
  getTenantById(id: number): Tenant {
    return this.getAlltenants()
      .filter(tenant => tenant.id === id)
      .pop();
  }
  getLastTenantId(): number {
    return this.lastId;
  }
}
