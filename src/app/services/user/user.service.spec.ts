/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BackendData }  from '../in-memory-data.service';

describe('User Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, InMemoryWebApiModule.forRoot(BackendData)],
      providers: [UserService]
      });
  });
});
