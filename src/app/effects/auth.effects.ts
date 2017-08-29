/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { UserService } from '../services/user/user.service';
import * as Auth from '../actions/auth';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$
    .ofType(Auth.LOGIN)
    .map((action: Auth.Login) => action.payload)
    // .do(() => this.userService.checkSession().map(x => console.log(x)).catch(error => console.log(error)))
    .exhaustMap(auth =>
      this.userService
        .checkSession()
        .do(() => console.log('Get user using the session'))
        .catch(err => console.log('err', err))
        // .catch(error => console.log(error))
/*        .do(x => console.log(x))
        .loginWrapper(auth.username, auth.password)
        .map(user => new Auth.LoginSuccess({ user }))
        .catch(error => of(new Auth.LoginFailure(error)))*/
    );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(Auth.LOGIN_SUCCESS)
    .do(() => {
      this.router.navigate(['/home']);
      // set cookie
      // localStorage.setItem('currentUser', JSON.stringify(user.payload));
    });

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
    .do(() => {
      this.router.navigate(['/login']);
      // remove cookie
    });
/*
  @Effect({ dispatch: false })
  checkSession$ = this.actions$
    .ofType(Auth.CHECK_SESSION)
    .do(() => {
      let validSession = this.userService.checkSession();
      console.log(validSession);
    });*/

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}
}
