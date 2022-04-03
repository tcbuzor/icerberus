import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacOntology } from '../cerbac-ontology.model';
import { CerbacOntologyService } from '../service/cerbac-ontology.service';
import { CerbacOntologyDeleteDialogComponent } from '../delete/cerbac-ontology-delete-dialog.component';

@Component({
  selector: 'cpl-cerbac-ontology',
  templateUrl: './cerbac-ontology.component.html',
})
export class CerbacOntologyComponent implements OnInit {
  cerbacOntologies?: ICerbacOntology[];
  isLoading = false;

  constructor(protected cerbacOntologyService: CerbacOntologyService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cerbacOntologyService.query().subscribe({
      next: (res: HttpResponse<ICerbacOntology[]>) => {
        this.isLoading = false;
        this.cerbacOntologies = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICerbacOntology): number {
    return item.id!;
  }

  delete(cerbacOntology: ICerbacOntology): void {
    const modalRef = this.modalService.open(CerbacOntologyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cerbacOntology = cerbacOntology;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
