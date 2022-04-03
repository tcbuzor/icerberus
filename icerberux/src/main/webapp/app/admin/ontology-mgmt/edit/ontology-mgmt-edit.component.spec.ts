import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologyMgmtEditComponent } from './ontology-mgmt-edit.component';

describe('OntologyMgmtEditComponent', () => {
  let component: OntologyMgmtEditComponent;
  let fixture: ComponentFixture<OntologyMgmtEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OntologyMgmtEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologyMgmtEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
