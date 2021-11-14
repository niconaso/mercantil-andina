import { InsuranceCoverage } from './insurance-coverage.interface';
import { PersonalInformation } from './personal-information.interface';
import { VehicleInformation } from './vehicle-information.interface';

export interface InsuredRegistration {
  /**
   * Personal User Information
   *
   * @type {PersonalInformation}
   * @memberof InsuredRegistration
   */
  personalInformation: PersonalInformation;

  /**
   * Vehicle information to request for quotation
   *
   * @type {VehicleInformation}
   * @memberof InsuredRegistration
   */
  vehicleInformation: VehicleInformation;

  /**
   * Coverage the user choosed
   *
   * @type {InsuranceCoverage}
   * @memberof InsuredRegistration
   */
  coverage: InsuranceCoverage;
}
