import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhoProp } from '../cerbac-who-prop.model';
import { CerbacWhoPropService } from '../service/cerbac-who-prop.service';

@Component({
  templateUrl: './cerbac-who-prop-delete-dialog.component.html',
})
export class CerbacWhoPropDeleteDialogComponent {
  cerbacWhoProp?: ICerbacWhoProp;

  constructor(protected cerbacWhoPropService: CerbacWhoPropService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacWhoPropService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
