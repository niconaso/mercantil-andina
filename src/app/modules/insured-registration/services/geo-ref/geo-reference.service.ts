import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City, Province } from '@modules/insured-registration/models';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeoReferenceService {
  /**
   * Creates an instance of GeoReferenceService.
   * @param {HttpClient} http
   * @memberof GeoReferenceService
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Returns all the Provinces of Argentina
   *
   * @return {*}  {Observable<Province[]>}
   * @memberof GeoReferenceService
   */
  getAllProvinces(): Observable<Province[]> {
    const url: string = `${environment.gobAr.geoRefApi}/provincias`;
    const params: HttpParams = new HttpParams().append('campos', 'id,nombre');

    return this.http.get<Province[]>(url, { params }).pipe(pluck('provincias'));
  }

  /**
   * Get all Cities of a specific Province
   *
   * @param {Province} province
   * @return {*}  {Observable<City[]>}
   * @memberof GeoReferenceService
   */
  getAllCities(province: Province): Observable<City[]> {
    const url: string = `${environment.gobAr.geoRefApi}/municipios`;
    let params: HttpParams = new HttpParams()
      .append('provincia', province.id)
      .append('campos', 'id,nombre');

    return this.http.get<Province[]>(url, { params }).pipe(pluck('municipios'));
  }
}
