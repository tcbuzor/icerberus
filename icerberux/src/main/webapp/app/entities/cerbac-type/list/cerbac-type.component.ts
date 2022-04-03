import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacType } from '../cerbac-type.model';
import { CerbacTypeService } from '../service/cerbac-type.service';
import { CerbacTypeDeleteDialogComponent } from '../delete/cerbac-type-delete-dialog.component';

@Component({
  selector: 'cpl-cerbac-type',
  templateUrl: './cerbac-type.component.html',
})
export class CerbacTypeComponent implements OnInit {
  cerbacTypes?: ICerbacType[];
  isLoading = false;

  constructor(protected cerbacTypeService: CerbacTypeService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cerbacTypeService.query().subscribe(
      (res: HttpResponse<ICerbacType[]>) => {
        this.isLoading = false;
        this.cerbacTypes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICerbacType): number {
    return item.id!;
  }

  delete(cerbacType: ICerbacType): void {
    const modalRef = this.modalService.open(CerbacTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cerbacType = cerbacType;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
