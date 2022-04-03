import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowAttribDlgComponent } from './how-attrib-dlg.component';

describe('HowAttribDlgComponent', () => {
  let component: HowAttribDlgComponent;
  let fixture: ComponentFixture<HowAttribDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowAttribDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowAttribDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
