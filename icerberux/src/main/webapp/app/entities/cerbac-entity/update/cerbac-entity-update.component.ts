import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICerbacEntity, CerbacEntity } from '../../../shared/model/cerbac-entity.model';
import { CerbacEntityService } from '../../../shared/service/cerbac-entity.service';

@Component({
  selector: 'cpl-cerbac-entity-update',
  templateUrl: './cerbac-entity-update.component.html',
})
export class CerbacEntityUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
  });

  constructor(protected cerbacEntityService: CerbacEntityService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacEntity }) => {
      this.updateForm(cerbacEntity);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacEntity = this.createFromForm();
    if (cerbacEntity.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacEntityService.update(cerbacEntity));
    } else {
      this.subscribeToSaveResponse(this.cerbacEntityService.create(cerbacEntity));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacEntity>>): void {
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

  protected updateForm(cerbacEntity: ICerbacEntity): void {
    this.editForm.patchValue({
      id: cerbacEntity.id,
      name: cerbacEntity.name,
    });
  }

  protected createFromForm(): ICerbacEntity {
    return {
      ...new CerbacEntity(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }
}
