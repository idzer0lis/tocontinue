/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard.service';

describe('AuthGuardService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
      imports: [RouterTestingModule]
    });
  });

  it('checks if a user is valid',

    // inject your guard service and Router
    async(inject([AuthGuard, Router], (auth, router) => {

        // add a spy
        spyOn(router, 'navigate');

        expect(auth.canActivate()).toBeFalsy();
        expect(router.navigate).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
      })
    ));
});
