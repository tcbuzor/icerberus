import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICerbacWhatProp, CerbacWhatProp } from '../cerbac-what-prop.model';
import { CerbacWhatPropService } from '../service/cerbac-what-prop.service';
import { ICerbacEntityProp } from 'app/entities/cerbac-entity-prop/cerbac-entity-prop.model';
import { CerbacEntityPropService } from 'app/entities/cerbac-entity-prop/service/cerbac-entity-prop.service';
import { ICerbacPolicyRule } from 'app/entities/cerbac-policy-rule/cerbac-policy-rule.model';
import { CerbacPolicyRuleService } from 'app/entities/cerbac-policy-rule/service/cerbac-policy-rule.service';

@Component({
  selector: 'cpl-cerbac-what-prop-update',
  templateUrl: './cerbac-what-prop-update.component.html',
})
export class CerbacWhatPropUpdateComponent implements OnInit {
  isSaving = false;

  entityPropertiesCollection: ICerbacEntityProp[] = [];
  cerbacPolicyRulesSharedCollection: ICerbacPolicyRule[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    value: [null, [Validators.required]],
    condition: [],
    entityProperty: [],
    policyRule: [],
  });

  constructor(
    protected cerbacWhatPropService: CerbacWhatPropService,
    protected cerbacEntityPropService: CerbacEntityPropService,
    protected cerbacPolicyRuleService: CerbacPolicyRuleService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhatProp }) => {
      this.updateForm(cerbacWhatProp);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacWhatProp = this.createFromForm();
    if (cerbacWhatProp.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacWhatPropService.update(cerbacWhatProp));
    } else {
      this.subscribeToSaveResponse(this.cerbacWhatPropService.create(cerbacWhatProp));
    }
  }

  trackCerbacEntityPropById(index: number, item: ICerbacEntityProp): number {
    return item.id!;
  }

  trackCerbacPolicyRuleById(index: number, item: ICerbacPolicyRule): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacWhatProp>>): void {
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

  protected updateForm(cerbacWhatProp: ICerbacWhatProp): void {
    this.editForm.patchValue({
      id: cerbacWhatProp.id,
      name: cerbacWhatProp.name,
      value: cerbacWhatProp.value,
      condition: cerbacWhatProp.condition,
      entityProperty: cerbacWhatProp.entityProperty,
      policyRule: cerbacWhatProp.policyRule,
    });

    this.entityPropertiesCollection = this.cerbacEntityPropService.addCerbacEntityPropToCollectionIfMissing(
      this.entityPropertiesCollection,
      cerbacWhatProp.entityProperty
    );
    this.cerbacPolicyRulesSharedCollection = this.cerbacPolicyRuleService.addCerbacPolicyRuleToCollectionIfMissing(
      this.cerbacPolicyRulesSharedCollection,
      cerbacWhatProp.policyRule
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cerbacEntityPropService
      .query({ filter: 'cerbacwhatprop-is-null' })
      .pipe(map((res: HttpResponse<ICerbacEntityProp[]>) => res.body ?? []))
      .pipe(
        map((cerbacEntityProps: ICerbacEntityProp[]) =>
          this.cerbacEntityPropService.addCerbacEntityPropToCollectionIfMissing(
            cerbacEntityProps,
            this.editForm.get('entityProperty')!.value
          )
        )
      )
      .subscribe((cerbacEntityProps: ICerbacEntityProp[]) => (this.entityPropertiesCollection = cerbacEntityProps));

    this.cerbacPolicyRuleService
      .query()
      .pipe(map((res: HttpResponse<ICerbacPolicyRule[]>) => res.body ?? []))
      .pipe(
        map((cerbacPolicyRules: ICerbacPolicyRule[]) =>
          this.cerbacPolicyRuleService.addCerbacPolicyRuleToCollectionIfMissing(cerbacPolicyRules, this.editForm.get('policyRule')!.value)
        )
      )
      .subscribe((cerbacPolicyRules: ICerbacPolicyRule[]) => (this.cerbacPolicyRulesSharedCollection = cerbacPolicyRules));
  }

  protected createFromForm(): ICerbacWhatProp {
    return {
      ...new CerbacWhatProp(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      value: this.editForm.get(['value'])!.value,
      condition: this.editForm.get(['condition'])!.value,
      entityProperty: this.editForm.get(['entityProperty'])!.value,
      policyRule: this.editForm.get(['policyRule'])!.value,
    };
  }
}
