import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICerbacOntology } from '../cerbac-ontology.model';
import { CerbacOntologyService } from '../service/cerbac-ontology.service';

@Component({
  templateUrl: './cerbac-ontology-delete-dialog.component.html',
})
export class CerbacOntologyDeleteDialogComponent {
  cerbacOntology?: ICerbacOntology;

  constructor(protected cerbacOntologyService: CerbacOntologyService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cerbacOntologyService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
