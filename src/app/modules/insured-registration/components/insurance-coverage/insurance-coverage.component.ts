import { Component, Input, OnInit } from '@angular/core';
import {
  InsuranceCoverage,
  InsuredRegistration,
  VehicleInformation,
} from '@modules/insured-registration/models';
import { InsuranceCoverageService } from '@modules/insured-registration/services';

@Component({
  selector: 'app-insurance-coverage',
  templateUrl: './insurance-coverage.component.html',
  styleUrls: ['./insurance-coverage.component.scss'],
})
export class InsuranceCoverageComponent implements OnInit {
  /**
   * Vehicle information to calculate to coverage
   *
   * @type {InsuredRegistration}
   * @memberof InsuranceCoverageComponent
   */
  @Input() insuredRegistration!: InsuredRegistration;

  coverage: InsuranceCoverage[] = [];

  /**
   * Creates an instance of InsuranceCoverageComponent.
   * @param {InsuranceCoverageService} insuranceCoverageService
   * @memberof InsuranceCoverageComponent
   */
  constructor(
    private readonly insuranceCoverageService: InsuranceCoverageService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Track ngFor to improve performance
   *
   * @param {number} _
   * @param {InsuranceCoverage} coverage
   * @return {*}
   * @memberof InsuranceCoverageComponent
   */
  trackById(_: number, coverage: InsuranceCoverage) {
    return coverage.numero;
  }

  private async loadData() {
    this.coverage = await this.insuranceCoverageService.loadCoverage(
      this.insuredRegistration
    );
  }
}
