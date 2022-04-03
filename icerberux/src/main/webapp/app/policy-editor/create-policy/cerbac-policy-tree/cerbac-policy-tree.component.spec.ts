import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerbacPolicyTreeComponent } from './cerbac-policy-tree.component';

describe('CerbacPolicyTreeComponent', () => {
  let component: CerbacPolicyTreeComponent;
  let fixture: ComponentFixture<CerbacPolicyTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CerbacPolicyTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CerbacPolicyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
