import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICerbacPolicyRule, CerbacPolicyRule } from '../cerbac-policy-rule.model';
import { CerbacPolicyRuleService } from '../service/cerbac-policy-rule.service';
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

@Component({
  selector: 'cpl-cerbac-policy-rule-update',
  templateUrl: './cerbac-policy-rule-update.component.html',
})
export class CerbacPolicyRuleUpdateComponent implements OnInit {
  isSaving = false;

  wheresCollection: ICerbacWhere[] = [];
  whensCollection: ICerbacWhen[] = [];
  howsCollection: ICerbacHow[] = [];
  whiesCollection: ICerbacWhy[] = [];
  cerbacWhosSharedCollection: ICerbacWho[] = [];
  cerbacWhatsSharedCollection: ICerbacWhat[] = [];
  cerbacTypesSharedCollection: ICerbacType[] = [];
  cerbacActionsSharedCollection: ICerbacAction[] = [];
  cerbacPoliciesSharedCollection: ICerbacPolicy[] = [];

  editForm = this.fb.group({
    id: [],
    sid: [null, [Validators.required]],
    where: [],
    when: [],
    how: [],
    why: [],
    who: [null, Validators.required],
    what: [null, Validators.required],
    type: [null, Validators.required],
    cerbacActions: [null, Validators.required],
    cerbacPolicy: [],
  });

  constructor(
    protected cerbacPolicyRuleService: CerbacPolicyRuleService,
    protected cerbacWhereService: CerbacWhereService,
    protected cerbacWhenService: CerbacWhenService,
    protected cerbacHowService: CerbacHowService,
    protected cerbacWhyService: CerbacWhyService,
    protected cerbacWhoService: CerbacWhoService,
    protected cerbacWhatService: CerbacWhatService,
    protected cerbacTypeService: CerbacTypeService,
    protected cerbacActionService: CerbacActionService,
    protected cerbacPolicyService: CerbacPolicyService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacPolicyRule }) => {
      this.updateForm(cerbacPolicyRule);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacPolicyRule = this.createFromForm();
    if (cerbacPolicyRule.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacPolicyRuleService.update(cerbacPolicyRule));
    } else {
      this.subscribeToSaveResponse(this.cerbacPolicyRuleService.create(cerbacPolicyRule));
    }
  }

  trackCerbacWhereById(index: number, item: ICerbacWhere): number {
    return item.id!;
  }

  trackCerbacWhenById(index: number, item: ICerbacWhen): number {
    return item.id!;
  }

  trackCerbacHowById(index: number, item: ICerbacHow): number {
    return item.id!;
  }

  trackCerbacWhyById(index: number, item: ICerbacWhy): number {
    return item.id!;
  }

  trackCerbacWhoById(index: number, item: ICerbacWho): number {
    return item.id!;
  }

  trackCerbacWhatById(index: number, item: ICerbacWhat): number {
    return item.id!;
  }

  trackCerbacTypeById(index: number, item: ICerbacType): number {
    return item.id!;
  }

  trackCerbacActionById(index: number, item: ICerbacAction): number {
    return item.id!;
  }

  trackCerbacPolicyById(index: number, item: ICerbacPolicy): number {
    return item.id!;
  }

  getSelectedCerbacAction(option: ICerbacAction, selectedVals?: ICerbacAction[]): ICerbacAction {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacPolicyRule>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(cerbacPolicyRule: ICerbacPolicyRule): void {
    this.editForm.patchValue({
      id: cerbacPolicyRule.id,
      sid: cerbacPolicyRule.sid,
      where: cerbacPolicyRule.where,
      when: cerbacPolicyRule.when,
      how: cerbacPolicyRule.how,
      why: cerbacPolicyRule.why,
      who: cerbacPolicyRule.who,
      what: cerbacPolicyRule.what,
      type: cerbacPolicyRule.type,
      cerbacActions: cerbacPolicyRule.cerbacActions,
      cerbacPolicy: cerbacPolicyRule.cerbacPolicy,
    });

    this.wheresCollection = this.cerbacWhereService.addCerbacWhereToCollectionIfMissing(this.wheresCollection, cerbacPolicyRule.where);
    this.whensCollection = this.cerbacWhenService.addCerbacWhenToCollectionIfMissing(this.whensCollection, cerbacPolicyRule.when);
    this.howsCollection = this.cerbacHowService.addCerbacHowToCollectionIfMissing(this.howsCollection, cerbacPolicyRule.how);
    this.whiesCollection = this.cerbacWhyService.addCerbacWhyToCollectionIfMissing(this.whiesCollection, cerbacPolicyRule.why);
    this.cerbacWhosSharedCollection = this.cerbacWhoService.addCerbacWhoToCollectionIfMissing(
      this.cerbacWhosSharedCollection,
      cerbacPolicyRule.who
    );
    this.cerbacWhatsSharedCollection = this.cerbacWhatService.addCerbacWhatToCollectionIfMissing(
      this.cerbacWhatsSharedCollection,
      cerbacPolicyRule.what
    );
    this.cerbacTypesSharedCollection = this.cerbacTypeService.addCerbacTypeToCollectionIfMissing(
      this.cerbacTypesSharedCollection,
      cerbacPolicyRule.type
    );
    this.cerbacActionsSharedCollection = this.cerbacActionService.addCerbacActionToCollectionIfMissing(
      this.cerbacActionsSharedCollection,
      ...(cerbacPolicyRule.cerbacActions ?? [])
    );
    this.cerbacPoliciesSharedCollection = this.cerbacPolicyService.addCerbacPolicyToCollectionIfMissing(
      this.cerbacPoliciesSharedCollection,
      cerbacPolicyRule.cerbacPolicy
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cerbacWhereService
      .query({ filter: 'cerbacpolicyrule-is-null' })
      .pipe(map((res: HttpResponse<ICerbacWhere[]>) => res.body ?? []))
      .pipe(
        map((cerbacWheres: ICerbacWhere[]) =>
          this.cerbacWhereService.addCerbacWhereToCollectionIfMissing(cerbacWheres, this.editForm.get('where')!.value)
        )
      )
      .subscribe((cerbacWheres: ICerbacWhere[]) => (this.wheresCollection = cerbacWheres));

    this.cerbacWhenService
      .query({ filter: 'cerbacpolicyrule-is-null' })
      .pipe(map((res: HttpResponse<ICerbacWhen[]>) => res.body ?? []))
      .pipe(
        map((cerbacWhens: ICerbacWhen[]) =>
          this.cerbacWhenService.addCerbacWhenToCollectionIfMissing(cerbacWhens, this.editForm.get('when')!.value)
        )
      )
      .subscribe((cerbacWhens: ICerbacWhen[]) => (this.whensCollection = cerbacWhens));

    this.cerbacHowService
      .query({ filter: 'cerbacpolicyrule-is-null' })
      .pipe(map((res: HttpResponse<ICerbacHow[]>) => res.body ?? []))
      .pipe(
        map((cerbacHows: ICerbacHow[]) =>
          this.cerbacHowService.addCerbacHowToCollectionIfMissing(cerbacHows, this.editForm.get('how')!.value)
        )
      )
      .subscribe((cerbacHows: ICerbacHow[]) => (this.howsCollection = cerbacHows));

    this.cerbacWhyService
      .query({ filter: 'cerbacpolicyrule-is-null' })
      .pipe(map((res: HttpResponse<ICerbacWhy[]>) => res.body ?? []))
      .pipe(
        map((cerbacWhies: ICerbacWhy[]) =>
          this.cerbacWhyService.addCerbacWhyToCollectionIfMissing(cerbacWhies, this.editForm.get('why')!.value)
        )
      )
      .subscribe((cerbacWhies: ICerbacWhy[]) => (this.whiesCollection = cerbacWhies));

    this.cerbacWhoService
      .query()
      .pipe(map((res: HttpResponse<ICerbacWho[]>) => res.body ?? []))
      .pipe(
        map((cerbacWhos: ICerbacWho[]) =>
          this.cerbacWhoService.addCerbacWhoToCollectionIfMissing(cerbacWhos, this.editForm.get('who')!.value)
        )
      )
      .subscribe((cerbacWhos: ICerbacWho[]) => (this.cerbacWhosSharedCollection = cerbacWhos));

    this.cerbacWhatService
      .query()
      .pipe(map((res: HttpResponse<ICerbacWhat[]>) => res.body ?? []))
      .pipe(
        map((cerbacWhats: ICerbacWhat[]) =>
          this.cerbacWhatService.addCerbacWhatToCollectionIfMissing(cerbacWhats, this.editForm.get('what')!.value)
        )
      )
      .subscribe((cerbacWhats: ICerbacWhat[]) => (this.cerbacWhatsSharedCollection = cerbacWhats));

    this.cerbacTypeService
      .query()
      .pipe(map((res: HttpResponse<ICerbacType[]>) => res.body ?? []))
      .pipe(
        map((cerbacTypes: ICerbacType[]) =>
          this.cerbacTypeService.addCerbacTypeToCollectionIfMissing(cerbacTypes, this.editForm.get('type')!.value)
        )
      )
      .subscribe((cerbacTypes: ICerbacType[]) => (this.cerbacTypesSharedCollection = cerbacTypes));

    this.cerbacActionService
      .query()
      .pipe(map((res: HttpResponse<ICerbacAction[]>) => res.body ?? []))
      .pipe(
        map((cerbacActions: ICerbacAction[]) =>
          this.cerbacActionService.addCerbacActionToCollectionIfMissing(cerbacActions, ...(this.editForm.get('cerbacActions')!.value ?? []))
        )
      )
      .subscribe((cerbacActions: ICerbacAction[]) => (this.cerbacActionsSharedCollection = cerbacActions));

    this.cerbacPolicyService
      .query()
      .pipe(map((res: HttpResponse<ICerbacPolicy[]>) => res.body ?? []))
      .pipe(
        map((cerbacPolicies: ICerbacPolicy[]) =>
          this.cerbacPolicyService.addCerbacPolicyToCollectionIfMissing(cerbacPolicies, this.editForm.get('cerbacPolicy')!.value)
        )
      )
      .subscribe((cerbacPolicies: ICerbacPolicy[]) => (this.cerbacPoliciesSharedCollection = cerbacPolicies));
  }

  protected createFromForm(): ICerbacPolicyRule {
    return {
      ...new CerbacPolicyRule(),
      id: this.editForm.get(['id'])!.value,
      sid: this.editForm.get(['sid'])!.value,
      where: this.editForm.get(['where'])!.value,
      when: this.editForm.get(['when'])!.value,
      how: this.editForm.get(['how'])!.value,
      why: this.editForm.get(['why'])!.value,
      who: this.editForm.get(['who'])!.value,
      what: this.editForm.get(['what'])!.value,
      type: this.editForm.get(['type'])!.value,
      cerbacActions: this.editForm.get(['cerbacActions'])!.value,
      cerbacPolicy: this.editForm.get(['cerbacPolicy'])!.value,
    };
  }
}
