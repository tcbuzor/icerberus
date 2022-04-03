import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoAttribDlgComponent } from './who-attrib-dlg.component';

describe('WhoAttribDlgComponent', () => {
  let component: WhoAttribDlgComponent;
  let fixture: ComponentFixture<WhoAttribDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoAttribDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoAttribDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
