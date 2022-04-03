import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacPolicy } from '../cerbac-policy.model';
import { CerbacPolicyService } from '../service/cerbac-policy.service';

@Component({
  templateUrl: './cerbac-policy-delete-dialog.component.html',
})
export class CerbacPolicyDeleteDialogComponent {
  cerbacPolicy?: ICerbacPolicy;

  constructor(protected cerbacPolicyService: CerbacPolicyService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacPolicyService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
