import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CerbacOntologyService } from '../service/cerbac-ontology.service';
import { ICerbacOntology, CerbacOntology } from '../cerbac-ontology.model';

import { CerbacOntologyUpdateComponent } from './cerbac-ontology-update.component';

describe('CerbacOntology Management Update Component', () => {
  let comp: CerbacOntologyUpdateComponent;
  let fixture: ComponentFixture<CerbacOntologyUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cerbacOntologyService: CerbacOntologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CerbacOntologyUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CerbacOntologyUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CerbacOntologyUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cerbacOntologyService = TestBed.inject(CerbacOntologyService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cerbacOntology: ICerbacOntology = { id: 456 };

      activatedRoute.data = of({ cerbacOntology });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacOntology));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CerbacOntology>>();
      const cerbacOntology = { id: 123 };
      jest.spyOn(cerbacOntologyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cerbacOntology });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cerbacOntology }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(cerbacOntologyService.update).toHaveBeenCalledWith(cerbacOntology);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CerbacOntology>>();
      const cerbacOntology = new CerbacOntology();
      jest.spyOn(cerbacOntologyService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cerbacOntology });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cerbacOntology }));
      saveSubject.complete();

      // THEN
      expect(cerbacOntologyService.create).toHaveBeenCalledWith(cerbacOntology);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CerbacOntology>>();
      const cerbacOntology = { id: 123 };
      jest.spyOn(cerbacOntologyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cerbacOntology });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cerbacOntologyService.update).toHaveBeenCalledWith(cerbacOntology);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
