import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/shared/nz-zorro.module';
import { WizardComponent } from './components/wizard/wizard.component';
import { InsuredRegistrationRoutingModule } from './insured-registration-routing.module';

const COMPONENTS: any[] = [WizardComponent];
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
