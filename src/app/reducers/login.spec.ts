/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */

import { reducer } from './login.reducer';
import * as fromLoginPage from './login.reducer';
import { Login, LoginSuccess, LoginFailure } from '../actions/auth';
import { Authenticate, User } from '../models/user';

describe('LoginPageReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromLoginPage.initialState);
    });
  });

  describe('LOGIN', () => {
    it('should make pending to true', () => {
      const user = { username: 'test' } as Authenticate;
      const createAction = new Login(user);

      const expectedResult = {
        error: null,
      };

      const result = reducer(fromLoginPage.initialState, createAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should have no error and no pending state', () => {
      const user = {id: 1, username: 'test' } as User;
      const createAction = new LoginSuccess({ user });

      const expectedResult = {
        error: null,
      };

      const result = reducer(fromLoginPage.initialState, createAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOGIN_FAILURE', () => {
    it('should have an error and no pending state', () => {
      const error = 'login failed';
      const createAction = new LoginFailure(error);

      const expectedResult = {
        error: error,
      };

      const result = reducer(fromLoginPage.initialState, createAction);
      expect(result).toEqual(expectedResult);
    });
  });
});
