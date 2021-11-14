import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationSuccessComponent } from './components/registration-success/registration-success.component';
import { WizardComponent } from './components/wizard/wizard.component';

const routes: Routes = [
  {
    path: '',
    component: WizardComponent,
  },
  {
    path: 'registration-success',
    component: RegistrationSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsuredRegistrationRoutingModule {}
