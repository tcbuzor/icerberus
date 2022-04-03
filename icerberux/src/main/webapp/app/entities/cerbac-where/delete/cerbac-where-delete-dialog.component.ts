import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhere } from '../cerbac-where.model';
import { CerbacWhereService } from '../service/cerbac-where.service';

@Component({
  templateUrl: './cerbac-where-delete-dialog.component.html',
})
export class CerbacWhereDeleteDialogComponent {
  cerbacWhere?: ICerbacWhere;

  constructor(protected cerbacWhereService: CerbacWhereService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacWhereService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
