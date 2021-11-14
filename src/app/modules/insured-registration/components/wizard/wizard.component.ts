import { Component } from '@angular/core';
import {
  InsuredRegistration,
  PersonalInformation,
  VehicleInformation,
} from '@modules/insured-registration/models';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent {
  /**
   * Current wizard step
   *
   * @type {number}
   * @memberof WizardComponent
   */
  currentStep: number = 0;

  /**
   * Collected data from the user and vehicle
   *
   * @private
   * @type {InsuredRegistration}
   * @memberof WizardComponent
   */
  private insuredRegistration!: InsuredRegistration;

  /**
   * Getter to retrieve only the vehicle information
   *
   * @readonly
   * @memberof WizardComponent
   */
  get vehicleInformation() {
    return this.insuredRegistration.vehicleInformation;
  }

  /**
   * Update the Registration Information with the Personal Information
   *
   * @param {PersonalInformation} personalInformation
   * @memberof WizardComponent
   */
  onPersonalDataLoaded(personalInformation: PersonalInformation) {
    this.insuredRegistration = {
      ...this.insuredRegistration,
      personalInformation,
    };

    this.currentStep++;
  }

  /**
   * Update the Registration Information with the VehicleInformation
   *
   * @param {VehicleInformation} vehicleInformation
   * @memberof WizardComponent
   */
  onVehicleDataLoaded(vehicleInformation: VehicleInformation) {
    this.insuredRegistration = {
      ...this.insuredRegistration,
      vehicleInformation,
    };

    this.currentStep++;
  }
}
