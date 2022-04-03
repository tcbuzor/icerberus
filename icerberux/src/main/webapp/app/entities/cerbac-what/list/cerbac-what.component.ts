import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhat } from '../cerbac-what.model';
import { CerbacWhatService } from '../service/cerbac-what.service';
import { CerbacWhatDeleteDialogComponent } from '../delete/cerbac-what-delete-dialog.component';

@Component({
  selector: 'cpl-cerbac-what',
  templateUrl: './cerbac-what.component.html',
})
export class CerbacWhatComponent implements OnInit {
  cerbacWhats?: ICerbacWhat[];
  isLoading = false;

  constructor(protected cerbacWhatService: CerbacWhatService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cerbacWhatService.query().subscribe(
      (res: HttpResponse<ICerbacWhat[]>) => {
        this.isLoading = false;
        this.cerbacWhats = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICerbacWhat): number {
    return item.id!;
  }

  delete(cerbacWhat: ICerbacWhat): void {
    const modalRef = this.modalService.open(CerbacWhatDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cerbacWhat = cerbacWhat;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
