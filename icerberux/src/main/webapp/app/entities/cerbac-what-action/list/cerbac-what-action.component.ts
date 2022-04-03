import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhatAction } from '../cerbac-what-action.model';
import { CerbacWhatActionService } from '../service/cerbac-what-action.service';
import { CerbacWhatActionDeleteDialogComponent } from '../delete/cerbac-what-action-delete-dialog.component';

@Component({
  selector: 'cpl-cerbac-what-action',
  templateUrl: './cerbac-what-action.component.html',
})
export class CerbacWhatActionComponent implements OnInit {
  cerbacWhatActions?: ICerbacWhatAction[];
  isLoading = false;

  constructor(protected cerbacWhatActionService: CerbacWhatActionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cerbacWhatActionService.query().subscribe(
      (res: HttpResponse<ICerbacWhatAction[]>) => {
        this.isLoading = false;
        this.cerbacWhatActions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICerbacWhatAction): number {
    return item.id!;
  }

  delete(cerbacWhatAction: ICerbacWhatAction): void {
    const modalRef = this.modalService.open(CerbacWhatActionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cerbacWhatAction = cerbacWhatAction;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
