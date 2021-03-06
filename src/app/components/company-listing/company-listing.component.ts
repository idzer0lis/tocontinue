/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company/company.service';
import { slideInDownAnimation } from '../../animations/animations';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app-state';
import { Observable } from 'rxjs/Observable';
import { CompanyActions } from '../../actions/company.actions';

@Component({
  selector: 'my-list',
  templateUrl: './company-listing.component.html',
  styleUrls: ['./company-listing.component.scss'],
  providers: [CompanyService],
  animations: [slideInDownAnimation]
})
export class ListComponent implements OnInit {
  private companies: Observable<Company[]>;
  private currentCompany: Company;
  public showAddCompanyComponent = false;
  public showAddTenantComponent = false;
  public showEditTenantComponent = false;
  public filterText = '';

  constructor(
    private store: Store<AppState>,
    private companyActions: CompanyActions
  ) {}
  ngOnInit() {
    this.companies = this.store.select('companies');
    this.store.dispatch(this.companyActions.getCompanies());
    this.companies.subscribe(x => console.log(x));
  }
  removeCompany(company: Company): any {
    this.store.dispatch(this.companyActions.deleteCompany(company));
  }
  selectedCompany(company: Company) {
    this.currentCompany = company;
    // TODO: there must be a better way for hiding/showing components
    this.showAddCompanyComponent = false;
    this.showAddTenantComponent = false;
    this.showEditTenantComponent = false;
  }
  showAddTenant(company: Company) {
    this.currentCompany = company;
    this.showAddTenantComponent = true;
    this.showEditTenantComponent = false;
    this.showAddCompanyComponent = false;
  }
  showEditTenant(company: Company) {
    this.currentCompany = company;
    this.showEditTenantComponent = true;
    this.showAddTenantComponent = false;
    this.showAddCompanyComponent = false;
  }
}
