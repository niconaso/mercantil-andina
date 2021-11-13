import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  VehicleBrand,
  VehicleModel,
  VehicleYear,
  VehicleVersion,
  VehicleInformation,
} from '@modules/insured-registration/models';
import { VechicleService } from '@modules/insured-registration/services';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle-data',
  templateUrl: './vehicle-data.component.html',
  styleUrls: ['./vehicle-data.component.scss'],
})
export class VehicleDataComponent implements OnInit, OnDestroy {
  @Output() vehicleData: EventEmitter<VehicleInformation> = new EventEmitter();

  /**
   * Vehicle information form
   *
   * @type {FormGroup}
   * @memberof VehicleDataComponent
   */
  vehicleDataForm!: FormGroup;

  /**
   * Brand list to select
   *
   * @type {Observable<VehicleBrand[]>}
   * @memberof VehicleDataComponent
   */
  vechicleBrands$!: Observable<VehicleBrand[]>;

  /**
   * Model list based on the selected brand and year
   *
   * @type {Observable<VehicleModel[]>}
   * @memberof VehicleDataComponent
   */
  vechicleModels$!: Observable<VehicleModel[]>;

  /**
   * List of available years
   *
   * @type {Observable<VehicleYear[]>}
   * @memberof VehicleDataComponent
   */
  vehicleYears$!: Observable<VehicleYear[]>;

  /**
   * List of version based on the brand, year and model
   *
   * @type {Observable<VehicleVersion[]>}
   * @memberof VehicleDataComponent
   */
  vehicleVersions$!: Observable<VehicleVersion[]>;

  /**
   * Unsubscribe from all observables
   *
   * @private
   * @type {Subscription}
   * @memberof VehicleDataComponent
   */
  private subscription: Subscription = new Subscription();

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

  /**
   * Persist vehicle info and continue to the next step
   *
   * @param {FormGroup} form
   * @memberof VehicleDataComponent
   */
  submitVehicleData(form: FormGroup) {
    if (form.valid) {
      const vehicleInformation = form.value as VehicleInformation;

      this.vehicleData.emit(vehicleInformation);
    }
  }

  /**
   * Load dynamic data
   *
   * @private
   * @memberof VehicleDataComponent
   */
  private loadData() {
    this.vechicleBrands$ = this.vehicleService.getAllBrands();
    this.vehicleYears$ = this.vehicleService.getYears();
  }

  /**
   * Load vehicle models based on the selected brand and year
   *
   * @private
   * @memberof VehicleDataComponent
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
   * @memberof VehicleDataComponent
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
   * @memberof VehicleDataComponent
   */
  private setFormValidations() {
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
