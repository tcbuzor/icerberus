import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolEditorComponent } from './pol-editor.component';

describe('PolEditorComponent', () => {
  let component: PolEditorComponent;
  let fixture: ComponentFixture<PolEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
