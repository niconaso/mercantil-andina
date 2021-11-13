import { VehicleInformation } from '.';
import { PersonalInformation } from './personal-information.interface';

export interface InsuredRegistration {
  personalInformation?: PersonalInformation;
  vehicleInfo?: VehicleInformation;
}
