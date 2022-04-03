jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CerbacPolicyRuleService } from '../service/cerbac-policy-rule.service';
import { ICerbacPolicyRule, CerbacPolicyRule } from '../cerbac-policy-rule.model';
import { ICerbacWhere } from 'app/entities/cerbac-where/cerbac-where.model';
import { CerbacWhereService } from 'app/entities/cerbac-where/service/cerbac-where.service';
import { ICerbacWhen } from 'app/entities/cerbac-when/cerbac-when.model';
import { CerbacWhenService } from 'app/entities/cerbac-when/service/cerbac-when.service';
import { ICerbacHow } from 'app/entities/cerbac-how/cerbac-how.model';
import { CerbacHowService } from 'app/entities/cerbac-how/service/cerbac-how.service';
import { ICerbacWhy } from 'app/entities/cerbac-why/cerbac-why.model';
import { CerbacWhyService } from 'app/entities/cerbac-why/service/cerbac-why.service';
import { ICerbacWho } from 'app/entities/cerbac-who/cerbac-who.model';
import { CerbacWhoService } from 'app/entities/cerbac-who/service/cerbac-who.service';
import { ICerbacWhat } from 'app/entities/cerbac-what/cerbac-what.model';
import { CerbacWhatService } from 'app/entities/cerbac-what/service/cerbac-what.service';
import { ICerbacType } from 'app/entities/cerbac-type/cerbac-type.model';
import { CerbacTypeService } from 'app/entities/cerbac-type/service/cerbac-type.service';
import { ICerbacAction } from 'app/entities/cerbac-action/cerbac-action.model';
import { CerbacActionService } from 'app/entities/cerbac-action/service/cerbac-action.service';
import { ICerbacPolicy } from 'app/entities/cerbac-policy/cerbac-policy.model';
import { CerbacPolicyService } from 'app/entities/cerbac-policy/service/cerbac-policy.service';

import { CerbacPolicyRuleUpdateComponent } from './cerbac-policy-rule-update.component';

describe('Component Tests', () => {
  describe('CerbacPolicyRule Management Update Component', () => {
    let comp: CerbacPolicyRuleUpdateComponent;
    let fixture: ComponentFixture<CerbacPolicyRuleUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cerbacPolicyRuleService: CerbacPolicyRuleService;
    let cerbacWhereService: CerbacWhereService;
    let cerbacWhenService: CerbacWhenService;
    let cerbacHowService: CerbacHowService;
    let cerbacWhyService: CerbacWhyService;
    let cerbacWhoService: CerbacWhoService;
    let cerbacWhatService: CerbacWhatService;
    let cerbacTypeService: CerbacTypeService;
    let cerbacActionService: CerbacActionService;
    let cerbacPolicyService: CerbacPolicyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacPolicyRuleUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CerbacPolicyRuleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacPolicyRuleUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cerbacPolicyRuleService = TestBed.inject(CerbacPolicyRuleService);
      cerbacWhereService = TestBed.inject(CerbacWhereService);
      cerbacWhenService = TestBed.inject(CerbacWhenService);
      cerbacHowService = TestBed.inject(CerbacHowService);
      cerbacWhyService = TestBed.inject(CerbacWhyService);
      cerbacWhoService = TestBed.inject(CerbacWhoService);
      cerbacWhatService = TestBed.inject(CerbacWhatService);
      cerbacTypeService = TestBed.inject(CerbacTypeService);
      cerbacActionService = TestBed.inject(CerbacActionService);
      cerbacPolicyService = TestBed.inject(CerbacPolicyService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call where query and add missing value', () => {
        const cerbacPolicyRule: ICerbacPolicyRule = { id: 456 };
        const where: ICerbacWhere = { id: 90174 };
        cerbacPolicyRule.where = where;

        const whereCollection: ICerbacWhere[] = [{ id: 78483 }];
        spyOn(cerbacWhereService, 'query').and.returnValue(of(new HttpResponse({ body: whereCollection })));
        const expectedCollection: ICerbacWhere[] = [where, ...whereCollection];
        spyOn(cerbacWhereService, 'addCerbacWhereToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacPolicyRule });
        comp.ngOnInit();

        expect(cerbacWhereService.query).toHaveBeenCalled();
        expect(cerbacWhereService.addCerbacWhereToCollectionIfMissing).toHaveBeenCalledWith(whereCollection, where);
        expect(comp.wheresCollection).toEqual(expectedCollection);
      });

      it('Should call when query and add missing value', () => {
        const cerbacPolicyRule: ICerbacPolicyRule = { id: 456 };
        const when: ICerbacWhen = { id: 12578 };
        cerbacPolicyRule.when = when;

        const whenCollection: ICerbacWhen[] = [{ id: 11640 }];
        spyOn(cerbacWhenService, 'query').and.returnValue(of(new HttpResponse({ body: whenCollection })));
        const expectedCollection: ICerbacWhen[] = [when, ...whenCollection];
        spyOn(cerbacWhenService, 'addCerbacWhenToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacPolicyRule });
        comp.ngOnInit();

        expect(cerbacWhenService.query).toHaveBeenCalled();
        expect(cerbacWhenService.addCerbacWhenToCollectionIfMissing).toHaveBeenCalledWith(whenCollection, when);
        expect(comp.whensCollection).toEqual(expectedCollection);
      });

      it('Should call how query and add missing value', () => {
        const cerbacPolicyRule: ICerbacPolicyRule = { id: 456 };
        const how: ICerbacHow = { id: 47841 };
        cerbacPolicyRule.how = how;

        const howCollection: ICerbacHow[] = [{ id: 31548 }];
        spyOn(cerbacHowService, 'query').and.returnValue(of(new HttpResponse({ body: howCollection })));
        const expectedCollection: ICerbacHow[] = [how, ...howCollection];
        spyOn(cerbacHowService, 'addCerbacHowToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacPolicyRule });
        comp.ngOnInit();

        expect(cerbacHowService.query).toHaveBeenCalled();
        expect(cerbacHowService.addCerbacHowToCollectionIfMissing).toHaveBeenCalledWith(howCollection, how);
        expect(comp.howsCollection).toEqual(expectedCollection);
      });

      it('Should call why query and add missing value', () => {
        const cerbacPolicyRule: ICerbacPolicyRule = { id: 456 };
        const why: ICerbacWhy = { id: 14956 };
        cerbacPolicyRule.why = why;

        const whyCollection: ICerbacWhy[] = [{ id: 64404 }];
        spyOn(cerbacWhyService, 'query').and.returnValue(of(new HttpResponse({ body: whyCollection })));
        const expectedCollection: ICerbacWhy[] = [why, ...whyCollection];
        spyOn(cerbacWhyService, 'addCerbacWhyToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacPolicyRule });
        comp.ngOnInit();

        expect(cerbacWhyService.query).toHaveBeenCalled();
        expect(cerbacWhyService.addCerbacWhyToCollectionIfMissing).toHaveBeenCalledWith(whyCollection, why);
        expect(comp.whiesCollection).toEqual(expectedCollection);
      });

      it('Should call CerbacWho query and add missing value', () => {
        const cerbacPolicyRule: ICerbacPolicyRule = { id: 456 };
        const who: ICerbacWho = { id: 93164 };
        cerbacPolicyRule.who = who;

        const cerbacWhoCollection: ICerbacWho[] = [{ id: 15758 }];
        spyOn(cerbacWhoService, 'query').and.returnValue(of(new HttpResponse({ body: cerbacWhoCollection })));
        const additionalCerbacWhos = [who];
        const expectedCollection: ICerbacWho[] = [...additionalCerbacWhos, ...cerbacWhoCollection];
        spyOn(cerbacWhoService, 'addCerbacWhoToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacPolicyRule });
        comp.ngOnInit();

        expect(cerbacWhoService.query).toHaveBeenCalled();
        expect(cerbacWhoService.addCerbacWhoToCollectionIfMissing).toHaveBeenCalledWith(cerbacWhoCollection, ...additionalCerbacWhos);
        expect(comp.cerbacWhosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call CerbacWhat query and add missing value', () => {
        const cerbacPolicyRule: ICerbacPolicyRule = { id: 456 };
        const what: ICerbacWhat = { id: 66426 };
        cerbacPolicyRule.what = what;

        const cerbacWhatCollection: ICerbacWhat[] = [{ id: 29163 }];
        spyOn(cerbacWhatService, 'query').and.returnValue(of(new HttpResponse({ body: cerbacWhatCollection })));
        const additionalCerbacWhats = [what];
        const expectedCollection: ICerbacWhat[] = [...additionalCerbacWhats, ...cerbacWhatCollection];
        spyOn(cerbacWhatService, 'addCerbacWhatToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacPolicyRule });
        comp.ngOnInit();

        expect(cerbacWhatService.query).toHaveBeenCalled();
        expect(cerbacWhatService.addCerbacWhatToCollectionIfMissing).toHaveBeenCalledWith(cerbacWhatCollection, ...additionalCerbacWhats);
        expect(comp.cerbacWhatsSharedCollection).toEqual(expectedCollection);
      });

      it('Should call CerbacType query and add missing value', () => {
        const cerbacPolicyRule: ICerbacPolicyRule = { id: 456 };
        const type: ICerbacType = { id: 69641 };
        cerbacPolicyRule.type = type;

        const cerbacTypeCollection: ICerbacType[] = [{ id: 22177 }];
        spyOn(cerbacTypeService, 'query').and.returnValue(of(new HttpResponse({ body: cerbacTypeCollection })));
        const additionalCerbacTypes = [type];
        const expectedCollection: ICerbacType[] = [...additionalCerbacTypes, ...cerbacTypeCollection];
        spyOn(cerbacTypeService, 'addCerbacTypeToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacPolicyRule });
        comp.ngOnInit();

        expect(cerbacTypeService.query).toHaveBeenCalled();
        expect(cerbacTypeService.addCerbacTypeToCollectionIfMissing).toHaveBeenCalledWith(cerbacTypeCollection, ...additionalCerbacTypes);
        expect(comp.cerbacTypesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call CerbacAction query and add missing value', () => {
        const cerbacPolicyRule: ICerbacPolicyRule = { id: 456 };
        const cerbacActions: ICerbacAction[] = [{ id: 3903 }];
        cerbacPolicyRule.cerbacActions = cerbacActions;

        const cerbacActionCollection: ICerbacAction[] = [{ id: 6270 }];
        spyOn(cerbacActionService, 'query').and.returnValue(of(new HttpResponse({ body: cerbacActionCollection })));
        const additionalCerbacActions = [...cerbacActions];
        const expectedCollection: ICerbacAction[] = [...additionalCerbacActions, ...cerbacActionCollection];
        spyOn(cerbacActionService, 'addCerbacActionToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacPolicyRule });
        comp.ngOnInit();

        expect(cerbacActionService.query).toHaveBeenCalled();
        expect(cerbacActionService.addCerbacActionToCollectionIfMissing).toHaveBeenCalledWith(
          cerbacActionCollection,
          ...additionalCerbacActions
        );
        expect(comp.cerbacActionsSharedCollection).toEqual(expectedCollection);
      });

      it('Should call CerbacPolicy query and add missing value', () => {
        const cerbacPolicyRule: ICerbacPolicyRule = { id: 456 };
        const cerbacPolicy: ICerbacPolicy = { id: 43009 };
        cerbacPolicyRule.cerbacPolicy = cerbacPolicy;

        const cerbacPolicyCollection: ICerbacPolicy[] = [{ id: 3263 }];
        spyOn(cerbacPolicyService, 'query').and.returnValue(of(new HttpResponse({ body: cerbacPolicyCollection })));
        const additionalCerbacPolicies = [cerbacPolicy];
        const expectedCollection: ICerbacPolicy[] = [...additionalCerbacPolicies, ...cerbacPolicyCollection];
        spyOn(cerbacPolicyService, 'addCerbacPolicyToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ cerbacPolicyRule });
        comp.ngOnInit();

        expect(cerbacPolicyService.query).toHaveBeenCalled();
        expect(cerbacPolicyService.addCerbacPolicyToCollectionIfMissing).toHaveBeenCalledWith(
          cerbacPolicyCollection,
          ...additionalCerbacPolicies
        );
        expect(comp.cerbacPoliciesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const cerbacPolicyRule: ICerbacPolicyRule = { id: 456 };
        const where: ICerbacWhere = { id: 97119 };
        cerbacPolicyRule.where = where;
        const when: ICerbacWhen = { id: 23841 };
        cerbacPolicyRule.when = when;
        const how: ICerbacHow = { id: 66429 };
        cerbacPolicyRule.how = how;
        const why: ICerbacWhy = { id: 17453 };
        cerbacPolicyRule.why = why;
        const who: ICerbacWho = { id: 32897 };
        cerbacPolicyRule.who = who;
        const what: ICerbacWhat = { id: 8631 };
        cerbacPolicyRule.what = what;
        const type: ICerbacType = { id: 27886 };
        cerbacPolicyRule.type = type;
        const cerbacActions: ICerbacAction = { id: 5213 };
        cerbacPolicyRule.cerbacActions = [cerbacActions];
        const cerbacPolicy: ICerbacPolicy = { id: 81583 };
        cerbacPolicyRule.cerbacPolicy = cerbacPolicy;

        activatedRoute.data = of({ cerbacPolicyRule });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cerbacPolicyRule));
        expect(comp.wheresCollection).toContain(where);
        expect(comp.whensCollection).toContain(when);
        expect(comp.howsCollection).toContain(how);
        expect(comp.whiesCollection).toContain(why);
        expect(comp.cerbacWhosSharedCollection).toContain(who);
        expect(comp.cerbacWhatsSharedCollection).toContain(what);
        expect(comp.cerbacTypesSharedCollection).toContain(type);
        expect(comp.cerbacActionsSharedCollection).toContain(cerbacActions);
        expect(comp.cerbacPoliciesSharedCollection).toContain(cerbacPolicy);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacPolicyRule = { id: 123 };
        spyOn(cerbacPolicyRuleService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacPolicyRule });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacPolicyRule }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cerbacPolicyRuleService.update).toHaveBeenCalledWith(cerbacPolicyRule);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacPolicyRule = new CerbacPolicyRule();
        spyOn(cerbacPolicyRuleService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacPolicyRule });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cerbacPolicyRule }));
        saveSubject.complete();

        // THEN
        expect(cerbacPolicyRuleService.create).toHaveBeenCalledWith(cerbacPolicyRule);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cerbacPolicyRule = { id: 123 };
        spyOn(cerbacPolicyRuleService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cerbacPolicyRule });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cerbacPolicyRuleService.update).toHaveBeenCalledWith(cerbacPolicyRule);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackCerbacWhereById', () => {
        it('Should return tracked CerbacWhere primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCerbacWhereById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCerbacWhenById', () => {
        it('Should return tracked CerbacWhen primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCerbacWhenById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCerbacHowById', () => {
        it('Should return tracked CerbacHow primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCerbacHowById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCerbacWhyById', () => {
        it('Should return tracked CerbacWhy primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCerbacWhyById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCerbacWhoById', () => {
        it('Should return tracked CerbacWho primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCerbacWhoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCerbacWhatById', () => {
        it('Should return tracked CerbacWhat primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCerbacWhatById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCerbacTypeById', () => {
        it('Should return tracked CerbacType primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCerbacTypeById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCerbacActionById', () => {
        it('Should return tracked CerbacAction primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCerbacActionById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCerbacPolicyById', () => {
        it('Should return tracked CerbacPolicy primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCerbacPolicyById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });

    describe('Getting selected relationships', () => {
      describe('getSelectedCerbacAction', () => {
        it('Should return option if no CerbacAction is selected', () => {
          const option = { id: 123 };
          const result = comp.getSelectedCerbacAction(option);
          expect(result === option).toEqual(true);
        });

        it('Should return selected CerbacAction for according option', () => {
          const option = { id: 123 };
          const selected = { id: 123 };
          const selected2 = { id: 456 };
          const result = comp.getSelectedCerbacAction(option, [selected2, selected]);
          expect(result === selected).toEqual(true);
          expect(result === selected2).toEqual(false);
          expect(result === option).toEqual(false);
        });

        it('Should return option if this CerbacAction is not selected', () => {
          const option = { id: 123 };
          const selected = { id: 456 };
          const result = comp.getSelectedCerbacAction(option, [selected]);
          expect(result === option).toEqual(true);
          expect(result === selected).toEqual(false);
        });
      });
    });
  });
});
