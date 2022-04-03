import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacEntityProp } from '../cerbac-entity-prop.model';
import { CerbacEntityPropService } from '../service/cerbac-entity-prop.service';

@Component({
  templateUrl: './cerbac-entity-prop-delete-dialog.component.html',
})
export class CerbacEntityPropDeleteDialogComponent {
  cerbacEntityProp?: ICerbacEntityProp;

  constructor(protected cerbacEntityPropService: CerbacEntityPropService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacEntityPropService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
