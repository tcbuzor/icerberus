import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacEntityComponent } from './list/cerbac-entity.component';
import { CerbacEntityDetailComponent } from './detail/cerbac-entity-detail.component';
import { CerbacEntityUpdateComponent } from './update/cerbac-entity-update.component';
import { CerbacEntityDeleteDialogComponent } from './delete/cerbac-entity-delete-dialog.component';
import { CerbacEntityRoutingModule } from './route/cerbac-entity-routing.module';

@NgModule({
  imports: [SharedModule, CerbacEntityRoutingModule],
  declarations: [CerbacEntityComponent, CerbacEntityDetailComponent, CerbacEntityUpdateComponent, CerbacEntityDeleteDialogComponent],
  entryComponents: [CerbacEntityDeleteDialogComponent],
})
export class CerbacEntityModule {}
