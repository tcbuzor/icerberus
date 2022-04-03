import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhat } from '../cerbac-what.model';
import { CerbacWhatService } from '../service/cerbac-what.service';

@Component({
  templateUrl: './cerbac-what-delete-dialog.component.html',
})
export class CerbacWhatDeleteDialogComponent {
  cerbacWhat?: ICerbacWhat;

  constructor(protected cerbacWhatService: CerbacWhatService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacWhatService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
