/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import * as auth from '../actions/auth';

export interface State {
  error: string | null;
}

export const initialState: State = {
  error: null,
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN: {
      return {
        ...state,
        error: null,
      };
    }

    case auth.LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
      };
    }

    case auth.LOGIN_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
