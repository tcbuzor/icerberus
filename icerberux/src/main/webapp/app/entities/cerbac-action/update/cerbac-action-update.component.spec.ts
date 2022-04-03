jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacActionService } from '../service/cerbac-action.service';
import { ICerbacAction, CerbacAction } from '../cerbac-action.model';

import { CerbacActionUpdateComponent } from './cerbac-action-update.component';

describe('Component Tests', () => {
  describe('CerbacAction Management Update Component', () => {
    let comp: CerbacActionUpdateComponent;
    let fixture: ComponentFixture<CerbacActionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacActionService: CerbacActionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacActionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacActionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacActionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacActionService = TestBed.inject(CerbacActionService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cerbacAction: ICerbacAction = { id: 456 };

        activatedRoute.data = of({ cerbacAction });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacAction));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacAction = { id: 123 };
        spyOn(cerbacActionService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacAction });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacAction }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacActionService.update).toHaveBeenCalledWith(cerbacAction);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacAction = new CerbacAction();
        spyOn(cerbacActionService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacAction });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacAction }));
        saveSubject.complete();

        // THEN
        expect(cerbacActionService.create).toHaveBeenCalledWith(cerbacAction);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacAction = { id: 123 };
        spyOn(cerbacActionService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacAction });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacActionService.update).toHaveBeenCalledWith(cerbacAction);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
