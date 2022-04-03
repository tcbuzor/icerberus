import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhen } from '../cerbac-when.model';
import { CerbacWhenService } from '../service/cerbac-when.service';
import { CerbacWhenDeleteDialogComponent } from '../delete/cerbac-when-delete-dialog.component';

@Component({
  selector: 'cpl-cerbac-when',
  templateUrl: './cerbac-when.component.html',
})
export class CerbacWhenComponent implements OnInit {
  cerbacWhens?: ICerbacWhen[];
  isLoading = false;

  constructor(protected cerbacWhenService: CerbacWhenService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cerbacWhenService.query().subscribe(
      (res: HttpResponse<ICerbacWhen[]>) => {
        this.isLoading = false;
        this.cerbacWhens = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICerbacWhen): number {
    return item.id!;
  }

  delete(cerbacWhen: ICerbacWhen): void {
    const modalRef = this.modalService.open(CerbacWhenDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cerbacWhen = cerbacWhen;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
