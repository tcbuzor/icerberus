import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICerbacWhereTarget, CerbacWhereTarget } from '../cerbac-where-target.model';
import { CerbacWhereTargetService } from '../service/cerbac-where-target.service';

@Component({
  selector: 'cpl-cerbac-where-target-update',
  templateUrl: './cerbac-where-target-update.component.html',
})
export class CerbacWhereTargetUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    value: [null, [Validators.required]],
  });

  constructor(
    protected cerbacWhereTargetService: CerbacWhereTargetService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhereTarget }) => {
      this.updateForm(cerbacWhereTarget);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacWhereTarget = this.createFromForm();
    if (cerbacWhereTarget.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacWhereTargetService.update(cerbacWhereTarget));
    } else {
      this.subscribeToSaveResponse(this.cerbacWhereTargetService.create(cerbacWhereTarget));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacWhereTarget>>): void {
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

  protected updateForm(cerbacWhereTarget: ICerbacWhereTarget): void {
    this.editForm.patchValue({
      id: cerbacWhereTarget.id,
      value: cerbacWhereTarget.value,
    });
  }

  protected createFromForm(): ICerbacWhereTarget {
    return {
      ...new CerbacWhereTarget(),
      id: this.editForm.get(['id'])!.value,
      value: this.editForm.get(['value'])!.value,
    };
  }
}
