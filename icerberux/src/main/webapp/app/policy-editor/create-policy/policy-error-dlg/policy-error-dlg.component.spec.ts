import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyErrorDlgComponent } from './policy-error-dlg.component';

describe('PolicyErrorDlgComponent', () => {
  let component: PolicyErrorDlgComponent;
  let fixture: ComponentFixture<PolicyErrorDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyErrorDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyErrorDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
