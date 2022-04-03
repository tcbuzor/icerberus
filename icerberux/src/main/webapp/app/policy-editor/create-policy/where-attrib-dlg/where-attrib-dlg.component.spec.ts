import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhereAttribDlgComponent } from './where-attrib-dlg.component';

describe('WhereAttribDlgComponent', () => {
  let component: WhereAttribDlgComponent;
  let fixture: ComponentFixture<WhereAttribDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhereAttribDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhereAttribDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
