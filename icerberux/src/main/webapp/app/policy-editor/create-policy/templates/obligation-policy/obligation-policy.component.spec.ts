import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObligationPolicyComponent } from './obligation-policy.component';

describe('ObligationPolicyComponent', () => {
  let component: ObligationPolicyComponent;
  let fixture: ComponentFixture<ObligationPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObligationPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObligationPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
