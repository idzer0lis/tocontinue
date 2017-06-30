// This shows a different way of testing a component, check about for a simpler one
import { Component } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { MaterialModule } from '@angular/material';
import { HomeComponent } from './home.component';
import { LoginComponent } from '../login/login.component';
import { ValidationComponent } from '../validation/validation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BackendData }  from '../../services/in-memory-data.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { NavbarMenuComponent } from '../navbar-menu/navbar-menu.component';
import { NotificationComponent } from '../notification/notification.component';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../services/user/user.service';
import { ListComponent } from '../list/list.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SearchComponent } from '../search/search.component';

describe('Home Component', () => {
  const html = '<my-home></my-home>';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, HttpModule, MaterialModule,
        InMemoryWebApiModule.forRoot(BackendData)],
      declarations: [HomeComponent, LoginComponent, TestComponent, ValidationComponent, SearchComponent,
        NavbarComponent, NavbarMenuComponent, NotificationComponent, ListComponent, SidenavComponent],
      providers: [UserService, provideRoutes([])]
    });
    TestBed.overrideComponent(TestComponent, { set: { template: html }});
  });

  it('should contain an Welcome String', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('Welcome!');
  });

});

@Component({selector: 'my-test', template: ''})
class TestComponent { }
