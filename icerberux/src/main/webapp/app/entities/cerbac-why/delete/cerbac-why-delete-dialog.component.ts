import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacWhy } from '../cerbac-why.model';
import { CerbacWhyService } from '../service/cerbac-why.service';

@Component({
  templateUrl: './cerbac-why-delete-dialog.component.html',
})
export class CerbacWhyDeleteDialogComponent {
  cerbacWhy?: ICerbacWhy;

  constructor(protected cerbacWhyService: CerbacWhyService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacWhyService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
