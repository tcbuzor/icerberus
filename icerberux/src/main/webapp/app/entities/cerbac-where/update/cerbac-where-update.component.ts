import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICerbacWhere, CerbacWhere } from '../cerbac-where.model';
import { CerbacWhereService } from '../service/cerbac-where.service';
import { ICerbacWhereOrigin } from 'app/entities/cerbac-where-origin/cerbac-where-origin.model';
import { CerbacWhereOriginService } from 'app/entities/cerbac-where-origin/service/cerbac-where-origin.service';
import { ICerbacWhereTarget } from 'app/entities/cerbac-where-target/cerbac-where-target.model';
import { CerbacWhereTargetService } from 'app/entities/cerbac-where-target/service/cerbac-where-target.service';

@Component({
  selector: 'cpl-cerbac-where-update',
  templateUrl: './cerbac-where-update.component.html',
})
export class CerbacWhereUpdateComponent implements OnInit {
  isSaving = false;

  cerbacWhereOriginsSharedCollection: ICerbacWhereOrigin[] = [];
  cerbacWhereTargetsSharedCollection: ICerbacWhereTarget[] = [];

  editForm = this.fb.group({
    id: [],
    origin: [],
    target: [],
  });

  constructor(
    protected cerbacWhereService: CerbacWhereService,
    protected cerbacWhereOriginService: CerbacWhereOriginService,
    protected cerbacWhereTargetService: CerbacWhereTargetService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhere }) => {
      this.updateForm(cerbacWhere);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacWhere = this.createFromForm();
    if (cerbacWhere.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacWhereService.update(cerbacWhere));
    } else {
      this.subscribeToSaveResponse(this.cerbacWhereService.create(cerbacWhere));
    }
  }

  trackCerbacWhereOriginById(index: number, item: ICerbacWhereOrigin): number {
    return item.id!;
  }

  trackCerbacWhereTargetById(index: number, item: ICerbacWhereTarget): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacWhere>>): void {
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

  protected updateForm(cerbacWhere: ICerbacWhere): void {
    this.editForm.patchValue({
      id: cerbacWhere.id,
      origin: cerbacWhere.origin,
      target: cerbacWhere.target,
    });

    this.cerbacWhereOriginsSharedCollection = this.cerbacWhereOriginService.addCerbacWhereOriginToCollectionIfMissing(
      this.cerbacWhereOriginsSharedCollection,
      cerbacWhere.origin
    );
    this.cerbacWhereTargetsSharedCollection = this.cerbacWhereTargetService.addCerbacWhereTargetToCollectionIfMissing(
      this.cerbacWhereTargetsSharedCollection,
      cerbacWhere.target
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cerbacWhereOriginService
      .query()
      .pipe(map((res: HttpResponse<ICerbacWhereOrigin[]>) => res.body ?? []))
      .pipe(
        map((cerbacWhereOrigins: ICerbacWhereOrigin[]) =>
          this.cerbacWhereOriginService.addCerbacWhereOriginToCollectionIfMissing(cerbacWhereOrigins, this.editForm.get('origin')!.value)
        )
      )
      .subscribe((cerbacWhereOrigins: ICerbacWhereOrigin[]) => (this.cerbacWhereOriginsSharedCollection = cerbacWhereOrigins));

    this.cerbacWhereTargetService
      .query()
      .pipe(map((res: HttpResponse<ICerbacWhereTarget[]>) => res.body ?? []))
      .pipe(
        map((cerbacWhereTargets: ICerbacWhereTarget[]) =>
          this.cerbacWhereTargetService.addCerbacWhereTargetToCollectionIfMissing(cerbacWhereTargets, this.editForm.get('target')!.value)
        )
      )
      .subscribe((cerbacWhereTargets: ICerbacWhereTarget[]) => (this.cerbacWhereTargetsSharedCollection = cerbacWhereTargets));
  }

  protected createFromForm(): ICerbacWhere {
    return {
      ...new CerbacWhere(),
      id: this.editForm.get(['id'])!.value,
      origin: this.editForm.get(['origin'])!.value,
      target: this.editForm.get(['target'])!.value,
    };
  }
}
