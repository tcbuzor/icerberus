import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhereOrigin } from '../cerbac-where-origin.model';
import { CerbacWhereOriginService } from '../service/cerbac-where-origin.service';

@Component({
  templateUrl: './cerbac-where-origin-delete-dialog.component.html',
})
export class CerbacWhereOriginDeleteDialogComponent {
  cerbacWhereOrigin?: ICerbacWhereOrigin;

  constructor(protected cerbacWhereOriginService: CerbacWhereOriginService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacWhereOriginService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
