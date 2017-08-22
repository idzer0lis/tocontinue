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
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { CompanyUserRoleActions } from '../actions/company-user-actions';
import { CompanyUserService } from '../services/company-user/company-user.service';

@Injectable()
export class CompanyUserRoleEffects {
  constructor (
    private update$: Actions,
    private companyUserRoleActions: CompanyUserRoleActions,
    private companyUserService: CompanyUserService,
  ) {}

  @Effect() getCompanies$ = this.update$
    .ofType(CompanyUserRoleActions.GET_COMPANIES_USER_ROLES)
    .map(action => action.payload)
    .switchMap(() => this.companyUserService.getAllCompaniesUserRoles())
    .map(companies => this.companyUserRoleActions.getCompanyUserRoleSuccess(companies));

  @Effect() getCompanyUserRole$ = this.update$
    .ofType(CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_ID)
    .map(action => action.payload)
    .switchMap(id => this.companyUserService.getCompanyUserRoleById(id))
    .map(company => this.companyUserRoleActions.CompanyUserRoleSuccess(company));

  @Effect() getCompanyUserRoleByCompanyId$ = this.update$
    .ofType(CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_COMPANY_ID)
    .map(action => action.payload.id)
    .exhaustMap(id => this.companyUserService.getUsersByCompany(id))
    .map(payload => this.companyUserRoleActions.CompanyUserRoleByCompanyIdSuccess(payload));


  @Effect() createCompanyUserRole$ = this.update$
    .ofType(CompanyUserRoleActions.CREATE_COMPANY_COMPANY_USER_ROLES)
    .map(action => action.payload)
    .switchMap(company => this.companyUserService.setUsersInCompany(company))
    .map(company => this.companyUserRoleActions.createCompanyUserRoleSuccess(company));

  @Effect() deleteCompanyUserRole$ = this.update$
    .ofType(CompanyUserRoleActions.DELETE_COMPANY_USER_ROLE)
    .map(action => action.payload)
    .switchMap(company => this.companyUserService.removeUserRoleInCompany(company))
    .map(company => this.companyUserRoleActions.deleteCompanyUserRoleSuccess(company));
}
