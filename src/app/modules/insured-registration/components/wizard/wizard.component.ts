import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  InsuredRegistration,
  PersonalInformation,
  VehicleBrand,
  VehicleInformation,
  VehicleModel,
  VehicleVersion,
  VehicleYear,
} from '@modules/insured-registration/models';
import { VechicleService } from '@modules/insured-registration/services';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent implements OnInit, OnDestroy {
  today = new Date();

  /**
   * Current wizard step
   *
   * @type {number}
   * @memberof WizardComponent
   */
  currentStep: number = 0;

  /**
   * Vehicle information form
   *
   * @type {FormGroup}
   * @memberof WizardComponent
   */
  vehicleDataForm!: FormGroup;

  /**
   * Brand list to select
   *
   * @type {Observable<VehicleBrand[]>}
   * @memberof WizardComponent
   */
  vechicleBrands$!: Observable<VehicleBrand[]>;

  /**
   * Model list based on the selected brand and year
   *
   * @type {Observable<VehicleModel[]>}
   * @memberof WizardComponent
   */
  vechicleModels$!: Observable<VehicleModel[]>;

  /**
   * List of available years
   *
   * @type {Observable<VehicleYear[]>}
   * @memberof WizardComponent
   */
  vehicleYears$!: Observable<VehicleYear[]>;

  /**
   * List of version based on the brand, year and model
   *
   * @type {Observable<VehicleVersion[]>}
   * @memberof WizardComponent
   */
  vehicleVersions$!: Observable<VehicleVersion[]>;

  /**
   * Unsubscribe from all observables
   *
   * @private
   * @type {Subscription}
   * @memberof WizardComponent
   */
  private subscription: Subscription = new Subscription();

  /**
   * Collected data from the user and vehicle
   *
   * @private
   * @type {InsuredRegistration}
   * @memberof WizardComponent
   */
  private insuredRegistration!: InsuredRegistration;

  /**
   * Creates an instance of WizardComponent.
   * @param {FormBuilder} fb
   * @param {VechicleService} vehicleService
   * @memberof WizardComponent
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly vehicleService: VechicleService
  ) {}

  ngOnInit(): void {
    this.setFormValidations();

    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onPersonalDataLoaded(personalInformation: PersonalInformation) {
    this.insuredRegistration = {
      ...this.insuredRegistration,
      personalInformation,
    };

    this.currentStep++;
  }

  /**
   * Persist vehicle info and continue to the next step
   *
   * @param {FormGroup} form
   * @memberof WizardComponent
   */
  submitVehicleData(form: FormGroup) {
    if (form.valid) {
      const vehicleInformation = form.value as VehicleInformation;

      this.insuredRegistration = {
        ...this.insuredRegistration,
        vehicleInformation,
      };

      console.log(this.insuredRegistration);
    } else {
      this.showFormErrors(form);
    }
  }

  /**
   * Set the validations of each form
   *
   * @private
   * @memberof WizardComponent
   */
  private setFormValidations() {
    this.setVehicleDataValidations();
  }

  /**
   * Load dynamic data
   *
   * @private
   * @memberof WizardComponent
   */
  private loadData() {
    this.vechicleBrands$ = this.vehicleService.getAllBrands();
    this.vehicleYears$ = this.vehicleService.getYears();
  }

  /**
   * Load vehicle models based on the selected brand and year
   *
   * @private
   * @memberof WizardComponent
   */
  private loadModels() {
    this.vechicleModels$ = of([]);
    this.vehicleDataForm.get('model')?.reset();

    const brandCode: number = this.vehicleDataForm.get('brand')?.value;
    const year: number = this.vehicleDataForm.get('year')?.value;

    if (brandCode && year) {
      this.vechicleModels$ = this.vehicleService.getModels(brandCode, year);
    }
  }

  /**
   * Load the version base on th brand, year and model selected
   *
   * @private
   * @memberof WizardComponent
   */
  private loadVersions(modelId: number): void {
    this.vehicleVersions$ = of([]);
    this.vehicleDataForm.get('version')?.reset();

    const brandCode: number = this.vehicleDataForm.get('brand')?.value;
    const year: number = this.vehicleDataForm.get('year')?.value;

    if (brandCode && year && modelId) {
      this.vehicleVersions$ = this.vehicleService.getVersions(
        brandCode,
        year,
        modelId
      );
    }
  }

  /**
   * Set the validations of the Vehicle form
   *
   * @private
   * @memberof WizardComponent
   */
  private setVehicleDataValidations() {
    this.vehicleDataForm = this.fb.group({
      brand: [null, [Validators.required]],
      year: [null, [Validators.required]],
      model: [null, [Validators.required]],
      version: [null, [Validators.required]],
    });

    this.subscription.add(
      this.vehicleDataForm
        .get('brand')
        ?.valueChanges.subscribe(() => this.loadModels())
    );
    this.subscription.add(
      this.vehicleDataForm
        .get('year')
        ?.valueChanges.subscribe(() => this.loadModels())
    );

    this.subscription.add(
      this.vehicleDataForm
        .get('model')
        ?.valueChanges.subscribe((modelId: number) =>
          this.loadVersions(modelId)
        )
    );
  }

  private showFormErrors(form: FormGroup) {
    Object.values(form.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
}
