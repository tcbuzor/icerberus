import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhy } from '../cerbac-why.model';
import { CerbacWhyService } from '../service/cerbac-why.service';
import { CerbacWhyDeleteDialogComponent } from '../delete/cerbac-why-delete-dialog.component';

@Component({
  selector: 'cpl-cerbac-why',
  templateUrl: './cerbac-why.component.html',
})
export class CerbacWhyComponent implements OnInit {
  cerbacWhies?: ICerbacWhy[];
  isLoading = false;

  constructor(protected cerbacWhyService: CerbacWhyService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cerbacWhyService.query().subscribe(
      (res: HttpResponse<ICerbacWhy[]>) => {
        this.isLoading = false;
        this.cerbacWhies = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICerbacWhy): number {
    return item.id!;
  }

  delete(cerbacWhy: ICerbacWhy): void {
    const modalRef = this.modalService.open(CerbacWhyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cerbacWhy = cerbacWhy;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
