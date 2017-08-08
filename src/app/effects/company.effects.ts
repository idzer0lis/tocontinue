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
import { Effect, Actions } from '@ngrx/effects';
import { CompanyActions } from '../actions/company.actions';
import { CompanyService } from '../services/company/company.service';

@Injectable()
export class CompanyEffects {
  constructor (
    private update$: Actions,
    private companyActions: CompanyActions,
    private companyService: CompanyService,
  ) {}

  @Effect() getCompanies$ = this.update$
    .ofType(CompanyActions.GET_COMPANIES)
    .switchMap(() => this.companyService.getAllCompanies())
    .map(companies => this.companyActions.getCompaniesSuccess(companies));

  @Effect() getCompany$ = this.update$
    .ofType(CompanyActions.GET_COMPANY_BY_ID)
    .map(action => action.payload)
    .switchMap(id => this.companyService.getCompanyById(id))
    .map(company => this.companyActions.getCompanySuccess(company));

  @Effect() createCompany$ = this.update$
    .ofType(CompanyActions.CREATE_COMPANY)
    .map(action => action.payload)
    .switchMap(company => this.companyService.createCompany(company))
    .map(company => this.companyActions.createCompanySuccess(company));

  @Effect() updateHero$ = this.update$
    .ofType(CompanyActions.UPDATE_COMPANY)
    .map(action => action.payload)
    .switchMap(company => this.companyService.updateCompanyById(company))
    .map(company => this.companyActions.updateCompanySuccess(company));

  @Effect() deleteCompany$ = this.update$
    .ofType(CompanyActions.DELETE_COMPANY)
    .map(action => action.payload)
    .switchMap(company => this.companyService.deleteCompany(company))
    .map(company => this.companyActions.deleteCompanySuccess(company));
}
