import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { PasswordStrengthValue } from '@core/enums';
import { PasswordStrength } from '@core/models';
import { passwordStrength } from 'check-password-strength';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PasswordValidatorService {
  /**
   * This validator is Asnync in case (in the future)
   * the validation needs to be done using an external API
   *
   * @param {PasswordStrengthValue[]} [validStrenghs=[
   *       PasswordStrengthValue.MEDIUM,
   *       PasswordStrengthValue.STRONG,
   *     ]]
   * @return {*}  {AsyncValidatorFn}
   * @memberof PasswordValidatorService
   */
  passwordStrengthValidator(
    validStrenghs: PasswordStrengthValue[] = [
      PasswordStrengthValue.MEDIUM,
      PasswordStrengthValue.STRONG,
    ]
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkPasswordStrength(control.value).pipe(
        map((res) => {
          const isNotStrength = !validStrenghs.includes(res.value);

          return isNotStrength ? { isNotStrength: true, ...res } : null;
        })
      );
    };
  }

  /**
   * Check for password strenghness using a 3rd party library
   *
   * @private
   * @param {string} password
   * @return {*}  {Observable<PasswordStrength>}
   * @memberof PasswordService
   */
  private checkPasswordStrength(
    password: string
  ): Observable<PasswordStrength> {
    return of(passwordStrength(password));
  }
}
