import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyStepComponent } from './policy-step.component';

describe('PolicyStepComponent', () => {
  let component: PolicyStepComponent;
  let fixture: ComponentFixture<PolicyStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
