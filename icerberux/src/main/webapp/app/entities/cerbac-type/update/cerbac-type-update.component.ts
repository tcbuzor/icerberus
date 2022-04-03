import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICerbacType, CerbacType } from '../cerbac-type.model';
import { CerbacTypeService } from '../service/cerbac-type.service';

@Component({
  selector: 'cpl-cerbac-type-update',
  templateUrl: './cerbac-type-update.component.html',
})
export class CerbacTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
  });

  constructor(protected cerbacTypeService: CerbacTypeService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacType }) => {
      this.updateForm(cerbacType);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacType = this.createFromForm();
    if (cerbacType.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacTypeService.update(cerbacType));
    } else {
      this.subscribeToSaveResponse(this.cerbacTypeService.create(cerbacType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacType>>): void {
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

  protected updateForm(cerbacType: ICerbacType): void {
    this.editForm.patchValue({
      id: cerbacType.id,
      name: cerbacType.name,
    });
  }

  protected createFromForm(): ICerbacType {
    return {
      ...new CerbacType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }
}
