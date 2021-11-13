import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'insured-registration',
    loadChildren: () =>
      import('./modules/insured-registration/insured-registration.module').then(
        (m) => m.InsuredRegistrationModule
      ),
  },
  {
    path: '',
    redirectTo: 'insured-registration',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
