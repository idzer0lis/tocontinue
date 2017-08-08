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
import { Company } from '../models/company';
import { CompanyActions } from '../actions/company.actions';

export type CompanyState = Company[];

export function companies (state: any = [], action: Action): CompanyState {
  switch (action.type) {

    case CompanyActions.GET_COMPANIES_SUCCESS:
      return action.payload;

    case CompanyActions.GET_COMPANY_BY_ID_SUCCESS:
      return state.filter(company => {
        return company.id === action.payload.id;
      });

    case CompanyActions.CREATE_COMPANY_SUCCESS:
      return [...state, action.payload];

    case CompanyActions.UPDATE_COMPANY_SUCCESS:
      return state.map(company => {
        return company.id === action.payload.id ?
          Object.assign({}, company, action.payload) :
          company;
      });

    case CompanyActions.DELETE_COMPANY_SUCCESS:
      return state.filter(company => {
        return company.id !== action.payload.id;
      });

    default:
      return state;
  }
}
