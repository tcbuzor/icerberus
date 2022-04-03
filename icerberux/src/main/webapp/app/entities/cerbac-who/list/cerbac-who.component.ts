import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWho } from '../cerbac-who.model';
import { CerbacWhoService } from '../service/cerbac-who.service';
import { CerbacWhoDeleteDialogComponent } from '../delete/cerbac-who-delete-dialog.component';

@Component({
  selector: 'cpl-cerbac-who',
  templateUrl: './cerbac-who.component.html',
})
export class CerbacWhoComponent implements OnInit {
  cerbacWhos?: ICerbacWho[];
  isLoading = false;

  constructor(protected cerbacWhoService: CerbacWhoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cerbacWhoService.query().subscribe(
      (res: HttpResponse<ICerbacWho[]>) => {
        this.isLoading = false;
        this.cerbacWhos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICerbacWho): number {
    return item.id!;
  }

  delete(cerbacWho: ICerbacWho): void {
    const modalRef = this.modalService.open(CerbacWhoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cerbacWho = cerbacWho;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
