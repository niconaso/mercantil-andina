import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  InsuranceCoverage,
  InsuredRegistration,
  PersonalInformation,
  VehicleInformation,
} from '@modules/insured-registration/models';
import { InsuranceService } from '@modules/insured-registration/services';

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
   * @type {InsuredRegistration}
   * @memberof WizardComponent
   */
  insuredRegistration!: InsuredRegistration;

  /**
   * Creates an instance of WizardComponent.
   * @param {InsuranceService} insuranceService
   * @param {ActivatedRoute} activatedRoute
   * @param {Router} router
   * @memberof WizardComponent
   */
  constructor(
    private readonly insuranceService: InsuranceService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}
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

  onSelectecCoverage(coverage: InsuranceCoverage) {
    this.insuredRegistration = {
      ...this.insuredRegistration,
      coverage,
    };
    this.currentStep++;
  }

  /**
   *
   *
   * @memberof WizardComponent
   */
  async registerNewUser() {
    try {
      await this.insuranceService.registerNewInsuredUser(
        this.insuredRegistration
      );
      this.router.navigate(['registration-success'], {
        relativeTo: this.activatedRoute,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
