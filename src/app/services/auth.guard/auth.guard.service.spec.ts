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
