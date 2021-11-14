import { Component, Input, OnInit } from '@angular/core';
import {
  InsuranceCoverage,
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
   * @type {VehicleInformation}
   * @memberof InsuranceCoverageComponent
   */
  @Input() vehicleInformation!: VehicleInformation;

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

  private async loadData() {
    this.coverage = await this.insuranceCoverageService.loadCoverage(
      this.vehicleInformation
    );
  }
}
