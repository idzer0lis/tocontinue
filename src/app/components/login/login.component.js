var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { validationMessages } from './validation.errors';
var LoginComponent = (function () {
    function LoginComponent(fb, userService) {
        this.fb = fb;
        this.userService = userService;
        this.showForm = true;
        this.formErrors = {
            'name': '',
            'password': ''
        };
        this.validationMessages = validationMessages();
    }
    LoginComponent.prototype.ngOnInit = function () {
        console.log(validationMessages);
        this.buildForm();
    };
    LoginComponent.prototype.buildForm = function () {
        this.loginForm = this.fb.group({
            'name': ['', [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(24)
                ]],
            'password': ['', [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(24) // you can add your own custom validation
                ]]
        });
    };
    LoginComponent.prototype.checkLoginForm = function (formData) {
        var formValidated = true;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = formData.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                    formValidated = false;
                }
            }
        }
        return formValidated;
    };
    LoginComponent.prototype.doLogin = function () {
        if (!this.loginForm) {
            return;
        }
        var formData = this.loginForm;
        if (this.checkLoginForm(formData)) {
            this.showForm = false;
        }
        this.userService.getUser()
            .then(function (user) {
            console.log(user);
            if (formData.value.email === user[0].name && formData.value.password === user[0].password) {
                // console.log('LOGGED IN');
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Component({
        selector: 'my-login',
        templateUrl: './login.component.html',
        providers: [ApiService]
    }),
    __metadata("design:paramtypes", [FormBuilder, ApiService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map