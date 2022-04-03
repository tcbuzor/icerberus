jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacWhereTargetService } from '../service/cerbac-where-target.service';
import { ICerbacWhereTarget, CerbacWhereTarget } from '../cerbac-where-target.model';

import { CerbacWhereTargetUpdateComponent } from './cerbac-where-target-update.component';

describe('Component Tests', () => {
  describe('CerbacWhereTarget Management Update Component', () => {
    let comp: CerbacWhereTargetUpdateComponent;
    let fixture: ComponentFixture<CerbacWhereTargetUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacWhereTargetService: CerbacWhereTargetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhereTargetUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacWhereTargetUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhereTargetUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacWhereTargetService = TestBed.inject(CerbacWhereTargetService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cerbacWhereTarget: ICerbacWhereTarget = { id: 456 };

        activatedRoute.data = of({ cerbacWhereTarget });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacWhereTarget));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhereTarget = { id: 123 };
        spyOn(cerbacWhereTargetService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhereTarget });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhereTarget }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacWhereTargetService.update).toHaveBeenCalledWith(cerbacWhereTarget);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhereTarget = new CerbacWhereTarget();
        spyOn(cerbacWhereTargetService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhereTarget });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhereTarget }));
        saveSubject.complete();

        // THEN
        expect(cerbacWhereTargetService.create).toHaveBeenCalledWith(cerbacWhereTarget);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhereTarget = { id: 123 };
        spyOn(cerbacWhereTargetService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhereTarget });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacWhereTargetService.update).toHaveBeenCalledWith(cerbacWhereTarget);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
