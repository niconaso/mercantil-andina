import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * Creates an instance of UserService.
   * @param {HttpClient} http
   * @memberof UserService
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Check if the username exists in the system
   *
   * @param {string} username
   * @return {*}  {Observable<boolean>}
   * @memberof UserService
   */
  userNameExists(username: string): Observable<boolean> {
    const url: string = `${environment.mercantilAndina.apiMock}/usuarios`;
    const params: HttpParams = new HttpParams().append('nombre', username);
    return this.http.get<boolean>(url, {
      params,
    });
  }
}
