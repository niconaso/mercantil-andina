import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { InsuranceCoverageComponent } from './components/insurance-coverage/insurance-coverage.component';
import { InsuranceResumeComponent } from './components/insurance-resume/insurance-resume.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { VehicleDataComponent } from './components/vehicle-data/vehicle-data.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { InsuredRegistrationRoutingModule } from './insured-registration-routing.module';

const COMPONENTS: any[] = [
  WizardComponent,
  PersonalDataComponent,
  VehicleDataComponent,
  InsuranceCoverageComponent,
  InsuranceResumeComponent,
];

const MODULES: any[] = [InsuredRegistrationRoutingModule, SharedModule];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
})
export class InsuredRegistrationModule {}
