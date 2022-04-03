jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacHowService } from '../service/cerbac-how.service';
import { ICerbacHow, CerbacHow } from '../cerbac-how.model';

import { CerbacHowUpdateComponent } from './cerbac-how-update.component';

describe('Component Tests', () => {
  describe('CerbacHow Management Update Component', () => {
    let comp: CerbacHowUpdateComponent;
    let fixture: ComponentFixture<CerbacHowUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacHowService: CerbacHowService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacHowUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacHowUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacHowUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacHowService = TestBed.inject(CerbacHowService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cerbacHow: ICerbacHow = { id: 456 };

        activatedRoute.data = of({ cerbacHow });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacHow));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacHow = { id: 123 };
        spyOn(cerbacHowService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacHow });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacHow }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacHowService.update).toHaveBeenCalledWith(cerbacHow);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacHow = new CerbacHow();
        spyOn(cerbacHowService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacHow });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacHow }));
        saveSubject.complete();

        // THEN
        expect(cerbacHowService.create).toHaveBeenCalledWith(cerbacHow);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacHow = { id: 123 };
        spyOn(cerbacHowService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacHow });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacHowService.update).toHaveBeenCalledWith(cerbacHow);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
