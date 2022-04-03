jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacWhereService } from '../service/cerbac-where.service';
import { ICerbacWhere, CerbacWhere } from '../cerbac-where.model';
import { ICerbacWhereOrigin } from 'app/entities/cerbac-where-origin/cerbac-where-origin.model';
import { CerbacWhereOriginService } from 'app/entities/cerbac-where-origin/service/cerbac-where-origin.service';
import { ICerbacWhereTarget } from 'app/entities/cerbac-where-target/cerbac-where-target.model';
import { CerbacWhereTargetService } from 'app/entities/cerbac-where-target/service/cerbac-where-target.service';

import { CerbacWhereUpdateComponent } from './cerbac-where-update.component';

describe('Component Tests', () => {
  describe('CerbacWhere Management Update Component', () => {
    let comp: CerbacWhereUpdateComponent;
    let fixture: ComponentFixture<CerbacWhereUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacWhereService: CerbacWhereService;
    let cerbacWhereOriginService: CerbacWhereOriginService;
    let cerbacWhereTargetService: CerbacWhereTargetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhereUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacWhereUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhereUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacWhereService = TestBed.inject(CerbacWhereService);
      cerbacWhereOriginService = TestBed.inject(CerbacWhereOriginService);
      cerbacWhereTargetService = TestBed.inject(CerbacWhereTargetService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call CerbacWhereOrigin query and add missing value', () => {
        const cerbacWhere: ICerbacWhere = { id: 456 };
        const origin: ICerbacWhereOrigin = { id: 27411 };
        cerbacWhere.origin = origin;

        const cerbacWhereOriginCollection: ICerbacWhereOrigin[] = [{ id: 27685 }];
        spyOn(cerbacWhereOriginService, 'query').and.returnValue(of(new HttpResponse({ body: cerbacWhereOriginCollection })));
        const additionalCerbacWhereOrigins = [origin];
        const expectedCollection: ICerbacWhereOrigin[] = [...additionalCerbacWhereOrigins, ...cerbacWhereOriginCollection];
        spyOn(cerbacWhereOriginService, 'addCerbacWhereOriginToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacWhere });
        comp.ngOnInit();

        expect(cerbacWhereOriginService.query).toHaveBeenCalled();
        expect(cerbacWhereOriginService.addCerbacWhereOriginToCollectionIfMissing).toHaveBeenCalledWith(
          cerbacWhereOriginCollection,
          ...additionalCerbacWhereOrigins
        );
        expect(comp.cerbacWhereOriginsSharedCollection).toEqual(expectedCollection);
      });

      it('Should call CerbacWhereTarget query and add missing value', () => {
        const cerbacWhere: ICerbacWhere = { id: 456 };
        const target: ICerbacWhereTarget = { id: 51851 };
        cerbacWhere.target = target;

        const cerbacWhereTargetCollection: ICerbacWhereTarget[] = [{ id: 3701 }];
        spyOn(cerbacWhereTargetService, 'query').and.returnValue(of(new HttpResponse({ body: cerbacWhereTargetCollection })));
        const additionalCerbacWhereTargets = [target];
        const expectedCollection: ICerbacWhereTarget[] = [...additionalCerbacWhereTargets, ...cerbacWhereTargetCollection];
        spyOn(cerbacWhereTargetService, 'addCerbacWhereTargetToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacWhere });
        comp.ngOnInit();

        expect(cerbacWhereTargetService.query).toHaveBeenCalled();
        expect(cerbacWhereTargetService.addCerbacWhereTargetToCollectionIfMissing).toHaveBeenCalledWith(
          cerbacWhereTargetCollection,
          ...additionalCerbacWhereTargets
        );
        expect(comp.cerbacWhereTargetsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const cerbacWhere: ICerbacWhere = { id: 456 };
        const origin: ICerbacWhereOrigin = { id: 58551 };
        cerbacWhere.origin = origin;
        const target: ICerbacWhereTarget = { id: 92406 };
        cerbacWhere.target = target;

        activatedRoute.data = of({ cerbacWhere });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacWhere));
        expect(comp.cerbacWhereOriginsSharedCollection).toContain(origin);
        expect(comp.cerbacWhereTargetsSharedCollection).toContain(target);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhere = { id: 123 };
        spyOn(cerbacWhereService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhere });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhere }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacWhereService.update).toHaveBeenCalledWith(cerbacWhere);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhere = new CerbacWhere();
        spyOn(cerbacWhereService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhere });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhere }));
        saveSubject.complete();

        // THEN
        expect(cerbacWhereService.create).toHaveBeenCalledWith(cerbacWhere);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhere = { id: 123 };
        spyOn(cerbacWhereService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhere });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacWhereService.update).toHaveBeenCalledWith(cerbacWhere);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackCerbacWhereOriginById', () => {
        it('Should return tracked CerbacWhereOrigin primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCerbacWhereOriginById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCerbacWhereTargetById', () => {
        it('Should return tracked CerbacWhereTarget primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCerbacWhereTargetById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
