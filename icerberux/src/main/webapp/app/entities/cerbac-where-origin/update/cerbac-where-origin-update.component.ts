import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICerbacWhereOrigin, CerbacWhereOrigin } from '../cerbac-where-origin.model';
import { CerbacWhereOriginService } from '../service/cerbac-where-origin.service';

@Component({
  selector: 'cpl-cerbac-where-origin-update',
  templateUrl: './cerbac-where-origin-update.component.html',
})
export class CerbacWhereOriginUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    value: [null, [Validators.required]],
  });

  constructor(
    protected cerbacWhereOriginService: CerbacWhereOriginService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhereOrigin }) => {
      this.updateForm(cerbacWhereOrigin);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacWhereOrigin = this.createFromForm();
    if (cerbacWhereOrigin.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacWhereOriginService.update(cerbacWhereOrigin));
    } else {
      this.subscribeToSaveResponse(this.cerbacWhereOriginService.create(cerbacWhereOrigin));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacWhereOrigin>>): void {
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

  protected updateForm(cerbacWhereOrigin: ICerbacWhereOrigin): void {
    this.editForm.patchValue({
      id: cerbacWhereOrigin.id,
      value: cerbacWhereOrigin.value,
    });
  }

  protected createFromForm(): ICerbacWhereOrigin {
    return {
      ...new CerbacWhereOrigin(),
      id: this.editForm.get(['id'])!.value,
      value: this.editForm.get(['value'])!.value,
    };
  }
}
