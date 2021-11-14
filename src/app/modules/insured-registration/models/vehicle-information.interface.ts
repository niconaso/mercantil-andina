import { VehicleBrand, VehicleModel, VehicleVersion } from '.';

export interface VehicleInformation {
  /**
   * Brand code of the vehicle
   *
   * @type {number}
   * @memberof VehicleInformation
   */
  brand: VehicleBrand;

  year: number;

  model: VehicleModel;

  version?: VehicleVersion;
}
