jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacWhoPropService } from '../service/cerbac-who-prop.service';
import { ICerbacWhoProp, CerbacWhoProp } from '../cerbac-who-prop.model';
import { ICerbacEntityProp } from 'app/entities/cerbac-entity-prop/cerbac-entity-prop.model';
import { CerbacEntityPropService } from 'app/entities/cerbac-entity-prop/service/cerbac-entity-prop.service';
import { ICerbacPolicyRule } from 'app/entities/cerbac-policy-rule/cerbac-policy-rule.model';
import { CerbacPolicyRuleService } from 'app/entities/cerbac-policy-rule/service/cerbac-policy-rule.service';

import { CerbacWhoPropUpdateComponent } from './cerbac-who-prop-update.component';

describe('Component Tests', () => {
  describe('CerbacWhoProp Management Update Component', () => {
    let comp: CerbacWhoPropUpdateComponent;
    let fixture: ComponentFixture<CerbacWhoPropUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacWhoPropService: CerbacWhoPropService;
    let cerbacEntityPropService: CerbacEntityPropService;
    let cerbacPolicyRuleService: CerbacPolicyRuleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhoPropUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacWhoPropUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhoPropUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacWhoPropService = TestBed.inject(CerbacWhoPropService);
      cerbacEntityPropService = TestBed.inject(CerbacEntityPropService);
      cerbacPolicyRuleService = TestBed.inject(CerbacPolicyRuleService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call entityProperty query and add missing value', () => {
        const cerbacWhoProp: ICerbacWhoProp = { id: 456 };
        const entityProperty: ICerbacEntityProp = { id: 75254 };
        cerbacWhoProp.entityProperty = entityProperty;

        const entityPropertyCollection: ICerbacEntityProp[] = [{ id: 67930 }];
        spyOn(cerbacEntityPropService, 'query').and.returnValue(of(new HttpResponse({ body: entityPropertyCollection })));
        const expectedCollection: ICerbacEntityProp[] = [entityProperty, ...entityPropertyCollection];
        spyOn(cerbacEntityPropService, 'addCerbacEntityPropToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacWhoProp });
        comp.ngOnInit();

        expect(cerbacEntityPropService.query).toHaveBeenCalled();
        expect(cerbacEntityPropService.addCerbacEntityPropToCollectionIfMissing).toHaveBeenCalledWith(
          entityPropertyCollection,
          entityProperty
        );
        expect(comp.entityPropertiesCollection).toEqual(expectedCollection);
      });

      it('Should call CerbacPolicyRule query and add missing value', () => {
        const cerbacWhoProp: ICerbacWhoProp = { id: 456 };
        const policyRule: ICerbacPolicyRule = { id: 78745 };
        cerbacWhoProp.policyRule = policyRule;

        const cerbacPolicyRuleCollection: ICerbacPolicyRule[] = [{ id: 15906 }];
        spyOn(cerbacPolicyRuleService, 'query').and.returnValue(of(new HttpResponse({ body: cerbacPolicyRuleCollection })));
        const additionalCerbacPolicyRules = [policyRule];
        const expectedCollection: ICerbacPolicyRule[] = [...additionalCerbacPolicyRules, ...cerbacPolicyRuleCollection];
        spyOn(cerbacPolicyRuleService, 'addCerbacPolicyRuleToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacWhoProp });
        comp.ngOnInit();

        expect(cerbacPolicyRuleService.query).toHaveBeenCalled();
        expect(cerbacPolicyRuleService.addCerbacPolicyRuleToCollectionIfMissing).toHaveBeenCalledWith(
          cerbacPolicyRuleCollection,
          ...additionalCerbacPolicyRules
        );
        expect(comp.cerbacPolicyRulesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const cerbacWhoProp: ICerbacWhoProp = { id: 456 };
        const entityProperty: ICerbacEntityProp = { id: 30011 };
        cerbacWhoProp.entityProperty = entityProperty;
        const policyRule: ICerbacPolicyRule = { id: 59736 };
        cerbacWhoProp.policyRule = policyRule;

        activatedRoute.data = of({ cerbacWhoProp });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacWhoProp));
        expect(comp.entityPropertiesCollection).toContain(entityProperty);
        expect(comp.cerbacPolicyRulesSharedCollection).toContain(policyRule);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhoProp = { id: 123 };
        spyOn(cerbacWhoPropService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhoProp });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhoProp }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacWhoPropService.update).toHaveBeenCalledWith(cerbacWhoProp);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhoProp = new CerbacWhoProp();
        spyOn(cerbacWhoPropService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhoProp });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacWhoProp }));
        saveSubject.complete();

        // THEN
        expect(cerbacWhoPropService.create).toHaveBeenCalledWith(cerbacWhoProp);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacWhoProp = { id: 123 };
        spyOn(cerbacWhoPropService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacWhoProp });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacWhoPropService.update).toHaveBeenCalledWith(cerbacWhoProp);
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
