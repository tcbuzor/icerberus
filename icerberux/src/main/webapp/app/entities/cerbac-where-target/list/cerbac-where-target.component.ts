import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhereTarget } from '../cerbac-where-target.model';
import { CerbacWhereTargetService } from '../service/cerbac-where-target.service';
import { CerbacWhereTargetDeleteDialogComponent } from '../delete/cerbac-where-target-delete-dialog.component';

@Component({
  selector: 'cpl-cerbac-where-target',
  templateUrl: './cerbac-where-target.component.html',
})
export class CerbacWhereTargetComponent implements OnInit {
  cerbacWhereTargets?: ICerbacWhereTarget[];
  isLoading = false;

  constructor(protected cerbacWhereTargetService: CerbacWhereTargetService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cerbacWhereTargetService.query().subscribe(
      (res: HttpResponse<ICerbacWhereTarget[]>) => {
        this.isLoading = false;
        this.cerbacWhereTargets = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICerbacWhereTarget): number {
    return item.id!;
  }

  delete(cerbacWhereTarget: ICerbacWhereTarget): void {
    const modalRef = this.modalService.open(CerbacWhereTargetDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cerbacWhereTarget = cerbacWhereTarget;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
