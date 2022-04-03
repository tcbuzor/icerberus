import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICerbacWhatAction, CerbacWhatAction } from '../cerbac-what-action.model';
import { CerbacWhatActionService } from '../service/cerbac-what-action.service';
import { ICerbacWhat } from 'app/entities/cerbac-what/cerbac-what.model';
import { CerbacWhatService } from 'app/entities/cerbac-what/service/cerbac-what.service';
import { ICerbacAction } from 'app/entities/cerbac-action/cerbac-action.model';
import { CerbacActionService } from 'app/entities/cerbac-action/service/cerbac-action.service';

@Component({
  selector: 'cpl-cerbac-what-action-update',
  templateUrl: './cerbac-what-action-update.component.html',
})
export class CerbacWhatActionUpdateComponent implements OnInit {
  isSaving = false;

  cerbacWhatsSharedCollection: ICerbacWhat[] = [];
  cerbacActionsSharedCollection: ICerbacAction[] = [];

  editForm = this.fb.group({
    id: [],
    cebacWhat: [],
    cebacAction: [],
  });

  constructor(
    protected cerbacWhatActionService: CerbacWhatActionService,
    protected cerbacWhatService: CerbacWhatService,
    protected cerbacActionService: CerbacActionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhatAction }) => {
      this.updateForm(cerbacWhatAction);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacWhatAction = this.createFromForm();
    if (cerbacWhatAction.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacWhatActionService.update(cerbacWhatAction));
    } else {
      this.subscribeToSaveResponse(this.cerbacWhatActionService.create(cerbacWhatAction));
    }
  }

  trackCerbacWhatById(index: number, item: ICerbacWhat): number {
    return item.id!;
  }

  trackCerbacActionById(index: number, item: ICerbacAction): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacWhatAction>>): void {
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

  protected updateForm(cerbacWhatAction: ICerbacWhatAction): void {
    this.editForm.patchValue({
      id: cerbacWhatAction.id,
      cebacWhat: cerbacWhatAction.cebacWhat,
      cebacAction: cerbacWhatAction.cebacAction,
    });

    this.cerbacWhatsSharedCollection = this.cerbacWhatService.addCerbacWhatToCollectionIfMissing(
      this.cerbacWhatsSharedCollection,
      cerbacWhatAction.cebacWhat
    );
    this.cerbacActionsSharedCollection = this.cerbacActionService.addCerbacActionToCollectionIfMissing(
      this.cerbacActionsSharedCollection,
      cerbacWhatAction.cebacAction
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cerbacWhatService
      .query()
      .pipe(map((res: HttpResponse<ICerbacWhat[]>) => res.body ?? []))
      .pipe(
        map((cerbacWhats: ICerbacWhat[]) =>
          this.cerbacWhatService.addCerbacWhatToCollectionIfMissing(cerbacWhats, this.editForm.get('cebacWhat')!.value)
        )
      )
      .subscribe((cerbacWhats: ICerbacWhat[]) => (this.cerbacWhatsSharedCollection = cerbacWhats));

    this.cerbacActionService
      .query()
      .pipe(map((res: HttpResponse<ICerbacAction[]>) => res.body ?? []))
      .pipe(
        map((cerbacActions: ICerbacAction[]) =>
          this.cerbacActionService.addCerbacActionToCollectionIfMissing(cerbacActions, this.editForm.get('cebacAction')!.value)
        )
      )
      .subscribe((cerbacActions: ICerbacAction[]) => (this.cerbacActionsSharedCollection = cerbacActions));
  }

  protected createFromForm(): ICerbacWhatAction {
    return {
      ...new CerbacWhatAction(),
      id: this.editForm.get(['id'])!.value,
      cebacWhat: this.editForm.get(['cebacWhat'])!.value,
      cebacAction: this.editForm.get(['cebacAction'])!.value,
    };
  }
}
