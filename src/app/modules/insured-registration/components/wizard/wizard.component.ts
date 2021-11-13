import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneValidators } from 'ngx-phone-validators';
import { EmailValidators, UniversalValidators } from 'ngx-validators';
import { PersonalInformation, VehicleInformation } from '../../models';
import { InsuredRegistration } from '../../models/insured-registration.interface';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent implements OnInit {
  currentStep: number = 0;

  personalDataForm!: FormGroup;
  vehicleDataForm!: FormGroup;

  private insuredRegistration!: InsuredRegistration;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.setFormValidations();
  }

  setFormValidations() {
    this.setPersonalDataValidations();

    this.setVehicleDataValidations();
  }

  private setPersonalDataValidations() {
    this.personalDataForm = this.fb.group({
      idNumber: [
        null,
        [
          Validators.required,
          UniversalValidators.isNumber,
          Validators.minLength(7),
          Validators.maxLength(8),
        ],
      ],
      name: [
        null,
        [
          Validators.required,
          Validators.pattern('[A-Za-z]+'),
          Validators.minLength(2),
          Validators.maxLength(15),
          UniversalValidators.noEmptyString,
        ],
      ],
      lastName: [
        null,
        [
          Validators.required,
          Validators.pattern('[A-Za-z]+'),
          Validators.minLength(2),
          Validators.maxLength(15),
          UniversalValidators.noEmptyString,
        ],
      ],
      email: [null, [EmailValidators.simple]],
      cellphoneNumber: [null, [PhoneValidators.isPhoneNumber('AR')]],
      phoneNumber: [null, [PhoneValidators.isPhoneNumber('AR')]],
      username: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
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
  }

  submitPersonalData(form: FormGroup) {
    if (form.valid) {
      const personalInformation = form.value as PersonalInformation;

      this.insuredRegistration = {
        ...this.insuredRegistration,
        ...personalInformation,
      };

      console.log(this.insuredRegistration);

      this.currentStep++;
    } else {
      this.showFormErrors(form);
    }
  }

  private showFormErrors(form: FormGroup) {
    Object.values(form.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  submitVehicleData(form: FormGroup) {
    if (form.valid) {
      const vehicleInformation = form.value as VehicleInformation;

      this.insuredRegistration = {
        ...this.insuredRegistration,
        ...vehicleInformation,
      };

      console.log(this.insuredRegistration);
    } else {
      this.showFormErrors(form);
    }
  }
}
