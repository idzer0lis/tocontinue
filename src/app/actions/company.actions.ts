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
  getCompanies(): Action {
    return {
      type: CompanyActions.GET_COMPANIES
    };
  }

  static GET_COMPANIES_SUCCESS = '[Company] Load Company Success';
  getCompaniesSuccess(companies): Action {
    return {
      type: CompanyActions.GET_COMPANIES_SUCCESS,
      payload: companies
    };
  }

  static GET_COMPANY_BY_ID = '[Company] Get Company';
  getCompany(id): Action {
    return {
      type: CompanyActions.GET_COMPANY_BY_ID,
      payload: id
    };
  }

  static GET_COMPANY_BY_ID_SUCCESS = '[Company] Get Company Success';
  getCompanySuccess(company): Action {
    return {
      type: CompanyActions.GET_COMPANY_BY_ID_SUCCESS,
      payload: company
    };
  }

  static CREATE_COMPANY = '[Company] Save Company';
  createCompany(company): Action {
    return {
      type: CompanyActions.CREATE_COMPANY,
      payload: company
    };
  }

  static CREATE_COMPANY_SUCCESS = '[Company] Save Company Success';
  createCompanySuccess(company): Action {
    return {
      type: CompanyActions.CREATE_COMPANY_SUCCESS,
      payload: company
    };
  }

  static UPDATE_COMPANY = '[Company] Add Company';
  updateCompany(company): Action {
    return {
      type: CompanyActions.UPDATE_COMPANY,
      payload: company
    };
  }

  static UPDATE_COMPANY_SUCCESS = '[Company] Add Company Success';
  updateCompanySuccess(company): Action {
    return {
      type: CompanyActions.UPDATE_COMPANY_SUCCESS,
      payload: company
    };
  }

  static DELETE_COMPANY = '[Company] Delete Company';
  deleteCompany(company): Action {
    return {
      type: CompanyActions.DELETE_COMPANY,
      payload: company
    };
  }

  static DELETE_COMPANY_SUCCESS = '[Company] Delete Company Success';
  deleteCompanySuccess(company): Action {
    return {
      type: CompanyActions.DELETE_COMPANY_SUCCESS,
      payload: company
    };
  }
}
