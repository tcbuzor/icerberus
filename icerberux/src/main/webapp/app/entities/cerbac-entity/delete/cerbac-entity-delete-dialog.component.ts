import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacEntity } from '../../../shared/model/cerbac-entity.model';
import { CerbacEntityService } from '../../../shared/service/cerbac-entity.service';

@Component({
  templateUrl: './cerbac-entity-delete-dialog.component.html',
})
export class CerbacEntityDeleteDialogComponent {
  cerbacEntity?: ICerbacEntity;

  constructor(protected cerbacEntityService: CerbacEntityService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacEntityService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
