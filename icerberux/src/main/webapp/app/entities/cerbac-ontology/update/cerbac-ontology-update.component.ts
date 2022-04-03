import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICerbacOntology, CerbacOntology } from '../cerbac-ontology.model';
import { CerbacOntologyService } from '../service/cerbac-ontology.service';

@Component({
  selector: 'cpl-cerbac-ontology-update',
  templateUrl: './cerbac-ontology-update.component.html',
})
export class CerbacOntologyUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    source: [null, [Validators.required]],
  });

  constructor(
    protected cerbacOntologyService: CerbacOntologyService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacOntology }) => {
      this.updateForm(cerbacOntology);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cerbacOntology = this.createFromForm();
    if (cerbacOntology.id !== undefined) {
      this.subscribeToSaveResponse(this.cerbacOntologyService.update(cerbacOntology));
    } else {
      this.subscribeToSaveResponse(this.cerbacOntologyService.create(cerbacOntology));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICerbacOntology>>): void {
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

  protected updateForm(cerbacOntology: ICerbacOntology): void {
    this.editForm.patchValue({
      id: cerbacOntology.id,
      source: cerbacOntology.source,
    });
  }

  protected createFromForm(): ICerbacOntology {
    return {
      ...new CerbacOntology(),
      id: this.editForm.get(['id'])!.value,
      source: this.editForm.get(['source'])!.value,
    };
  }
}
