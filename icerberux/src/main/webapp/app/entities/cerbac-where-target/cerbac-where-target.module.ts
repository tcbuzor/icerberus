import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacWhereTargetComponent } from './list/cerbac-where-target.component';
import { CerbacWhereTargetDetailComponent } from './detail/cerbac-where-target-detail.component';
import { CerbacWhereTargetUpdateComponent } from './update/cerbac-where-target-update.component';
import { CerbacWhereTargetDeleteDialogComponent } from './delete/cerbac-where-target-delete-dialog.component';
import { CerbacWhereTargetRoutingModule } from './route/cerbac-where-target-routing.module';

@NgModule({
  imports: [SharedModule, CerbacWhereTargetRoutingModule],
  declarations: [
    CerbacWhereTargetComponent,
    CerbacWhereTargetDetailComponent,
    CerbacWhereTargetUpdateComponent,
    CerbacWhereTargetDeleteDialogComponent,
  ],
  entryComponents: [CerbacWhereTargetDeleteDialogComponent],
})
export class CerbacWhereTargetModule {}
