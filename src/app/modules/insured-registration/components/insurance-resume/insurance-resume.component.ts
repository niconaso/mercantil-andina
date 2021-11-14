import { Component, Input } from '@angular/core';
import { InsuredRegistration } from '@modules/insured-registration/models';

@Component({
  selector: 'app-insurance-resume',
  templateUrl: './insurance-resume.component.html',
  styleUrls: ['./insurance-resume.component.scss'],
})
export class InsuranceResumeComponent {
  /**
   * Collected data
   *
   * @type {InsuredRegistration}
   * @memberof InsuranceResumeComponent
   */
  @Input() insuredRegistration!: InsuredRegistration;
}
