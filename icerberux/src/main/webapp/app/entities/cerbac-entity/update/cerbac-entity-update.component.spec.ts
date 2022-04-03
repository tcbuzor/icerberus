jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacEntityService } from '../../../shared/service/cerbac-entity.service';
import { ICerbacEntity, CerbacEntity } from '../../../shared/model/cerbac-entity.model';

import { CerbacEntityUpdateComponent } from './cerbac-entity-update.component';

describe('Component Tests', () => {
  describe('CerbacEntity Management Update Component', () => {
    let comp: CerbacEntityUpdateComponent;
    let fixture: ComponentFixture<CerbacEntityUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacEntityService: CerbacEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacEntityUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacEntityUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacEntityUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacEntityService = TestBed.inject(CerbacEntityService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cerbacEntity: ICerbacEntity = { id: 456 };

        activatedRoute.data = of({ cerbacEntity });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacEntity));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacEntity = { id: 123 };
        spyOn(cerbacEntityService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacEntity });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacEntity }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacEntityService.update).toHaveBeenCalledWith(cerbacEntity);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacEntity = new CerbacEntity();
        spyOn(cerbacEntityService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacEntity });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacEntity }));
        saveSubject.complete();

        // THEN
        expect(cerbacEntityService.create).toHaveBeenCalledWith(cerbacEntity);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacEntity = { id: 123 };
        spyOn(cerbacEntityService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacEntity });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacEntityService.update).toHaveBeenCalledWith(cerbacEntity);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
