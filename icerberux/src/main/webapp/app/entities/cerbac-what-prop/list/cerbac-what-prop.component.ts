import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhatProp } from '../cerbac-what-prop.model';
import { CerbacWhatPropService } from '../service/cerbac-what-prop.service';
import { CerbacWhatPropDeleteDialogComponent } from '../delete/cerbac-what-prop-delete-dialog.component';

@Component({
  selector: 'cpl-cerbac-what-prop',
  templateUrl: './cerbac-what-prop.component.html',
})
export class CerbacWhatPropComponent implements OnInit {
  cerbacWhatProps?: ICerbacWhatProp[];
  isLoading = false;

  constructor(protected cerbacWhatPropService: CerbacWhatPropService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cerbacWhatPropService.query().subscribe(
      (res: HttpResponse<ICerbacWhatProp[]>) => {
        this.isLoading = false;
        this.cerbacWhatProps = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICerbacWhatProp): number {
    return item.id!;
  }

  delete(cerbacWhatProp: ICerbacWhatProp): void {
    const modalRef = this.modalService.open(CerbacWhatPropDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cerbacWhatProp = cerbacWhatProp;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
