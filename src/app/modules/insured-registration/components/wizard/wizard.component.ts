import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  differenceInCalendarDays,
  differenceInYears,
  isWithinInterval,
} from 'date-fns';
import { PhoneValidators } from 'ngx-phone-validators';
import { EmailValidators, UniversalValidators } from 'ngx-validators';
import { Observable, of, Subscription } from 'rxjs';
import { legalAgeDate, oldAgeDate } from 'src/app/utils/age-date.util';
import {
  PersonalInformation,
  VehicleBrand,
  VehicleInformation,
  VehicleModel,
  VehicleYear,
} from '../../models';
import { InsuredRegistration } from '../../models/insured-registration.interface';
import { VechicleService } from '../../services';
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

  personalDataForm!: FormGroup;
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

  private readonly NAME_MINLENGTH: number = 2;
  private readonly NAME_MAXLENGTH: number = 15;
  private readonly ID_NUMBER_MINLENGTH = 7;
  private readonly ID_NUMBER_MAXLENGTH = 8;
  private readonly USERNAME_MINLENGTH = 3;
  private readonly USERNAME_MAXLENGTH = 30;

  private readonly OLD_AGE_DATE: Date = oldAgeDate();
  private readonly LEGAL_AGE_DATE: Date = legalAgeDate();

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
    private usernameValidatorService: UsernameValidatorService,
    private vehicleService: VechicleService
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
    const brandCode: number = this.vehicleDataForm.get('brand')?.value;
    const year: number = this.vehicleDataForm.get('year')?.value;

    if (brandCode && year) {
      this.vechicleModels$ = this.vehicleService.getModels(brandCode, year);
    } else {
      // If brandCode or Year is null then reset the selected model
      this.vechicleModels$ = of([]);
      this.vehicleDataForm.get('model')?.reset();
    }
  }

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
      birthDate: [this.LEGAL_AGE_DATE, []],
      email: [null, [EmailValidators.simple]],
      cellphoneNumber: [null, [PhoneValidators.isPhoneNumber('AR')]],
      phoneNumber: [null, [PhoneValidators.isPhoneNumber('AR')]],
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
  }

  private setVehicleDataValidations() {
    this.vehicleDataForm = this.fb.group({
      brand: [null, [Validators.required]],
      year: [null, [Validators.required]],
      model: [null, [Validators.required]],
      version: [null],
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
