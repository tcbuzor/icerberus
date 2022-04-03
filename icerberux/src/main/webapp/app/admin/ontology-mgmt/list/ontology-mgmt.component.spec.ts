import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologyMgmtComponent } from './ontology-mgmt.component';

describe('OntologyMgmtComponent', () => {
  let component: OntologyMgmtComponent;
  let fixture: ComponentFixture<OntologyMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OntologyMgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologyMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
