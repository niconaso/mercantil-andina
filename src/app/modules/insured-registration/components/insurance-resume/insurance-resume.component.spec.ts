import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceResumeComponent } from './insurance-resume.component';

describe('InsuranceResumeComponent', () => {
  let component: InsuranceResumeComponent;
  let fixture: ComponentFixture<InsuranceResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
