import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  InsuranceCoverage,
  VehicleInformation,
} from '@modules/insured-registration/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InsuranceCoverageService {
  /**
   * Creates an instance of InsuranceCoverageService.
   * @param {HttpClient} http
   * @memberof InsuranceCoverageService
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Returns the coverage based on the vehicle information
   *
   * @param {VehicleInformation} vehicleInformation in production
   *  I think this object should be used to determine the coverage based on the vehicle data
   * @return {*}  {Promise<InsuranceCoverage>}
   * @memberof InsuranceCoverageService
   */
  loadCoverage(
    vehicleInformation: VehicleInformation
  ): Promise<InsuranceCoverage[]> {
    const url: string = `${environment.mercantilAndina.apiMock}/coberturas`;

    return this.http.get<InsuranceCoverage[]>(url).toPromise();
  }
}
