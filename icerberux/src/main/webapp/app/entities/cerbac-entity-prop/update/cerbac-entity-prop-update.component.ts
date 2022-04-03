import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICerbacEntityProp, CerbacEntityProp } from '../cerbac-entity-prop.model';
import { CerbacEntityPropService } from '../service/cerbac-entity-prop.service';
import { ICerbacEntity } from 'app/shared/model/cerbac-entity.model';
import { CerbacEntityService } from 'app/shared/service/cerbac-entity.service';

@Component({
  selector: 'cpl-cerbac-entity-prop-update',
  templateUrl: './cerbac-entity-prop-update.component.html',
})
export class CerbacEntityPropUpdateComponent implements OnInit {
  isSaving = false;

  cerbacEntitiesSharedCollection: ICerbacEntity[] = [];

  editForm = this.fb.group({
    id: [],
    propName: [null, [Validators.required]],
    cerbacEntity: [],
  });

  constructor(
    protected cerbacEntityPropService: CerbacEntityPropService,
    protected cerbacEntityService: CerbacEntityService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacEntityProp }) => {
      this.updateForm(cerbacEntityProp);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacEntityProp = this.createFromForm();
    if (cerbacEntityProp.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacEntityPropService.update(cerbacEntityProp));
    } else {
      this.subscribeToSaveResponse(this.cerbacEntityPropService.create(cerbacEntityProp));
    }
  }

  trackCerbacEntityById(index: number, item: ICerbacEntity): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacEntityProp>>): void {
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

  protected updateForm(cerbacEntityProp: ICerbacEntityProp): void {
    this.editForm.patchValue({
      id: cerbacEntityProp.id,
      propName: cerbacEntityProp.propName,
      cerbacEntity: cerbacEntityProp.cerbacEntity,
    });

    this.cerbacEntitiesSharedCollection = this.cerbacEntityService.addCerbacEntityToCollectionIfMissing(
      this.cerbacEntitiesSharedCollection,
      cerbacEntityProp.cerbacEntity
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cerbacEntityService
      .query()
      .pipe(map((res: HttpResponse<ICerbacEntity[]>) => res.body ?? []))
      .pipe(
        map((cerbacEntities: ICerbacEntity[]) =>
          this.cerbacEntityService.addCerbacEntityToCollectionIfMissing(cerbacEntities, this.editForm.get('cerbacEntity')!.value)
        )
      )
      .subscribe((cerbacEntities: ICerbacEntity[]) => (this.cerbacEntitiesSharedCollection = cerbacEntities));
  }

  protected createFromForm(): ICerbacEntityProp {
    return {
      ...new CerbacEntityProp(),
      id: this.editForm.get(['id'])!.value,
      propName: this.editForm.get(['propName'])!.value,
      cerbacEntity: this.editForm.get(['cerbacEntity'])!.value,
    };
  }
}
