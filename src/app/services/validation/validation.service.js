"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationService {
    static getValidatorErrorMessage(validatorName, validatorValue) {
        let config = {
            'required': 'Required',
            'invalidUsername': 'Invalid username',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`
        };
        return config[validatorName];
    }
    /*static usernameValidator(control) {
      if (control.value...) {
        return null;
      } else {
        return { 'invalidEmailAddress': true };
      }
    }*/
    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        }
        else {
            return { 'invalidPassword': true };
        }
    }
}
exports.ValidationService = ValidationService;
//# sourceMappingURL=validation.service.js.map