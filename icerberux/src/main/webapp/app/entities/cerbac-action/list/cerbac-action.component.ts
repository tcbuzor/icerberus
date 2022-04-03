import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacAction } from '../cerbac-action.model';
import { CerbacActionService } from '../service/cerbac-action.service';
import { CerbacActionDeleteDialogComponent } from '../delete/cerbac-action-delete-dialog.component';

@Component({
  selector: 'cpl-cerbac-action',
  templateUrl: './cerbac-action.component.html',
})
export class CerbacActionComponent implements OnInit {
  cerbacActions?: ICerbacAction[];
  isLoading = false;

  constructor(protected cerbacActionService: CerbacActionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cerbacActionService.query().subscribe(
      (res: HttpResponse<ICerbacAction[]>) => {
        this.isLoading = false;
        this.cerbacActions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICerbacAction): number {
    return item.id!;
  }

  delete(cerbacAction: ICerbacAction): void {
    const modalRef = this.modalService.open(CerbacActionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cerbacAction = cerbacAction;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
