jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacPolicyService } from '../service/cerbac-policy.service';
import { ICerbacPolicy, CerbacPolicy } from '../cerbac-policy.model';

import { CerbacPolicyUpdateComponent } from './cerbac-policy-update.component';

describe('Component Tests', () => {
  describe('CerbacPolicy Management Update Component', () => {
    let comp: CerbacPolicyUpdateComponent;
    let fixture: ComponentFixture<CerbacPolicyUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacPolicyService: CerbacPolicyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacPolicyUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacPolicyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacPolicyUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacPolicyService = TestBed.inject(CerbacPolicyService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cerbacPolicy: ICerbacPolicy = { id: 456 };

        activatedRoute.data = of({ cerbacPolicy });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacPolicy));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacPolicy = { id: 123 };
        spyOn(cerbacPolicyService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacPolicy });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacPolicy }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacPolicyService.update).toHaveBeenCalledWith(cerbacPolicy);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacPolicy = new CerbacPolicy();
        spyOn(cerbacPolicyService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacPolicy });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacPolicy }));
        saveSubject.complete();

        // THEN
        expect(cerbacPolicyService.create).toHaveBeenCalledWith(cerbacPolicy);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacPolicy = { id: 123 };
        spyOn(cerbacPolicyService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacPolicy });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacPolicyService.update).toHaveBeenCalledWith(cerbacPolicy);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
