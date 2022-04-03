import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICerbacWhat, CerbacWhat } from '../cerbac-what.model';
import { CerbacWhatService } from '../service/cerbac-what.service';
import { ICerbacEntity } from 'app/shared/model/cerbac-entity.model';
import { CerbacEntityService } from 'app/shared/service/cerbac-entity.service';

@Component({
  selector: 'cpl-cerbac-what-update',
  templateUrl: './cerbac-what-update.component.html',
})
export class CerbacWhatUpdateComponent implements OnInit {
  isSaving = false;

  cerbacEntitiesCollection: ICerbacEntity[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    cerbacEntity: [null, Validators.required],
  });

  constructor(
    protected cerbacWhatService: CerbacWhatService,
    protected cerbacEntityService: CerbacEntityService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhat }) => {
      this.updateForm(cerbacWhat);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacWhat = this.createFromForm();
    if (cerbacWhat.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacWhatService.update(cerbacWhat));
    } else {
      this.subscribeToSaveResponse(this.cerbacWhatService.create(cerbacWhat));
    }
  }

  trackCerbacEntityById(index: number, item: ICerbacEntity): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacWhat>>): void {
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

  protected updateForm(cerbacWhat: ICerbacWhat): void {
    this.editForm.patchValue({
      id: cerbacWhat.id,
      name: cerbacWhat.name,
      cerbacEntity: cerbacWhat.cerbacEntity,
    });

    this.cerbacEntitiesCollection = this.cerbacEntityService.addCerbacEntityToCollectionIfMissing(
      this.cerbacEntitiesCollection,
      cerbacWhat.cerbacEntity
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cerbacEntityService
      .query({ filter: 'cerbacwhat-is-null' })
      .pipe(map((res: HttpResponse<ICerbacEntity[]>) => res.body ?? []))
      .pipe(
        map((cerbacEntities: ICerbacEntity[]) =>
          this.cerbacEntityService.addCerbacEntityToCollectionIfMissing(cerbacEntities, this.editForm.get('cerbacEntity')!.value)
        )
      )
      .subscribe((cerbacEntities: ICerbacEntity[]) => (this.cerbacEntitiesCollection = cerbacEntities));
  }

  protected createFromForm(): ICerbacWhat {
    return {
      ...new CerbacWhat(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      cerbacEntity: this.editForm.get(['cerbacEntity'])!.value,
    };
  }
}
