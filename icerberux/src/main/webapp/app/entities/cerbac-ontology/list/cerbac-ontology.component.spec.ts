import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CerbacOntologyService } from '../service/cerbac-ontology.service';

import { CerbacOntologyComponent } from './cerbac-ontology.component';

describe('CerbacOntology Management Component', () => {
  let comp: CerbacOntologyComponent;
  let fixture: ComponentFixture<CerbacOntologyComponent>;
  let service: CerbacOntologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CerbacOntologyComponent],
    })
      .overrideTemplate(CerbacOntologyComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CerbacOntologyComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CerbacOntologyService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.cerbacOntologies?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
