import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICerbacWho, CerbacWho } from '../cerbac-who.model';
import { CerbacWhoService } from '../service/cerbac-who.service';
import { ICerbacEntity } from 'app/shared/model/cerbac-entity.model';
import { CerbacEntityService } from 'app/shared/service/cerbac-entity.service';

@Component({
  selector: 'cpl-cerbac-who-update',
  templateUrl: './cerbac-who-update.component.html',
})
export class CerbacWhoUpdateComponent implements OnInit {
  isSaving = false;

  cerbacEntitiesCollection: ICerbacEntity[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    cerbacEntity: [null, Validators.required],
  });

  constructor(
    protected cerbacWhoService: CerbacWhoService,
    protected cerbacEntityService: CerbacEntityService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWho }) => {
      this.updateForm(cerbacWho);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacWho = this.createFromForm();
    if (cerbacWho.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacWhoService.update(cerbacWho));
    } else {
      this.subscribeToSaveResponse(this.cerbacWhoService.create(cerbacWho));
    }
  }

  trackCerbacEntityById(index: number, item: ICerbacEntity): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacWho>>): void {
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

  protected updateForm(cerbacWho: ICerbacWho): void {
    this.editForm.patchValue({
      id: cerbacWho.id,
      name: cerbacWho.name,
      cerbacEntity: cerbacWho.cerbacEntity,
    });

    this.cerbacEntitiesCollection = this.cerbacEntityService.addCerbacEntityToCollectionIfMissing(
      this.cerbacEntitiesCollection,
      cerbacWho.cerbacEntity
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cerbacEntityService
      .query({ filter: 'cerbacwho-is-null' })
      .pipe(map((res: HttpResponse<ICerbacEntity[]>) => res.body ?? []))
      .pipe(
        map((cerbacEntities: ICerbacEntity[]) =>
          this.cerbacEntityService.addCerbacEntityToCollectionIfMissing(cerbacEntities, this.editForm.get('cerbacEntity')!.value)
        )
      )
      .subscribe((cerbacEntities: ICerbacEntity[]) => (this.cerbacEntitiesCollection = cerbacEntities));
  }

  protected createFromForm(): ICerbacWho {
    return {
      ...new CerbacWho(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      cerbacEntity: this.editForm.get(['cerbacEntity'])!.value,
    };
  }
}
