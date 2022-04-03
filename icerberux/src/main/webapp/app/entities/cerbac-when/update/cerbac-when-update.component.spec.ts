jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacWhenService } from '../service/cerbac-when.service';
import { ICerbacWhen, CerbacWhen } from '../cerbac-when.model';

import { CerbacWhenUpdateComponent } from './cerbac-when-update.component';

describe('Component Tests', () => {
  describe('CerbacWhen Management Update Component', () => {
    let comp: CerbacWhenUpdateComponent;
    let fixture: ComponentFixture<CerbacWhenUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacWhenService: CerbacWhenService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhenUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacWhenUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhenUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacWhenService = TestBed.inject(CerbacWhenService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cerbacWhen: ICerbacWhen = { id: 456 };

        activatedRoute.data = of({ cerbacWhen });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacWhen));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhen = { id: 123 };
        spyOn(cerbacWhenService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhen });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhen }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacWhenService.update).toHaveBeenCalledWith(cerbacWhen);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhen = new CerbacWhen();
        spyOn(cerbacWhenService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhen });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhen }));
        saveSubject.complete();

        // THEN
        expect(cerbacWhenService.create).toHaveBeenCalledWith(cerbacWhen);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhen = { id: 123 };
        spyOn(cerbacWhenService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhen });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacWhenService.update).toHaveBeenCalledWith(cerbacWhen);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
