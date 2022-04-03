import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICerbacPolicy, CerbacPolicy } from '../cerbac-policy.model';
import { CerbacPolicyService } from '../service/cerbac-policy.service';

@Component({
  selector: 'cpl-cerbac-policy-update',
  templateUrl: './cerbac-policy-update.component.html',
})
export class CerbacPolicyUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    pid: [null, [Validators.required]],
    priority: [],
  });

  constructor(protected cerbacPolicyService: CerbacPolicyService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacPolicy }) => {
      this.updateForm(cerbacPolicy);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacPolicy = this.createFromForm();
    if (cerbacPolicy.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacPolicyService.update(cerbacPolicy));
    } else {
      this.subscribeToSaveResponse(this.cerbacPolicyService.create(cerbacPolicy));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacPolicy>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
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

  protected updateForm(cerbacPolicy: ICerbacPolicy): void {
    this.editForm.patchValue({
      id: cerbacPolicy.id,
      pid: cerbacPolicy.pid,
      priority: cerbacPolicy.priority,
    });
  }

  protected createFromForm(): ICerbacPolicy {
    return {
      ...new CerbacPolicy(),
      id: this.editForm.get(['id'])!.value,
      pid: this.editForm.get(['pid'])!.value,
      priority: this.editForm.get(['priority'])!.value,
    };
  }
}
