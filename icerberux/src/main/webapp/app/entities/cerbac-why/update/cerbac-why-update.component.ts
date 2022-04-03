import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICerbacWhy, CerbacWhy } from '../cerbac-why.model';
import { CerbacWhyService } from '../service/cerbac-why.service';

@Component({
  selector: 'cpl-cerbac-why-update',
  templateUrl: './cerbac-why-update.component.html',
})
export class CerbacWhyUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    reason: [null, [Validators.required]],
  });

  constructor(protected cerbacWhyService: CerbacWhyService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhy }) => {
      this.updateForm(cerbacWhy);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacWhy = this.createFromForm();
    if (cerbacWhy.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacWhyService.update(cerbacWhy));
    } else {
      this.subscribeToSaveResponse(this.cerbacWhyService.create(cerbacWhy));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacWhy>>): void {
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

  protected updateForm(cerbacWhy: ICerbacWhy): void {
    this.editForm.patchValue({
      id: cerbacWhy.id,
      reason: cerbacWhy.reason,
    });
  }

  protected createFromForm(): ICerbacWhy {
    return {
      ...new CerbacWhy(),
      id: this.editForm.get(['id'])!.value,
      reason: this.editForm.get(['reason'])!.value,
    };
  }
}
