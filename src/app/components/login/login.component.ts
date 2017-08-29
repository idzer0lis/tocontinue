/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { NotificationService } from '../../services/notification/notification.service';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import * as Auth from '../../actions/auth';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService, NotificationService]
})
export class LoginComponent implements OnInit {
  showForm = true;
  loginForm: FormGroup;
  error$ = this.store.select(fromAuth.getLoginPageError);

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notification: NotificationService,
    private store: Store<fromAuth.State>
  ) {}
  ngOnInit(): void {
    this.buildForm();
    // reset login status
    this.userService.logout();
  }
  buildForm(): void {
    this.loginForm = this.fb.group({
      'username': ['', [
        Validators.required
      ]],
      'password': ['', [
        Validators.required
      ]]
    });
  }
  doLogin() {
    if (!this.loginForm) { return; }
    // return this.userService.checkSession();
    this.store.dispatch(new Auth.Login(this.loginForm.value));
    this.error$.subscribe(err => {
      this.notification.error(err);
    });
  }
}
