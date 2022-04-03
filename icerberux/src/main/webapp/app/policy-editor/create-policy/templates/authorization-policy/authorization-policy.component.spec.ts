import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationPolicyComponent } from './authorization-policy.component';

describe('AuthorizationPolicyComponent', () => {
  let component: AuthorizationPolicyComponent;
  let fixture: ComponentFixture<AuthorizationPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
