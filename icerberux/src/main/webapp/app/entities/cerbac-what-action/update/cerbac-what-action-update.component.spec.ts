jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacWhatActionService } from '../service/cerbac-what-action.service';
import { ICerbacWhatAction, CerbacWhatAction } from '../cerbac-what-action.model';
import { ICerbacWhat } from 'app/entities/cerbac-what/cerbac-what.model';
import { CerbacWhatService } from 'app/entities/cerbac-what/service/cerbac-what.service';
import { ICerbacAction } from 'app/entities/cerbac-action/cerbac-action.model';
import { CerbacActionService } from 'app/entities/cerbac-action/service/cerbac-action.service';

import { CerbacWhatActionUpdateComponent } from './cerbac-what-action-update.component';

describe('Component Tests', () => {
  describe('CerbacWhatAction Management Update Component', () => {
    let comp: CerbacWhatActionUpdateComponent;
    let fixture: ComponentFixture<CerbacWhatActionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacWhatActionService: CerbacWhatActionService;
    let cerbacWhatService: CerbacWhatService;
    let cerbacActionService: CerbacActionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhatActionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacWhatActionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhatActionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacWhatActionService = TestBed.inject(CerbacWhatActionService);
      cerbacWhatService = TestBed.inject(CerbacWhatService);
      cerbacActionService = TestBed.inject(CerbacActionService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call CerbacWhat query and add missing value', () => {
        const cerbacWhatAction: ICerbacWhatAction = { id: 456 };
        const cebacWhat: ICerbacWhat = { id: 7184 };
        cerbacWhatAction.cebacWhat = cebacWhat;

        const cerbacWhatCollection: ICerbacWhat[] = [{ id: 30486 }];
        spyOn(cerbacWhatService, 'query').and.returnValue(of(new HttpResponse({ body: cerbacWhatCollection })));
        const additionalCerbacWhats = [cebacWhat];
        const expectedCollection: ICerbacWhat[] = [...additionalCerbacWhats, ...cerbacWhatCollection];
        spyOn(cerbacWhatService, 'addCerbacWhatToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacWhatAction });
        comp.ngOnInit();

        expect(cerbacWhatService.query).toHaveBeenCalled();
        expect(cerbacWhatService.addCerbacWhatToCollectionIfMissing).toHaveBeenCalledWith(cerbacWhatCollection, ...additionalCerbacWhats);
        expect(comp.cerbacWhatsSharedCollection).toEqual(expectedCollection);
      });

      it('Should call CerbacAction query and add missing value', () => {
        const cerbacWhatAction: ICerbacWhatAction = { id: 456 };
        const cebacAction: ICerbacAction = { id: 2139 };
        cerbacWhatAction.cebacAction = cebacAction;

        const cerbacActionCollection: ICerbacAction[] = [{ id: 11556 }];
        spyOn(cerbacActionService, 'query').and.returnValue(of(new HttpResponse({ body: cerbacActionCollection })));
        const additionalCerbacActions = [cebacAction];
        const expectedCollection: ICerbacAction[] = [...additionalCerbacActions, ...cerbacActionCollection];
        spyOn(cerbacActionService, 'addCerbacActionToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacWhatAction });
        comp.ngOnInit();

        expect(cerbacActionService.query).toHaveBeenCalled();
        expect(cerbacActionService.addCerbacActionToCollectionIfMissing).toHaveBeenCalledWith(
          cerbacActionCollection,
          ...additionalCerbacActions
        );
        expect(comp.cerbacActionsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const cerbacWhatAction: ICerbacWhatAction = { id: 456 };
        const cebacWhat: ICerbacWhat = { id: 24416 };
        cerbacWhatAction.cebacWhat = cebacWhat;
        const cebacAction: ICerbacAction = { id: 44703 };
        cerbacWhatAction.cebacAction = cebacAction;

        activatedRoute.data = of({ cerbacWhatAction });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacWhatAction));
        expect(comp.cerbacWhatsSharedCollection).toContain(cebacWhat);
        expect(comp.cerbacActionsSharedCollection).toContain(cebacAction);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhatAction = { id: 123 };
        spyOn(cerbacWhatActionService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhatAction });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhatAction }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacWhatActionService.update).toHaveBeenCalledWith(cerbacWhatAction);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhatAction = new CerbacWhatAction();
        spyOn(cerbacWhatActionService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhatAction });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhatAction }));
        saveSubject.complete();

        // THEN
        expect(cerbacWhatActionService.create).toHaveBeenCalledWith(cerbacWhatAction);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhatAction = { id: 123 };
        spyOn(cerbacWhatActionService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhatAction });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacWhatActionService.update).toHaveBeenCalledWith(cerbacWhatAction);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackCerbacWhatById', () => {
        it('Should return tracked CerbacWhat primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCerbacWhatById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCerbacActionById', () => {
        it('Should return tracked CerbacAction primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCerbacActionById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
