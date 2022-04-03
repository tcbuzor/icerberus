jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacWhyService } from '../service/cerbac-why.service';
import { ICerbacWhy, CerbacWhy } from '../cerbac-why.model';

import { CerbacWhyUpdateComponent } from './cerbac-why-update.component';

describe('Component Tests', () => {
  describe('CerbacWhy Management Update Component', () => {
    let comp: CerbacWhyUpdateComponent;
    let fixture: ComponentFixture<CerbacWhyUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacWhyService: CerbacWhyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhyUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacWhyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhyUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacWhyService = TestBed.inject(CerbacWhyService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cerbacWhy: ICerbacWhy = { id: 456 };

        activatedRoute.data = of({ cerbacWhy });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacWhy));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhy = { id: 123 };
        spyOn(cerbacWhyService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhy });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhy }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacWhyService.update).toHaveBeenCalledWith(cerbacWhy);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhy = new CerbacWhy();
        spyOn(cerbacWhyService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhy });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhy }));
        saveSubject.complete();

        // THEN
        expect(cerbacWhyService.create).toHaveBeenCalledWith(cerbacWhy);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhy = { id: 123 };
        spyOn(cerbacWhyService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhy });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacWhyService.update).toHaveBeenCalledWith(cerbacWhy);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
