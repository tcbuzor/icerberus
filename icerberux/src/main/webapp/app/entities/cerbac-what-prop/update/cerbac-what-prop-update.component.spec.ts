jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacWhatPropService } from '../service/cerbac-what-prop.service';
import { ICerbacWhatProp, CerbacWhatProp } from '../cerbac-what-prop.model';
import { ICerbacEntityProp } from 'app/entities/cerbac-entity-prop/cerbac-entity-prop.model';
import { CerbacEntityPropService } from 'app/entities/cerbac-entity-prop/service/cerbac-entity-prop.service';
import { ICerbacPolicyRule } from 'app/entities/cerbac-policy-rule/cerbac-policy-rule.model';
import { CerbacPolicyRuleService } from 'app/entities/cerbac-policy-rule/service/cerbac-policy-rule.service';

import { CerbacWhatPropUpdateComponent } from './cerbac-what-prop-update.component';

describe('Component Tests', () => {
  describe('CerbacWhatProp Management Update Component', () => {
    let comp: CerbacWhatPropUpdateComponent;
    let fixture: ComponentFixture<CerbacWhatPropUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacWhatPropService: CerbacWhatPropService;
    let cerbacEntityPropService: CerbacEntityPropService;
    let cerbacPolicyRuleService: CerbacPolicyRuleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhatPropUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacWhatPropUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhatPropUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacWhatPropService = TestBed.inject(CerbacWhatPropService);
      cerbacEntityPropService = TestBed.inject(CerbacEntityPropService);
      cerbacPolicyRuleService = TestBed.inject(CerbacPolicyRuleService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call entityProperty query and add missing value', () => {
        const cerbacWhatProp: ICerbacWhatProp = { id: 456 };
        const entityProperty: ICerbacEntityProp = { id: 54750 };
        cerbacWhatProp.entityProperty = entityProperty;

        const entityPropertyCollection: ICerbacEntityProp[] = [{ id: 25053 }];
        spyOn(cerbacEntityPropService, 'query').and.returnValue(of(new HttpResponse({ body: entityPropertyCollection })));
        const expectedCollection: ICerbacEntityProp[] = [entityProperty, ...entityPropertyCollection];
        spyOn(cerbacEntityPropService, 'addCerbacEntityPropToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacWhatProp });
        comp.ngOnInit();

        expect(cerbacEntityPropService.query).toHaveBeenCalled();
        expect(cerbacEntityPropService.addCerbacEntityPropToCollectionIfMissing).toHaveBeenCalledWith(
          entityPropertyCollection,
          entityProperty
        );
        expect(comp.entityPropertiesCollection).toEqual(expectedCollection);
      });

      it('Should call CerbacPolicyRule query and add missing value', () => {
        const cerbacWhatProp: ICerbacWhatProp = { id: 456 };
        const policyRule: ICerbacPolicyRule = { id: 7422 };
        cerbacWhatProp.policyRule = policyRule;

        const cerbacPolicyRuleCollection: ICerbacPolicyRule[] = [{ id: 11524 }];
        spyOn(cerbacPolicyRuleService, 'query').and.returnValue(of(new HttpResponse({ body: cerbacPolicyRuleCollection })));
        const additionalCerbacPolicyRules = [policyRule];
        const expectedCollection: ICerbacPolicyRule[] = [...additionalCerbacPolicyRules, ...cerbacPolicyRuleCollection];
        spyOn(cerbacPolicyRuleService, 'addCerbacPolicyRuleToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacWhatProp });
        comp.ngOnInit();

        expect(cerbacPolicyRuleService.query).toHaveBeenCalled();
        expect(cerbacPolicyRuleService.addCerbacPolicyRuleToCollectionIfMissing).toHaveBeenCalledWith(
          cerbacPolicyRuleCollection,
          ...additionalCerbacPolicyRules
        );
        expect(comp.cerbacPolicyRulesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const cerbacWhatProp: ICerbacWhatProp = { id: 456 };
        const entityProperty: ICerbacEntityProp = { id: 32369 };
        cerbacWhatProp.entityProperty = entityProperty;
        const policyRule: ICerbacPolicyRule = { id: 72500 };
        cerbacWhatProp.policyRule = policyRule;

        activatedRoute.data = of({ cerbacWhatProp });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacWhatProp));
        expect(comp.entityPropertiesCollection).toContain(entityProperty);
        expect(comp.cerbacPolicyRulesSharedCollection).toContain(policyRule);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhatProp = { id: 123 };
        spyOn(cerbacWhatPropService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhatProp });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhatProp }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacWhatPropService.update).toHaveBeenCalledWith(cerbacWhatProp);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhatProp = new CerbacWhatProp();
        spyOn(cerbacWhatPropService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhatProp });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhatProp }));
        saveSubject.complete();

        // THEN
        expect(cerbacWhatPropService.create).toHaveBeenCalledWith(cerbacWhatProp);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhatProp = { id: 123 };
        spyOn(cerbacWhatPropService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhatProp });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacWhatPropService.update).toHaveBeenCalledWith(cerbacWhatProp);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackCerbacEntityPropById', () => {
        it('Should return tracked CerbacEntityProp primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCerbacEntityPropById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCerbacPolicyRuleById', () => {
        it('Should return tracked CerbacPolicyRule primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCerbacPolicyRuleById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
