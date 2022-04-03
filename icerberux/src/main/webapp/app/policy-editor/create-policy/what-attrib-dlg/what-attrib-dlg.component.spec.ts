import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatAttribDlgComponent } from './what-attrib-dlg.component';

describe('WhatAttribDlgComponent', () => {
  let component: WhatAttribDlgComponent;
  let fixture: ComponentFixture<WhatAttribDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatAttribDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatAttribDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
