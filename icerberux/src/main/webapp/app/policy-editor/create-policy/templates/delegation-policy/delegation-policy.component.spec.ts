import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegationPolicyComponent } from './delegation-policy.component';

describe('DelegationPolicyComponent', () => {
  let component: DelegationPolicyComponent;
  let fixture: ComponentFixture<DelegationPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegationPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegationPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
