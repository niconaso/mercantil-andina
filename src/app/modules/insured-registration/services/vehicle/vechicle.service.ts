import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  VehicleBrand,
  VehicleModel,
  VehicleVersion,
  VehicleYear,
} from '@modules/insured-registration/models';
import { yearsRangeFromToday } from '@utils';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VechicleService {
  /**
   * Creates an instance of VechicleService.
   * @param {HttpClient} http
   * @memberof VechicleService
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Get all available Brands
   *
   * @return {*}  {Observable<VehicleBrand[]>}
   * @memberof VechicleService
   */
  getAllBrands(): Observable<VehicleBrand[]> {
    const url: string = `${environment.mercantilAndina.api}/vehiculos/marcas`;

    return this.http.get<VehicleBrand[]>(url);
  }

  /**
   * Get all models of an specific brand and year
   *
   * @param {number} brandCode
   * @param {number} year
   * @return {*}  {Observable<VehicleModel[]>}
   * @memberof VechicleService
   */
  getModels(brandCode: number, year: number): Observable<VehicleModel[]> {
    const url: string = `${environment.mercantilAndina.api}/vehiculos/marcas/${brandCode}/${year}`;

    return this.http.get<VehicleModel[]>(url);
  }

  /**
   * Return the last 20 years from the current date
   *
   * @return {*}  {Observable<VehicleYear[]>}
   * @memberof VechicleService
   */
  getYears(): Observable<VehicleYear[]> {
    const years: VehicleYear[] = yearsRangeFromToday(20);

    return of(years);
  }

  /**
   * Return the version for the brand, year and model
   *
   * @return {*}  {Observable<VehicleVersion[]>}
   * @memberof VechicleService
   */
  getVersions(
    brandCode: number,
    year: number,
    model: number
  ): Observable<VehicleVersion[]> {
    const url: string = `${environment.mercantilAndina.api}/vehiculos/marcas/${brandCode}/${year}/${model}`;

    return this.http.get<VehicleVersion[]>(url);
  }
}
