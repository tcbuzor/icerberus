jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacWhoService } from '../service/cerbac-who.service';
import { ICerbacWho, CerbacWho } from '../cerbac-who.model';
import { ICerbacEntity } from 'app/shared/model/cerbac-entity.model';
import { CerbacEntityService } from 'app/shared/service/cerbac-entity.service';

import { CerbacWhoUpdateComponent } from './cerbac-who-update.component';

describe('Component Tests', () => {
  describe('CerbacWho Management Update Component', () => {
    let comp: CerbacWhoUpdateComponent;
    let fixture: ComponentFixture<CerbacWhoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacWhoService: CerbacWhoService;
    let cerbacEntityService: CerbacEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacWhoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacWhoService = TestBed.inject(CerbacWhoService);
      cerbacEntityService = TestBed.inject(CerbacEntityService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call cerbacEntity query and add missing value', () => {
        const cerbacWho: ICerbacWho = { id: 456 };
        const cerbacEntity: ICerbacEntity = { id: 58195 };
        cerbacWho.cerbacEntity = cerbacEntity;

        const cerbacEntityCollection: ICerbacEntity[] = [{ id: 48574 }];
        spyOn(cerbacEntityService, 'query').and.returnValue(of(new HttpResponse({ body: cerbacEntityCollection })));
        const expectedCollection: ICerbacEntity[] = [cerbacEntity, ...cerbacEntityCollection];
        spyOn(cerbacEntityService, 'addCerbacEntityToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacWho });
        comp.ngOnInit();

        expect(cerbacEntityService.query).toHaveBeenCalled();
        expect(cerbacEntityService.addCerbacEntityToCollectionIfMissing).toHaveBeenCalledWith(cerbacEntityCollection, cerbacEntity);
        expect(comp.cerbacEntitiesCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const cerbacWho: ICerbacWho = { id: 456 };
        const cerbacEntity: ICerbacEntity = { id: 65469 };
        cerbacWho.cerbacEntity = cerbacEntity;

        activatedRoute.data = of({ cerbacWho });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacWho));
        expect(comp.cerbacEntitiesCollection).toContain(cerbacEntity);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWho = { id: 123 };
        spyOn(cerbacWhoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWho });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWho }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacWhoService.update).toHaveBeenCalledWith(cerbacWho);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWho = new CerbacWho();
        spyOn(cerbacWhoService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWho });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWho }));
        saveSubject.complete();

        // THEN
        expect(cerbacWhoService.create).toHaveBeenCalledWith(cerbacWho);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWho = { id: 123 };
        spyOn(cerbacWhoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWho });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacWhoService.update).toHaveBeenCalledWith(cerbacWho);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackCerbacEntityById', () => {
        it('Should return tracked CerbacEntity primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCerbacEntityById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
