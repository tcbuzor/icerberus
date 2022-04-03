import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhatAction } from '../cerbac-what-action.model';
import { CerbacWhatActionService } from '../service/cerbac-what-action.service';

@Component({
  templateUrl: './cerbac-what-action-delete-dialog.component.html',
})
export class CerbacWhatActionDeleteDialogComponent {
  cerbacWhatAction?: ICerbacWhatAction;

  constructor(protected cerbacWhatActionService: CerbacWhatActionService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacWhatActionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
