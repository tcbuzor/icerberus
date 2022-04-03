import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICerbacAction, CerbacAction } from '../cerbac-action.model';
import { CerbacActionService } from '../service/cerbac-action.service';

@Component({
  selector: 'cpl-cerbac-action-update',
  templateUrl: './cerbac-action-update.component.html',
})
export class CerbacActionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
  });

  constructor(protected cerbacActionService: CerbacActionService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacAction }) => {
      this.updateForm(cerbacAction);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacAction = this.createFromForm();
    if (cerbacAction.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacActionService.update(cerbacAction));
    } else {
      this.subscribeToSaveResponse(this.cerbacActionService.create(cerbacAction));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacAction>>): void {
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

  protected updateForm(cerbacAction: ICerbacAction): void {
    this.editForm.patchValue({
      id: cerbacAction.id,
      name: cerbacAction.name,
    });
  }

  protected createFromForm(): ICerbacAction {
    return {
      ...new CerbacAction(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }
}
