import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhenAttribDlgComponent } from './when-attrib-dlg.component';

describe('WhenAttribDlgComponent', () => {
  let component: WhenAttribDlgComponent;
  let fixture: ComponentFixture<WhenAttribDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhenAttribDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhenAttribDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
