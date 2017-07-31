import { TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UserService } from './services/user/user.service';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BackendData }  from './services/in-memory-data.service';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpModule, InMemoryWebApiModule.forRoot(BackendData)],
      declarations: [AppComponent],
      providers: [UserService, provideRoutes([])]
    });
  });
});
