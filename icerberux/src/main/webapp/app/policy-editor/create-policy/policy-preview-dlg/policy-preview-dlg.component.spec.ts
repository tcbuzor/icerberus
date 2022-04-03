import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPreviewDlgComponent } from './policy-preview-dlg.component';

describe('PolicyPreviewDlgComponent', () => {
  let component: PolicyPreviewDlgComponent;
  let fixture: ComponentFixture<PolicyPreviewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyPreviewDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPreviewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
