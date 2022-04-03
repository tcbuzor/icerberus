import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhere } from '../cerbac-where.model';
import { CerbacWhereService } from '../service/cerbac-where.service';
import { CerbacWhereDeleteDialogComponent } from '../delete/cerbac-where-delete-dialog.component';

@Component({
  selector: 'cpl-cerbac-where',
  templateUrl: './cerbac-where.component.html',
})
export class CerbacWhereComponent implements OnInit {
  cerbacWheres?: ICerbacWhere[];
  isLoading = false;

  constructor(protected cerbacWhereService: CerbacWhereService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cerbacWhereService.query().subscribe(
      (res: HttpResponse<ICerbacWhere[]>) => {
        this.isLoading = false;
        this.cerbacWheres = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICerbacWhere): number {
    return item.id!;
  }

  delete(cerbacWhere: ICerbacWhere): void {
    const modalRef = this.modalService.open(CerbacWhereDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cerbacWhere = cerbacWhere;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
