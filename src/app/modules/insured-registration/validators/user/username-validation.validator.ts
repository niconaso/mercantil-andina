import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class UsernameValidatorService {
  /**
   * Creates an instance of UsernameValidatorService.
   * @param {UserService} userService
   * @memberof UsernameValidatorService
   */
  constructor(private readonly userService: UserService) {}

  /**
   * Async validator to check if the username exists
   *
   * @return {*}  {AsyncValidatorFn}
   * @memberof UsernameValidatorService
   */
  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfUsernameExists(control.value).pipe(
        map((res) => {
          // if res is true, username exists, return true
          return res ? { usernameExists: true } : null;
          // NB: Return null if there is no error
        })
      );
    };
  }

  /**
   * Call user service to check if the username exists
   *
   * @private
   * @param {string} username
   * @return {*}  {Observable<boolean>}
   * @memberof UsernameValidatorService
   */
  private checkIfUsernameExists(username: string): Observable<boolean> {
    return this.userService.userNameExists(username);
  }
}
