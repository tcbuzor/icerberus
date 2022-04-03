jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacTypeService } from '../service/cerbac-type.service';
import { ICerbacType, CerbacType } from '../cerbac-type.model';

import { CerbacTypeUpdateComponent } from './cerbac-type-update.component';

describe('Component Tests', () => {
  describe('CerbacType Management Update Component', () => {
    let comp: CerbacTypeUpdateComponent;
    let fixture: ComponentFixture<CerbacTypeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacTypeService: CerbacTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacTypeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacTypeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacTypeService = TestBed.inject(CerbacTypeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cerbacType: ICerbacType = { id: 456 };

        activatedRoute.data = of({ cerbacType });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacType));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacType = { id: 123 };
        spyOn(cerbacTypeService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacType }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacTypeService.update).toHaveBeenCalledWith(cerbacType);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacType = new CerbacType();
        spyOn(cerbacTypeService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacType }));
        saveSubject.complete();

        // THEN
        expect(cerbacTypeService.create).toHaveBeenCalledWith(cerbacType);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacType = { id: 123 };
        spyOn(cerbacTypeService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacTypeService.update).toHaveBeenCalledWith(cerbacType);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
