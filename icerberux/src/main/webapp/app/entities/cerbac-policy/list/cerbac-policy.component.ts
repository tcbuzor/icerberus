import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacPolicy } from '../cerbac-policy.model';
import { CerbacPolicyService } from '../service/cerbac-policy.service';
import { CerbacPolicyDeleteDialogComponent } from '../delete/cerbac-policy-delete-dialog.component';

@Component({
  selector: 'cpl-cerbac-policy',
  templateUrl: './cerbac-policy.component.html',
})
export class CerbacPolicyComponent implements OnInit {
  cerbacPolicies?: ICerbacPolicy[];
  isLoading = false;

  constructor(protected cerbacPolicyService: CerbacPolicyService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cerbacPolicyService.query().subscribe({
      next: (res: HttpResponse<ICerbacPolicy[]>) => {
        this.isLoading = false;
        this.cerbacPolicies = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICerbacPolicy): number {
    return item.id!;
  }

  delete(cerbacPolicy: ICerbacPolicy): void {
    const modalRef = this.modalService.open(CerbacPolicyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cerbacPolicy = cerbacPolicy;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
