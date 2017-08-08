/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { Action } from '@ngrx/store';
import { CompanyUserRoleActions } from '../actions/company-user-action';
import { CompanyUserRole } from '../models/company-user-role';

export type CompanyUserRoleState = CompanyUserRole[];

export function companiesUserRole (state: any = [], action: Action): CompanyUserRoleState {
  switch (action.type) {

    case CompanyUserRoleActions.GET_COMPANIES_USER_ROLES_SUCCESS:
      return action.payload;

    case CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_ID_SUCCESS:
      return state.filter(companyUserRole => {
        return companyUserRole.id === action.payload.id;
      });

    case CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_COMPANY_ID_SUCCESS:
      return state.filter(companyUserRole => {
        return companyUserRole.companyId !== action.payload.companyId;
      });

      // company user-role-table does not have userId and roleIds but I keep the app backwards-compatible for now
    case CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_IDS_SUCCESS:
      return state.filter(companyUserRole => {
        return companyUserRole.userId === action.payload.userId &&
          companyUserRole.roleId === action.payload.roleId;
      });

    case CompanyUserRoleActions.GET_COMPANY_USER_ROLES_BY_ROLE_ID_SUCCESS:
      return state.filter(companyUserRole => {
        return companyUserRole.id === action.payload.id;
      });

    case CompanyUserRoleActions.CREATE_COMPANY_COMPANY_USER_ROLES_SUCCESS:
      return [...state, action.payload];

    case CompanyUserRoleActions.DELETE_COMPANY_USER_ROLE_SUCCESS:
      return state.filter(company => {
        return company.id !== action.payload.id;
      });

    default:
      return state;
  }
}
