import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  InsuranceCoverage,
  InsuredRegistration,
} from '@modules/insured-registration/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  /**
   * Creates an instance of InsuranceService.
   * @param {HttpClient} http
   * @memberof InsuranceService
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Returns the coverage based on collected data
   *
   * @param {InsuredRegistration} insuredRegistration in production
   *  I think this object should be used to determine the coverage based on the vehicle and user data
   * @return {*}  {Promise<InsuranceCoverage>}
   * @memberof InsuranceService
   */
  getCoverages(
    insuredRegistration: InsuredRegistration
  ): Promise<InsuranceCoverage[]> {
    const url: string = `${environment.mercantilAndina.apiMock}/coberturas`;

    return this.http.get<InsuranceCoverage[]>(url).toPromise();
  }

  /**
   * Register a new insured user with all the collected information
   *
   * @param {InsuredRegistration} insuredRegistration
   * @return {*}  {Promise<InsuredRegistration>}
   * @memberof InsuranceService
   */
  registerNewInsuredUser(
    insuredRegistration: InsuredRegistration
  ): Promise<InsuredRegistration> {
    // Simulate backend call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(insuredRegistration);
      });
    });
  }
}
