import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcaPolicyComponent } from './eca-policy.component';

describe('EcaPolicyComponent', () => {
  let component: EcaPolicyComponent;
  let fixture: ComponentFixture<EcaPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcaPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcaPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
