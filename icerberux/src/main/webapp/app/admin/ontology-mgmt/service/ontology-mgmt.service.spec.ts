import { TestBed } from '@angular/core/testing';

import { OntologyMgmtService } from './ontology-mgmt.service';

describe('OntologyMgmtService', () => {
  let service: OntologyMgmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OntologyMgmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
