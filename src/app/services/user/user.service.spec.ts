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
