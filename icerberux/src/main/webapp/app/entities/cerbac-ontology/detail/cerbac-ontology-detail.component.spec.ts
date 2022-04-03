import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacOntologyDetailComponent } from './cerbac-ontology-detail.component';

describe('CerbacOntology Management Detail Component', () => {
  let comp: CerbacOntologyDetailComponent;
  let fixture: ComponentFixture<CerbacOntologyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CerbacOntologyDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ cerbacOntology: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CerbacOntologyDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CerbacOntologyDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cerbacOntology on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.cerbacOntology).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
