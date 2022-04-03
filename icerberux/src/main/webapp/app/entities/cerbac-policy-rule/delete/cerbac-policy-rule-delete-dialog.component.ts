import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacPolicyRule } from '../cerbac-policy-rule.model';
import { CerbacPolicyRuleService } from '../service/cerbac-policy-rule.service';

@Component({
  templateUrl: './cerbac-policy-rule-delete-dialog.component.html',
})
export class CerbacPolicyRuleDeleteDialogComponent {
  cerbacPolicyRule?: ICerbacPolicyRule;

  constructor(protected cerbacPolicyRuleService: CerbacPolicyRuleService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacPolicyRuleService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
