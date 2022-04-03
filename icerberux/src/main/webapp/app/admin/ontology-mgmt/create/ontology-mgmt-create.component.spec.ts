import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologyMgmtCreateComponent } from './ontology-mgmt-create.component';

describe('OntologyMgmtCreateComponent', () => {
  let component: OntologyMgmtCreateComponent;
  let fixture: ComponentFixture<OntologyMgmtCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OntologyMgmtCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologyMgmtCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
