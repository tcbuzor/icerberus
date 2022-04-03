import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacEntityPropComponent } from './list/cerbac-entity-prop.component';
import { CerbacEntityPropDetailComponent } from './detail/cerbac-entity-prop-detail.component';
import { CerbacEntityPropUpdateComponent } from './update/cerbac-entity-prop-update.component';
import { CerbacEntityPropDeleteDialogComponent } from './delete/cerbac-entity-prop-delete-dialog.component';
import { CerbacEntityPropRoutingModule } from './route/cerbac-entity-prop-routing.module';

@NgModule({
  imports: [SharedModule, CerbacEntityPropRoutingModule],
  declarations: [
    CerbacEntityPropComponent,
    CerbacEntityPropDetailComponent,
    CerbacEntityPropUpdateComponent,
    CerbacEntityPropDeleteDialogComponent,
  ],
  entryComponents: [CerbacEntityPropDeleteDialogComponent],
})
export class CerbacEntityPropModule {}
