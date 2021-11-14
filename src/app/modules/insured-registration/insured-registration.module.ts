import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from '@shared/nz-zorro.module';
import { InsuranceCoverageComponent } from './components/insurance-coverage/insurance-coverage.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { VehicleDataComponent } from './components/vehicle-data/vehicle-data.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { InsuredRegistrationRoutingModule } from './insured-registration-routing.module';

const COMPONENTS: any[] = [
  WizardComponent,
  PersonalDataComponent,
  VehicleDataComponent,
  InsuranceCoverageComponent,
];

const MODULES: any[] = [
  CommonModule,
  InsuredRegistrationRoutingModule,
  ReactiveFormsModule,
  NgZorroModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
})
export class InsuredRegistrationModule {}
