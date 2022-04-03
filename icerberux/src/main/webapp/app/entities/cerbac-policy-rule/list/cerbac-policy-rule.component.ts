import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacPolicyRule } from '../cerbac-policy-rule.model';
import { CerbacPolicyRuleService } from '../service/cerbac-policy-rule.service';
import { CerbacPolicyRuleDeleteDialogComponent } from '../delete/cerbac-policy-rule-delete-dialog.component';

@Component({
  selector: 'cpl-cerbac-policy-rule',
  templateUrl: './cerbac-policy-rule.component.html',
})
export class CerbacPolicyRuleComponent implements OnInit {
  cerbacPolicyRules?: ICerbacPolicyRule[];
  isLoading = false;

  constructor(protected cerbacPolicyRuleService: CerbacPolicyRuleService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cerbacPolicyRuleService.query().subscribe(
      (res: HttpResponse<ICerbacPolicyRule[]>) => {
        this.isLoading = false;
        this.cerbacPolicyRules = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICerbacPolicyRule): number {
    return item.id!;
  }

  delete(cerbacPolicyRule: ICerbacPolicyRule): void {
    const modalRef = this.modalService.open(CerbacPolicyRuleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cerbacPolicyRule = cerbacPolicyRule;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
