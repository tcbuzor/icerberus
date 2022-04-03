import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWho } from '../cerbac-who.model';
import { CerbacWhoService } from '../service/cerbac-who.service';

@Component({
  templateUrl: './cerbac-who-delete-dialog.component.html',
})
export class CerbacWhoDeleteDialogComponent {
  cerbacWho?: ICerbacWho;

  constructor(protected cerbacWhoService: CerbacWhoService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacWhoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
