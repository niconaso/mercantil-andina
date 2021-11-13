import { VehicleInformation } from '.';
import { PersonalInformation } from './personal-information.interface';

export interface InsuredRegistration {
  /**
   * Personal User Information
   *
   * @type {PersonalInformation}
   * @memberof InsuredRegistration
   */
  personalInformation?: PersonalInformation;

  /**
   * Vehicle information to request for quotation
   *
   * @type {VehicleInformation}
   * @memberof InsuredRegistration
   */
  vehicleInformation?: VehicleInformation;
}
