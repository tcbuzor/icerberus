import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICerbacHow, CerbacHow } from '../cerbac-how.model';
import { CerbacHowService } from '../service/cerbac-how.service';

@Component({
  selector: 'cpl-cerbac-how-update',
  templateUrl: './cerbac-how-update.component.html',
})
export class CerbacHowUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    how: [null, [Validators.required]],
  });

  constructor(protected cerbacHowService: CerbacHowService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacHow }) => {
      this.updateForm(cerbacHow);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacHow = this.createFromForm();
    if (cerbacHow.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacHowService.update(cerbacHow));
    } else {
      this.subscribeToSaveResponse(this.cerbacHowService.create(cerbacHow));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacHow>>): void {
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

  protected updateForm(cerbacHow: ICerbacHow): void {
    this.editForm.patchValue({
      id: cerbacHow.id,
      how: cerbacHow.how,
    });
  }

  protected createFromForm(): ICerbacHow {
    return {
      ...new CerbacHow(),
      id: this.editForm.get(['id'])!.value,
      how: this.editForm.get(['how'])!.value,
    };
  }
}
