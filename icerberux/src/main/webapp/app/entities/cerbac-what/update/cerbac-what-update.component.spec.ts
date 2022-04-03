jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacWhatService } from '../service/cerbac-what.service';
import { ICerbacWhat, CerbacWhat } from '../cerbac-what.model';
import { ICerbacEntity } from 'app/shared/model/cerbac-entity.model';
import { CerbacEntityService } from 'app/shared/service/cerbac-entity.service';

import { CerbacWhatUpdateComponent } from './cerbac-what-update.component';

describe('Component Tests', () => {
  describe('CerbacWhat Management Update Component', () => {
    let comp: CerbacWhatUpdateComponent;
    let fixture: ComponentFixture<CerbacWhatUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacWhatService: CerbacWhatService;
    let cerbacEntityService: CerbacEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhatUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacWhatUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhatUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacWhatService = TestBed.inject(CerbacWhatService);
      cerbacEntityService = TestBed.inject(CerbacEntityService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call cerbacEntity query and add missing value', () => {
        const cerbacWhat: ICerbacWhat = { id: 456 };
        const cerbacEntity: ICerbacEntity = { id: 39942 };
        cerbacWhat.cerbacEntity = cerbacEntity;

        const cerbacEntityCollection: ICerbacEntity[] = [{ id: 96459 }];
        spyOn(cerbacEntityService, 'query').and.returnValue(of(new HttpResponse({ body: cerbacEntityCollection })));
        const expectedCollection: ICerbacEntity[] = [cerbacEntity, ...cerbacEntityCollection];
        spyOn(cerbacEntityService, 'addCerbacEntityToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacWhat });
        comp.ngOnInit();

        expect(cerbacEntityService.query).toHaveBeenCalled();
        expect(cerbacEntityService.addCerbacEntityToCollectionIfMissing).toHaveBeenCalledWith(cerbacEntityCollection, cerbacEntity);
        expect(comp.cerbacEntitiesCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const cerbacWhat: ICerbacWhat = { id: 456 };
        const cerbacEntity: ICerbacEntity = { id: 59089 };
        cerbacWhat.cerbacEntity = cerbacEntity;

        activatedRoute.data = of({ cerbacWhat });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacWhat));
        expect(comp.cerbacEntitiesCollection).toContain(cerbacEntity);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhat = { id: 123 };
        spyOn(cerbacWhatService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhat });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhat }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacWhatService.update).toHaveBeenCalledWith(cerbacWhat);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhat = new CerbacWhat();
        spyOn(cerbacWhatService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhat });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhat }));
        saveSubject.complete();

        // THEN
        expect(cerbacWhatService.create).toHaveBeenCalledWith(cerbacWhat);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhat = { id: 123 };
        spyOn(cerbacWhatService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhat });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacWhatService.update).toHaveBeenCalledWith(cerbacWhat);
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
