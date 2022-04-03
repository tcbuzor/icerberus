import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhereOrigin } from '../cerbac-where-origin.model';
import { CerbacWhereOriginService } from '../service/cerbac-where-origin.service';
import { CerbacWhereOriginDeleteDialogComponent } from '../delete/cerbac-where-origin-delete-dialog.component';

@Component({
  selector: 'cpl-cerbac-where-origin',
  templateUrl: './cerbac-where-origin.component.html',
})
export class CerbacWhereOriginComponent implements OnInit {
  cerbacWhereOrigins?: ICerbacWhereOrigin[];
  isLoading = false;

  constructor(protected cerbacWhereOriginService: CerbacWhereOriginService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cerbacWhereOriginService.query().subscribe(
      (res: HttpResponse<ICerbacWhereOrigin[]>) => {
        this.isLoading = false;
        this.cerbacWhereOrigins = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICerbacWhereOrigin): number {
    return item.id!;
  }

  delete(cerbacWhereOrigin: ICerbacWhereOrigin): void {
    const modalRef = this.modalService.open(CerbacWhereOriginDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cerbacWhereOrigin = cerbacWhereOrigin;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
