import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICerbacWhen, CerbacWhen } from '../cerbac-when.model';
import { CerbacWhenService } from '../service/cerbac-when.service';

@Component({
  selector: 'cpl-cerbac-when-update',
  templateUrl: './cerbac-when-update.component.html',
})
export class CerbacWhenUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    whenCondition: [],
    value: [null, [Validators.required]],
  });

  constructor(protected cerbacWhenService: CerbacWhenService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhen }) => {
      this.updateForm(cerbacWhen);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacWhen = this.createFromForm();
    if (cerbacWhen.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacWhenService.update(cerbacWhen));
    } else {
      this.subscribeToSaveResponse(this.cerbacWhenService.create(cerbacWhen));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacWhen>>): void {
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

  protected updateForm(cerbacWhen: ICerbacWhen): void {
    this.editForm.patchValue({
      id: cerbacWhen.id,
      whenCondition: cerbacWhen.whenCondition,
      value: cerbacWhen.value,
    });
  }

  protected createFromForm(): ICerbacWhen {
    return {
      ...new CerbacWhen(),
      id: this.editForm.get(['id'])!.value,
      whenCondition: this.editForm.get(['whenCondition'])!.value,
      value: this.editForm.get(['value'])!.value,
    };
  }
}
