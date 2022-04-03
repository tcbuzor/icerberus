import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CerbacOntologyComponent } from './list/cerbac-ontology.component';
import { CerbacOntologyDetailComponent } from './detail/cerbac-ontology-detail.component';
import { CerbacOntologyUpdateComponent } from './update/cerbac-ontology-update.component';
import { CerbacOntologyDeleteDialogComponent } from './delete/cerbac-ontology-delete-dialog.component';
import { CerbacOntologyRoutingModule } from './route/cerbac-ontology-routing.module';

@NgModule({
  imports: [SharedModule, CerbacOntologyRoutingModule],
  declarations: [
    CerbacOntologyComponent,
    CerbacOntologyDetailComponent,
    CerbacOntologyUpdateComponent,
    CerbacOntologyDeleteDialogComponent,
  ],
  entryComponents: [CerbacOntologyDeleteDialogComponent],
})
export class CerbacOntologyModule {}
