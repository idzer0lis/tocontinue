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
import { Action } from '@ngrx/store';

@Injectable()
export class CompanyActions {

  static GET_COMPANIES = '[Company] Load Companies';
  static GET_COMPANIES_SUCCESS = '[Company] Load Companies Success';
  static GET_COMPANY_BY_ID = '[Company] Load Company';
  static GET_COMPANY_BY_ID_SUCCESS = '[Company] Load Company Success';
  static CREATE_COMPANY = '[Company] Save Company';
  static CREATE_COMPANY_SUCCESS = '[Company] Save Company Success';
  static UPDATE_COMPANY = '[Company] Update Company';
  static UPDATE_COMPANY_SUCCESS = '[Company] Update Company Success';
  static DELETE_COMPANY = '[Company] Delete Company';
  static DELETE_COMPANY_SUCCESS = '[Company] Delete Company Success';

  getCompanies(): Action {
    return {
      type: CompanyActions.GET_COMPANIES
    };
  }

  getCompaniesSuccess(companies): Action {
    return {
      type: CompanyActions.GET_COMPANIES_SUCCESS,
      payload: companies
    };
  }

  getCompany(id): Action {
    return {
      type: CompanyActions.GET_COMPANY_BY_ID,
      payload: id
    };
  }

  getCompanySuccess(company): Action {
    return {
      type: CompanyActions.GET_COMPANY_BY_ID_SUCCESS,
      payload: company
    };
  }

  createCompany(company): Action {
    return {
      type: CompanyActions.CREATE_COMPANY,
      payload: company
    };
  }

  createCompanySuccess(company): Action {
    return {
      type: CompanyActions.CREATE_COMPANY_SUCCESS,
      payload: company
    };
  }

  updateCompany(company): Action {
    return {
      type: CompanyActions.UPDATE_COMPANY,
      payload: company
    };
  }

  updateCompanySuccess(company): Action {
    return {
      type: CompanyActions.UPDATE_COMPANY_SUCCESS,
      payload: company
    };
  }

  deleteCompany(company): Action {
    return {
      type: CompanyActions.DELETE_COMPANY,
      payload: company
    };
  }

  deleteCompanySuccess(company): Action {
    return {
      type: CompanyActions.DELETE_COMPANY_SUCCESS,
      payload: company
    };
  }
}

