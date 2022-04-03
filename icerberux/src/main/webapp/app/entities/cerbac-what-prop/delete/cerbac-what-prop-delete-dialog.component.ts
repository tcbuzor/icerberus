import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhatProp } from '../cerbac-what-prop.model';
import { CerbacWhatPropService } from '../service/cerbac-what-prop.service';

@Component({
  templateUrl: './cerbac-what-prop-delete-dialog.component.html',
})
export class CerbacWhatPropDeleteDialogComponent {
  cerbacWhatProp?: ICerbacWhatProp;

  constructor(protected cerbacWhatPropService: CerbacWhatPropService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacWhatPropService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
