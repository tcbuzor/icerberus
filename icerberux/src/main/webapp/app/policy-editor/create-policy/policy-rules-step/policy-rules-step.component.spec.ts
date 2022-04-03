import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyRulesStepComponent } from './policy-rules-step.component';

describe('PolicyRulesStepComponent', () => {
  let component: PolicyRulesStepComponent;
  let fixture: ComponentFixture<PolicyRulesStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyRulesStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyRulesStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
