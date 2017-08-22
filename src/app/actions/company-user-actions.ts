/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to CompanyUserRole instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { CompanyUserRole } from '../models/company-user-role';

@Injectable()
export class CompanyUserRoleActions {

  static GET_COMPANIES_USER_ROLES = '[CompanyUserRole] Load CompaniesUserRole';
  static GET_COMPANIES_USER_ROLES_SUCCESS = '[CompanyUserRole] Load CompanyUserRole Success';
  static GET_COMPANY_USER_ROLES_BY_ID = '[CompanyUserRole] Get CompanyUserRole';
  static GET_COMPANY_USER_ROLES_BY_ID_SUCCESS = '[CompanyUserRole] Get CompanyUserRole Success';
  static GET_COMPANY_USER_ROLES_BY_COMPANY_ID = '[CompanyUserRole] Get CompanyUserRole by Company Id';
  static GET_COMPANY_USER_ROLES_BY_COMPANY_ID_SUCCESS = '[CompanyUserRole] Get CompanyUserRole by Company Id';
  static CREATE_COMPANY_COMPANY_USER_ROLES = '[CompanyUserRole] Save CompanyUserRole';
  static CREATE_COMPANY_COMPANY_USER_ROLES_SUCCESS = '[CompanyUserRole] Save CompanyUserRole Success';
  static DELETE_COMPANY_USER_ROLE = '[CompanyUserRole] Delete CompanyUserRole';
  static DELETE_COMPANY_USER_ROLE_SUCCESS = '[CompanyUserRole] Delete CompanyUserRole Success';
  // Kept for backwards compatibility with in-memory-api ( you can disable it from app.module.ts )
  static GET_COMPANY_USER_ROLES_BY_ROLE_ID = '[CompanyUserRole] Get CompanyUserRole by Role Id';
  static GET_COMPANY_USER_ROLES_BY_ROLE_ID_SUCCESS = '[CompanyUserRole] Get CompanyUserRole by Role Id';
  static GET_COMPANY_USER_ROLES_BY_IDS = '[CompanyUserRole] Get CompanyUserRole by Ids';
  static GET_COMPANY_USER_ROLES_BY_IDS_SUCCESS = '[CompanyUserRole] Get CompanyUserRole by Ids';

  getCompanyUserRoles(): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANIES_USER_ROLES
    };
  }

  getCompanyUserRoleSuccess(companiesUserRoles): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANIES_USER_ROLES_SUCCESS,
      payload: companiesUserRoles
    };
  }

  getCompanyUserRole(id): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_ID,
      payload: id
    };
  }

  CompanyUserRoleSuccess(companyUserRole): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_ID_SUCCESS,
      payload: companyUserRole
    };
  }

  CompanyUserRoleByCompanyId(id): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_COMPANY_ID,
      payload: {
        id: id
      }
    };
  }

  CompanyUserRoleByCompanyIdSuccess(companyUserRole): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_COMPANY_ID_SUCCESS,
      payload: {
        companyUserRole: companyUserRole
      }
    };
  }

  CompanyUserRoleByRoleId(id): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_ROLE_ID,
      payload: id
    };
  }

  CompanyUserRoleByRoleIdSuccess(companyUserRole): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_ROLE_ID_SUCCESS,
      payload: companyUserRole
    };
  }

  CompanyUserRoleByIds(userId, roleId): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_IDS,
      payload: {userId, roleId}
    };
  }

  CompanyUserRoleByIdsSuccess(companyUserRole): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_IDS_SUCCESS,
      payload: companyUserRole
    };
  }

  createCompanyUserRole(companyUserRole): Action {
    return {
      type: CompanyUserRoleActions.CREATE_COMPANY_COMPANY_USER_ROLES,
      payload: companyUserRole
    };
  }

  createCompanyUserRoleSuccess(companyUserRole): Action {
    return {
      type: CompanyUserRoleActions.CREATE_COMPANY_COMPANY_USER_ROLES_SUCCESS,
      payload: companyUserRole
    };
  }

  deleteCompanyUserRole(companyUserRole): Action {
    return {
      type: CompanyUserRoleActions.DELETE_COMPANY_USER_ROLE,
      payload: companyUserRole
    };
  }

  deleteCompanyUserRoleSuccess(companyUserRole): Action {
    return {
      type: CompanyUserRoleActions.DELETE_COMPANY_USER_ROLE_SUCCESS,
      payload: companyUserRole
    };
  }
}
