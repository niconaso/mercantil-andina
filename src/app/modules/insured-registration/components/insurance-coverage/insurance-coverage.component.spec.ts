import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCoverageComponent } from './insurance-coverage.component';

describe('InsuranceCoverageComponent', () => {
  let component: InsuranceCoverageComponent;
  let fixture: ComponentFixture<InsuranceCoverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceCoverageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
