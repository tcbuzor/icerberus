import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhoProp } from '../cerbac-who-prop.model';
import { CerbacWhoPropService } from '../service/cerbac-who-prop.service';
import { CerbacWhoPropDeleteDialogComponent } from '../delete/cerbac-who-prop-delete-dialog.component';

@Component({
  selector: 'cpl-cerbac-who-prop',
  templateUrl: './cerbac-who-prop.component.html',
})
export class CerbacWhoPropComponent implements OnInit {
  cerbacWhoProps?: ICerbacWhoProp[];
  isLoading = false;

  constructor(protected cerbacWhoPropService: CerbacWhoPropService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cerbacWhoPropService.query().subscribe(
      (res: HttpResponse<ICerbacWhoProp[]>) => {
        this.isLoading = false;
        this.cerbacWhoProps = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICerbacWhoProp): number {
    return item.id!;
  }

  delete(cerbacWhoProp: ICerbacWhoProp): void {
    const modalRef = this.modalService.open(CerbacWhoPropDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cerbacWhoProp = cerbacWhoProp;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
