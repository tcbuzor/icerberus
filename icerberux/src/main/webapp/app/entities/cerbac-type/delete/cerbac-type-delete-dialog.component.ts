import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacType } from '../cerbac-type.model';
import { CerbacTypeService } from '../service/cerbac-type.service';

@Component({
  templateUrl: './cerbac-type-delete-dialog.component.html',
})
export class CerbacTypeDeleteDialogComponent {
  cerbacType?: ICerbacType;

  constructor(protected cerbacTypeService: CerbacTypeService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
