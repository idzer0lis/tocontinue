import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService, NotificationService]
})
export class LoginComponent implements OnInit {
  showForm = true;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notification: NotificationService
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
    const formData = this.loginForm;
    this.userService.login(formData.value.username, formData.value.password)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['']);
        },
        error => {
          console.log(error);
          return this.notification.error(error);
        });
  }
}
