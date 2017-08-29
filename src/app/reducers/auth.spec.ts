/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { reducer } from './auth.reducer';
import * as fromAuth from './auth.reducer';
import { Login, LoginSuccess, Logout } from '../actions/auth';
import { Authenticate, User } from '../models/user';

describe('AuthReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromAuth.initialState);
    });
  });

  describe('wrong login payload', () => {
    it('should NOT authenticate a user', () => {
      const user = { username: 'someUserName' } as Authenticate;
      const createAction = new Login(user);

      const expectedResult = fromAuth.initialState;

      const result = reducer(fromAuth.initialState, createAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should add a user set loggedIn to true in auth state', () => {
      const user = { id: 1, username: 'test' } as User;
      const createAction = new LoginSuccess({ user });

      const expectedResult = {
        loggedIn: true,
        user: { id: 1, username: 'test' },
      };

      const result = reducer(fromAuth.initialState, createAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOGOUT', () => {
    it('should logout a user', () => {
      const initialState = {
        loggedIn: true,
        user: { id: 1, username: 'test' },
      } as fromAuth.State;
      const createAction = new Logout();

      const expectedResult = fromAuth.initialState;

      const result = reducer(initialState, createAction);
      expect(result).toEqual(expectedResult);
    });
  });
});
