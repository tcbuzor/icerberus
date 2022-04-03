import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhen } from '../cerbac-when.model';
import { CerbacWhenService } from '../service/cerbac-when.service';

@Component({
  templateUrl: './cerbac-when-delete-dialog.component.html',
})
export class CerbacWhenDeleteDialogComponent {
  cerbacWhen?: ICerbacWhen;

  constructor(protected cerbacWhenService: CerbacWhenService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacWhenService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
