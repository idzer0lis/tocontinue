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

@Injectable()
export class CompanyUserRoleActions {
  static GET_COMPANIES_USER_ROLES = '[CompanyUserRole] Load CompaniesUserRole';
  getCompanyUserRoles(): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANIES_USER_ROLES
    };
  }

  static GET_COMPANIES_USER_ROLES_SUCCESS = '[CompanyUserRole] Load CompanyUserRole Success';
  getCompanyUserRoleSuccess(companiesUserRoles): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANIES_USER_ROLES_SUCCESS,
      payload: companiesUserRoles
    };
  }

  static GET_COMPANY_USER_ROLES_BY_ID = '[CompanyUserRole] Get CompanyUserRole';
  getCompanyUserRole(id): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_ID,
      payload: id
    };
  }

  static GET_COMPANY_USER_ROLES_BY_ID_SUCCESS = '[CompanyUserRole] Get CompanyUserRole Success';
  CompanyUserRoleSuccess(companyUserRole): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_ID_SUCCESS,
      payload: companyUserRole
    };
  }

  static GET_COMPANY_USER_ROLES_BY_COMPANY_ID = '[CompanyUserRole] Get CompanyUserRole by Company Id';
  CompanyUserRoleByCompanyId(id): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_COMPANY_ID,
      payload: id
    };
  }

  static GET_COMPANY_USER_ROLES_BY_COMPANY_ID_SUCCESS = '[CompanyUserRole] Get CompanyUserRole by Company Id';
  CompanyUserRoleByCompanyIdSuccess(companyUserRole): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_COMPANY_ID_SUCCESS,
      payload: companyUserRole
    };
  }

  static GET_COMPANY_USER_ROLES_BY_ROLE_ID = '[CompanyUserRole] Get CompanyUserRole by Role Id';
  CompanyUserRoleByRoleId(id): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_ROLE_ID,
      payload: id
    };
  }

  static GET_COMPANY_USER_ROLES_BY_ROLE_ID_SUCCESS = '[CompanyUserRole] Get CompanyUserRole by Company Id';
  CompanyUserRoleByRoleIdSuccess(companyUserRole): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_ROLE_ID_SUCCESS,
      payload: companyUserRole
    };
  }

  static GET_COMPANY_USER_ROLES_BY_IDS = '[CompanyUserRole] Get CompanyUserRole by Ids';
  CompanyUserRoleByIds(userId, roleId): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_IDS,
      payload: {userId, roleId}
    };
  }

  static GET_COMPANY_USER_ROLES_BY_IDS_SUCCESS = '[CompanyUserRole] Get CompanyUserRole by Ids';
  CompanyUserRoleByIdsSuccess(companyUserRole): Action {
    return {
      type: CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_IDS_SUCCESS,
      payload: companyUserRole
    };
  }
  static CREATE_COMPANY_COMPANY_USER_ROLES = '[CompanyUserRole] Save CompanyUserRole';
  createCompanyUserRole(companyUserRole): Action {
    return {
      type: CompanyUserRoleActions.CREATE_COMPANY_COMPANY_USER_ROLES,
      payload: companyUserRole
    };
  }

  static CREATE_COMPANY_COMPANY_USER_ROLES_SUCCESS = '[CompanyUserRole] Save CompanyUserRole Success';
  createCompanyUserRoleSuccess(companyUserRole): Action {
    return {
      type: CompanyUserRoleActions.CREATE_COMPANY_COMPANY_USER_ROLES_SUCCESS,
      payload: companyUserRole
    };
  }

  static DELETE_COMPANY_USER_ROLE = '[CompanyUserRole] Delete CompanyUserRole';
  deleteCompanyUserRole(companyUserRole): Action {
    return {
      type: CompanyUserRoleActions.DELETE_COMPANY_USER_ROLE,
      payload: companyUserRole
    };
  }

  static DELETE_COMPANY_USER_ROLE_SUCCESS = '[CompanyUserRole] Delete CompanyUserRole Success';
  deleteCompanyUserRoleSuccess(companyUserRole): Action {
    return {
      type: CompanyUserRoleActions.DELETE_COMPANY_USER_ROLE_SUCCESS,
      payload: companyUserRole
    };
  }
}
