/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
/*
import { TestBed, inject } from '@angular/core/testing';
import { Company } from './company';
import { CompanyService } from './company.service';

import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BackendData }  from '../in-memory-data.service';

describe('CompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, InMemoryWebApiModule.forRoot(BackendData)],
      providers: [CompanyService]
    });
  });

  it('should inject properly', inject([CompanyService], (service: CompanyService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllCompanies()', () => {

    it('should return an empty array by default', inject([CompanyService], (service: CompanyService) => {
      expect(service.getAllcompanies()).toEqual([]);
    }));

    it('should return all companies', inject([CompanyService], (service: CompanyService) => {
      let company1 = new Company({id: 1, title: 'Company 1', tenants: {id: 1, title: 'First Tenant'}});
      let company2 = new Company({id: 2, title: 'Company 2', tenants: {}});
      service.addCompany(company1);
      service.addCompany(company2);
      expect(service.getAllcompanies()).toEqual([company1, company2]);
    }));

  });

  describe('#save(company)', () => {

    it('should automatically assign an incrementing id', inject([CompanyService], (service: CompanyService) => {
      let company1 = new Company({title: 'Company 1', tenants: {id: 1, title: 'First Tenant'}});
      let company2 = new Company({title: 'Company 2', tenants: {}});
      service.addCompany(company1);
      service.addCompany(company2);
      expect(service.getCompanyById(1)).toEqual(company1);
      expect(service.getCompanyById(2)).toEqual(company2);
    }));

  });

  describe('#deleteCompanyById(id)', () => {

    it('should remove company with the corresponding id', inject([CompanyService], (service: CompanyService) => {
      let company1 = new Company({id: 1, title: 'Company 1', tenants: {id: 1, title: 'First Tenant'}});
      let company2 = new Company({id: 2, title: 'Company 2', tenants: {}});
      service.addCompany(company1);
      service.addCompany(company2);
      expect(service.getAllcompanies()).toEqual([company1, company2]);
      service.deleteCompanyById(1);
      expect(service.getAllcompanies()).toEqual([company2]);
      service.deleteCompanyById(2);
      expect(service.getAllcompanies()).toEqual([]);
    }));

    it('should not removing anything if company with corresponding id is not found', inject([CompanyService], (service: CompanyService) => {
      let company1 = new Company({id: 1, title: 'Company 1', tenants: {id: 1, title: 'First Tenant'}});
      let company2 = new Company({id: 2, title: 'Company 2', tenants: {}});
      service.addCompany(company1);
      service.addCompany(company2);
      expect(service.getAllcompanies()).toEqual([company1, company2]);
      service.deleteCompanyById(3);
      expect(service.getAllcompanies()).toEqual([company1, company2]);
    }));

  });

  describe('#updateCompanyById(id, values)', () => {

    it('should return company with the corresponding id and updated data', inject([CompanyService], (service: CompanyService) => {
      let company = new Company({id: 1, title: 'Company 1', tenants: {id: 1, title: 'First Tenant'}});
      service.addCompany(company);
      let updatedCompany = service.updateCompanyById(1, {
        title: 'new title'
      });
      expect(updatedCompany.title).toEqual('new title');
    }));

    it('should return null if company is not found', inject([CompanyService], (service: CompanyService) => {
      let company = new Company({id: 1, title: 'Company 1', tenants: {id: 1, title: 'First Tenant'}});
      service.addCompany(company);
      let updatedCompany = service.updateCompanyById(2, {
        title: 'new title'
      });
      expect(updatedCompany).toEqual(null);
    }));

  });
});
*/
