jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacWhereOriginService } from '../service/cerbac-where-origin.service';
import { ICerbacWhereOrigin, CerbacWhereOrigin } from '../cerbac-where-origin.model';

import { CerbacWhereOriginUpdateComponent } from './cerbac-where-origin-update.component';

describe('Component Tests', () => {
  describe('CerbacWhereOrigin Management Update Component', () => {
    let comp: CerbacWhereOriginUpdateComponent;
    let fixture: ComponentFixture<CerbacWhereOriginUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacWhereOriginService: CerbacWhereOriginService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhereOriginUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacWhereOriginUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhereOriginUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacWhereOriginService = TestBed.inject(CerbacWhereOriginService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cerbacWhereOrigin: ICerbacWhereOrigin = { id: 456 };

        activatedRoute.data = of({ cerbacWhereOrigin });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacWhereOrigin));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhereOrigin = { id: 123 };
        spyOn(cerbacWhereOriginService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhereOrigin });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhereOrigin }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacWhereOriginService.update).toHaveBeenCalledWith(cerbacWhereOrigin);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhereOrigin = new CerbacWhereOrigin();
        spyOn(cerbacWhereOriginService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhereOrigin });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhereOrigin }));
        saveSubject.complete();

        // THEN
        expect(cerbacWhereOriginService.create).toHaveBeenCalledWith(cerbacWhereOrigin);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhereOrigin = { id: 123 };
        spyOn(cerbacWhereOriginService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhereOrigin });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacWhereOriginService.update).toHaveBeenCalledWith(cerbacWhereOrigin);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
