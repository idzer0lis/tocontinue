/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Required',
      'invalidUsername': 'Invalid username',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`,
      'invalidNumber': 'Only numbers are allowed',
      'min': 'Negative numbers are not allowed'
    };

    return config[validatorName];
  }

  static isInteger(control) {
    // convert string to number
    let number: number = Math.floor(control.value);

    let integer: boolean = Number.isInteger(number);
    let valid: boolean = integer && number > 0;
    if (!valid) {
      return { 'invalidNumber': true };
    }
    return null;
  }
  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }
}
