import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from '@shared/nz-zorro.module';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { InsuredRegistrationRoutingModule } from './insured-registration-routing.module';
import { VehicleDataComponent } from './components/vehicle-data/vehicle-data.component';

const COMPONENTS: any[] = [WizardComponent, PersonalDataComponent];
const MODULES: any[] = [
  CommonModule,
  InsuredRegistrationRoutingModule,
  ReactiveFormsModule,
  NgZorroModule,
];

@NgModule({
  declarations: [...COMPONENTS, VehicleDataComponent],
  imports: [...MODULES],
})
export class InsuredRegistrationModule {}
