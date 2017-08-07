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

export function companiesUserRole (state: any = [], action: Action) {
  switch (action.type) {
    case 'GET_COMPANY_USER_ROLES':
      return action.payload;
    case 'GET_COMPANY_USER_ROLE_BY_COMPANY_ID':
      return state.filter(companyUserRole => {
        return companyUserRole.companyId !== action.payload.companyId;
      });
    case 'GET_COMPANY_USER_ROLE_BY_ID':
      return state.filter(companyUserRole => {
      return companyUserRole.id === action.payload.id;
    });
      // company user-role-table does not have userId and roleIds but I keep the app backwards-compatible for now
    case 'GET_COMPANY_USER_ROLE_BY_IDS':
      return state.filter(companyUserRole => {
        return companyUserRole.userId === action.payload.userId &&
          companyUserRole.roleId === action.payload.roleId;
      });
    case 'GET_COMPANY_USER_ROLE_BY_ROLE_ID':
      return state.filter(companyUserRole => {
        return companyUserRole.id === action.payload.id;
      });
    case 'SET_USERS_IN_COMPANY':
      return [...state, action.payload];
    case 'DELETE_COMPANY_USER_ROLE':
      return state.filter(company => {
        return company.id !== action.payload.id;
      });
    default:
      return state;
  }
}
