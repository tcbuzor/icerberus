import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacHow } from '../cerbac-how.model';
import { CerbacHowService } from '../service/cerbac-how.service';

@Component({
  templateUrl: './cerbac-how-delete-dialog.component.html',
})
export class CerbacHowDeleteDialogComponent {
  cerbacHow?: ICerbacHow;

  constructor(protected cerbacHowService: CerbacHowService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacHowService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
