import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhereTarget } from '../cerbac-where-target.model';
import { CerbacWhereTargetService } from '../service/cerbac-where-target.service';

@Component({
  templateUrl: './cerbac-where-target-delete-dialog.component.html',
})
export class CerbacWhereTargetDeleteDialogComponent {
  cerbacWhereTarget?: ICerbacWhereTarget;

  constructor(protected cerbacWhereTargetService: CerbacWhereTargetService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacWhereTargetService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
