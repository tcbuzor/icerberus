import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacHow } from '../cerbac-how.model';
import { CerbacHowService } from '../service/cerbac-how.service';
import { CerbacHowDeleteDialogComponent } from '../delete/cerbac-how-delete-dialog.component';

@Component({
  selector: 'cpl-cerbac-how',
  templateUrl: './cerbac-how.component.html',
})
export class CerbacHowComponent implements OnInit {
  cerbacHows?: ICerbacHow[];
  isLoading = false;

  constructor(protected cerbacHowService: CerbacHowService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cerbacHowService.query().subscribe(
      (res: HttpResponse<ICerbacHow[]>) => {
        this.isLoading = false;
        this.cerbacHows = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICerbacHow): number {
    return item.id!;
  }

  delete(cerbacHow: ICerbacHow): void {
    const modalRef = this.modalService.open(CerbacHowDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cerbacHow = cerbacHow;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
