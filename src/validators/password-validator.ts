import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value || '';

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*().?":{}|<>]/.test(value);
    const hasMinLength = value.length >= 8;
    const hasNumbers = /[0-9]/.test(value);

    const passwordValid =
      hasUpperCase &&
      hasLowerCase &&
      hasSpecialCharacter &&
      hasMinLength &&
      hasNumbers;

    return !passwordValid ? { passwordStrength: true } : null;
  };
}
