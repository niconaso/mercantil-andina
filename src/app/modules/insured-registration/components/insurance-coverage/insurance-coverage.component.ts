import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  InsuranceCoverage,
  InsuredRegistration,
} from '@modules/insured-registration/models';
import { InsuranceService } from '@modules/insured-registration/services';

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

  @Output() selectedCoverage: EventEmitter<InsuranceCoverage> =
    new EventEmitter();

  coverage: InsuranceCoverage[] = [];

  /**
   * Creates an instance of InsuranceCoverageComponent.
   * @param {insuranceService} InsuranceService
   * @memberof InsuranceCoverageComponent
   */
  constructor(
    private readonly insuranceService: InsuranceService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Emit the selected coverage
   *
   * @param {InsuranceCoverage} coverage
   * @memberof InsuranceCoverageComponent
   */
  selectCoverage(coverage: InsuranceCoverage) {
    this.selectedCoverage.emit(coverage);
  }

  /**
   * Track ngFor to improve performance
   *
   * @param {number} _
   * @param {InsuranceCoverage} coverage
   * @return {number}
   * @memberof InsuranceCoverageComponent
   */
  trackById(_: number, coverage: InsuranceCoverage): number {
    return coverage.numero;
  }

  private async loadData() {
    this.coverage = await this.insuranceService.getCoverages(
      this.insuredRegistration
    );
  }
}
