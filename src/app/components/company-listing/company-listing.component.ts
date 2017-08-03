/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { Component, OnInit, OnChanges } from '@angular/core';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company/company.service';
import { slideInDownAnimation } from '../../animations/animations';

@Component({
  selector: 'my-list',
  templateUrl: './company-listing.component.html',
  styleUrls: ['./company-listing.component.scss'],
  providers: [CompanyService],
  animations: [slideInDownAnimation]
})
export class ListComponent implements OnInit, OnChanges {
  private companies: Company[];
  private currentCompany: Company;
  public showAddCompany = false;
  public AddTenant = false;
  public EditTenant = false;
  public filterText = '';

  constructor(private companyService: CompanyService) {}
  ngOnInit() {
    this.companyService.getAllcompanies().subscribe(companies => this.companies = companies );
  }
  ngOnChanges() {
    this.companyService.getAllcompanies().subscribe(companies => this.companies = companies );
  }
  removeCompany(company: Company): void {
    this.companyService.deleteCompanyById(company.id);
  }
  selectedCompany(company: Company) {
    this.currentCompany = company;
    this.showAddCompany = false;
    this.AddTenant = false;
    this.EditTenant = false;
  }
  showAddTenant(company: Company) {
    this.currentCompany = company;
    this.AddTenant = true;
    this.EditTenant = false;
  }
  showEditTenant(company: Company) {
    console.log(company);
    this.currentCompany = company;
    this.EditTenant = true;
  }
}
