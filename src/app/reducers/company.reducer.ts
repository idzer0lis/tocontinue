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

export function companies (state: any = [], action: Action) {
  switch (action.type) {
    case 'GET_COMPANIES':
      return action.payload;
    case 'GET_COMPANY_BY_ID':
      return state.filter(company => {
        return company.id === action.payload.id;
      });
    case 'CREATE_COMPANY':
      return [...state, action.payload];
    case 'UPDATE_COMPANY':
      return state.map(company => {
        return company.id === action.payload.id ?
          Object.assign({}, company, action.payload) :
          company;
      });
    case 'DELETE_COMPANY':
      return state.filter(company => {
        return company.id !== action.payload.id;
      });
    default:
      return state;
  }
};
