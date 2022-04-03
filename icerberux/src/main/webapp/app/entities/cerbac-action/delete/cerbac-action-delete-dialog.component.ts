import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacAction } from '../cerbac-action.model';
import { CerbacActionService } from '../service/cerbac-action.service';

@Component({
  templateUrl: './cerbac-action-delete-dialog.component.html',
})
export class CerbacActionDeleteDialogComponent {
  cerbacAction?: ICerbacAction;

  constructor(protected cerbacActionService: CerbacActionService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacActionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
