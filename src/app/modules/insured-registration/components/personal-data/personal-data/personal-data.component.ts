import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PasswordValidatorService,
  UsernameValidatorService,
} from '@core/validators';
import {
  City,
  PersonalInformation,
  Province,
} from '@modules/insured-registration/models';
import { GeoReferenceService } from '@modules/insured-registration/services';
import { legalAgeDate, oldAgeDate } from '@utils';
import { isWithinInterval } from 'date-fns';
import { PhoneValidators } from 'ngx-phone-validators';
import { EmailValidators, UniversalValidators } from 'ngx-validators';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
})
export class PersonalDataComponent implements OnInit, OnDestroy {
  @Output() personalData: EventEmitter<PersonalInformation> =
    new EventEmitter();

  /**
   * Personal information form
   *
   * @type {FormGroup}
   * @memberof PersonalDataComponent
   */
  personalDataForm!: FormGroup;

  /**
   * List of Argentina provinces
   *
   * @type {Observable<Province[]>}
   * @memberof PersonalDataComponent
   */
  provinces$!: Observable<Province[]>;

  /**
   * List of Cities
   *
   * @type {Observable<City[]>}
   * @memberof PersonalDataComponent
   */
  cities$!: Observable<City[]>;

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
   * @memberof PersonalDataComponent
   */
  private subscription: Subscription = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly geoRefService: GeoReferenceService,
    private readonly usernameValidatorService: UsernameValidatorService,
    private readonly passwordValidatorService: PasswordValidatorService
  ) {}

  /**
   * The birthdate must be between 18 and 99 years old
   *
   * @param {Date} current
   * @memberof PersonalDataComponent
   */
  disabledDate = (current: Date) => {
    // Can not select days before today and today
    return !isWithinInterval(current, {
      start: this.OLD_AGE_DATE,
      end: this.LEGAL_AGE_DATE,
    });
  };

  ngOnInit(): void {
    this.setFormValidations();
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Persist personal info and continue to the next step
   *
   * @param {FormGroup} form
   * @memberof PersonalDataComponent
   */
  submitPersonalData(form: FormGroup) {
    if (form.valid) {
      const personalInformation = form.value as PersonalInformation;

      this.personalData.emit(personalInformation);
    }
  }

  /**
   * Set the validations of the Personal info form
   *
   * @private
   * @memberof PersonalDataComponent
   */
  private setFormValidations() {
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
      password: [
        null,
        [Validators.required],
        [this.passwordValidatorService.passwordStrengthValidator()],
      ],
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
   * Load dynamic form data
   *
   * @private
   * @memberof PersonalDataComponent
   */
  private loadData() {
    this.provinces$ = this.geoRefService.getAllProvinces();
  }

  /**
   * Load the cities for the selected Province
   *
   * @private
   * @param {string} provinceId
   * @memberof PersonalDataComponent
   */
  private loadCities(provinceId: string): void {
    this.cities$ = of([]);
    this.personalDataForm.get('city')?.reset();

    if (provinceId) {
      this.cities$ = this.geoRefService.getAllCities(provinceId);
    }
  }
}
