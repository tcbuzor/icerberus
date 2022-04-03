jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacEntityPropService } from '../service/cerbac-entity-prop.service';
import { ICerbacEntityProp, CerbacEntityProp } from '../cerbac-entity-prop.model';
import { ICerbacEntity } from 'app/shared/model/cerbac-entity.model';
import { CerbacEntityService } from 'app/shared/service/cerbac-entity.service';

import { CerbacEntityPropUpdateComponent } from './cerbac-entity-prop-update.component';

describe('Component Tests', () => {
  describe('CerbacEntityProp Management Update Component', () => {
    let comp: CerbacEntityPropUpdateComponent;
    let fixture: ComponentFixture<CerbacEntityPropUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacEntityPropService: CerbacEntityPropService;
    let cerbacEntityService: CerbacEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacEntityPropUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacEntityPropUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacEntityPropUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacEntityPropService = TestBed.inject(CerbacEntityPropService);
      cerbacEntityService = TestBed.inject(CerbacEntityService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call CerbacEntity query and add missing value', () => {
        const cerbacEntityProp: ICerbacEntityProp = { id: 456 };
        const cerbacEntity: ICerbacEntity = { id: 25857 };
        cerbacEntityProp.cerbacEntity = cerbacEntity;

        const cerbacEntityCollection: ICerbacEntity[] = [{ id: 16515 }];
        spyOn(cerbacEntityService, 'query').and.returnValue(of(new HttpResponse({ body: cerbacEntityCollection })));
        const additionalCerbacEntities = [cerbacEntity];
        const expectedCollection: ICerbacEntity[] = [...additionalCerbacEntities, ...cerbacEntityCollection];
        spyOn(cerbacEntityService, 'addCerbacEntityToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacEntityProp });
        comp.ngOnInit();

        expect(cerbacEntityService.query).toHaveBeenCalled();
        expect(cerbacEntityService.addCerbacEntityToCollectionIfMissing).toHaveBeenCalledWith(
          cerbacEntityCollection,
          ...additionalCerbacEntities
        );
        expect(comp.cerbacEntitiesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const cerbacEntityProp: ICerbacEntityProp = { id: 456 };
        const cerbacEntity: ICerbacEntity = { id: 60223 };
        cerbacEntityProp.cerbacEntity = cerbacEntity;

        activatedRoute.data = of({ cerbacEntityProp });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacEntityProp));
        expect(comp.cerbacEntitiesSharedCollection).toContain(cerbacEntity);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacEntityProp = { id: 123 };
        spyOn(cerbacEntityPropService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacEntityProp });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacEntityProp }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacEntityPropService.update).toHaveBeenCalledWith(cerbacEntityProp);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacEntityProp = new CerbacEntityProp();
        spyOn(cerbacEntityPropService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacEntityProp });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacEntityProp }));
        saveSubject.complete();

        // THEN
        expect(cerbacEntityPropService.create).toHaveBeenCalledWith(cerbacEntityProp);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacEntityProp = { id: 123 };
        spyOn(cerbacEntityPropService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacEntityProp });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacEntityPropService.update).toHaveBeenCalledWith(cerbacEntityProp);
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
