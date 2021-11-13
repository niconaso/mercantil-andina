import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isWithinInterval } from 'date-fns';
import { PhoneValidators } from 'ngx-phone-validators';
import { EmailValidators, UniversalValidators } from 'ngx-validators';
import { Observable, of, Subscription } from 'rxjs';
import { legalAgeDate, oldAgeDate } from 'src/app/utils';
import {
  City,
  InsuredRegistration,
  PersonalInformation,
  Province,
  VehicleBrand,
  VehicleInformation,
  VehicleModel,
  VehicleVersion,
  VehicleYear,
} from '../../models';
import { GeoReferenceService, VechicleService } from '../../services';
import { UsernameValidatorService } from '../../validators';

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
   * Personal information form
   *
   * @type {FormGroup}
   * @memberof WizardComponent
   */
  personalDataForm!: FormGroup;

  /**
   * Vehicle information form
   *
   * @type {FormGroup}
   * @memberof WizardComponent
   */
  vehicleDataForm!: FormGroup;

  /**
   * List of Argentina provinces
   *
   * @type {Observable<Province[]>}
   * @memberof WizardComponent
   */
  provinces$!: Observable<Province[]>;

  /**
   * List of Cities
   *
   * @type {Observable<City[]>}
   * @memberof WizardComponent
   */
  cities$!: Observable<City[]>;

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

  private readonly NAME_MINLENGTH: number = 2;
  private readonly NAME_MAXLENGTH: number = 15;
  private readonly ID_NUMBER_MINLENGTH = 7;
  private readonly ID_NUMBER_MAXLENGTH = 8;
  private readonly USERNAME_MINLENGTH = 3;
  private readonly USERNAME_MAXLENGTH = 30;

  private readonly OLD_AGE_DATE: Date = oldAgeDate();
  private readonly LEGAL_AGE_DATE: Date = legalAgeDate();

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
   * @memberof WizardComponent
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly usernameValidatorService: UsernameValidatorService,
    private readonly geoRefService: GeoReferenceService,
    private readonly vehicleService: VechicleService
  ) {}

  ngOnInit(): void {
    this.setFormValidations();

    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * The birthdate must be between 18 and 99 years old
   *
   * @param {Date} current
   * @memberof WizardComponent
   */
  disabledDate = (current: Date) => {
    // Can not select days before today and today
    return !isWithinInterval(current, {
      start: this.OLD_AGE_DATE,
      end: this.LEGAL_AGE_DATE,
    });
  };

  /**
   * Persist personal info and continue to the next step
   *
   * @param {FormGroup} form
   * @memberof WizardComponent
   */
  submitPersonalData(form: FormGroup) {
    if (form.valid) {
      const personalInformation = form.value as PersonalInformation;

      this.insuredRegistration = {
        ...this.insuredRegistration,
        personalInformation,
      };

      console.log(this.insuredRegistration);

      this.currentStep++;
    } else {
      this.showFormErrors(form);
    }
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
    this.setPersonalDataValidations();
    this.setVehicleDataValidations();
  }

  /**
   * Load dynamic data
   *
   * @private
   * @memberof WizardComponent
   */
  private loadData() {
    this.provinces$ = this.geoRefService.getAllProvinces();
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
   * Set the validations of the Personal info form
   *
   * @private
   * @memberof WizardComponent
   */
  private setPersonalDataValidations() {
    this.personalDataForm = this.fb.group({
      idNumber: [
        null,
        [
          Validators.required,
          UniversalValidators.isNumber,
          Validators.minLength(this.ID_NUMBER_MINLENGTH),
          Validators.maxLength(this.ID_NUMBER_MAXLENGTH),
        ],
      ],
      name: [
        null,
        [
          Validators.required,
          Validators.pattern('[A-Za-z]+'),
          Validators.minLength(this.NAME_MINLENGTH),
          Validators.maxLength(this.NAME_MAXLENGTH),
          UniversalValidators.noEmptyString,
        ],
      ],
      lastName: [
        null,
        [
          Validators.required,
          Validators.pattern('[A-Za-z]+'),
          Validators.minLength(this.NAME_MINLENGTH),
          Validators.maxLength(this.NAME_MAXLENGTH),
          UniversalValidators.noEmptyString,
        ],
      ],
      birthDate: [this.LEGAL_AGE_DATE],
      email: [null, [EmailValidators.simple]],
      cellphoneNumber: [null, [PhoneValidators.isPhoneNumber('AR')]],
      phoneNumber: [null, [PhoneValidators.isPhoneNumber('AR')]],
      province: [null, [Validators.required]],
      city: [null, [Validators.required]],
      address: [null, [Validators.required, UniversalValidators.noEmptyString]],
      username: [
        null,
        [
          Validators.required,
          Validators.minLength(this.USERNAME_MINLENGTH),
          Validators.maxLength(this.USERNAME_MAXLENGTH),
        ],
        [this.usernameValidatorService.usernameValidator()],
      ],
      password: [null, [Validators.required]],
    });

    this.subscription.add(
      this.personalDataForm
        .get('province')
        ?.valueChanges.subscribe((provinceId: string) =>
          this.loadCities(provinceId)
        )
    );
  }

  /**
   * Load the cities for the selected Province
   *
   * @private
   * @param {string} provinceId
   * @memberof WizardComponent
   */
  private loadCities(provinceId: string): void {
    this.cities$ = of([]);
    this.personalDataForm.get('city')?.reset();

    if (provinceId) {
      this.cities$ = this.geoRefService.getAllCities(provinceId);
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
