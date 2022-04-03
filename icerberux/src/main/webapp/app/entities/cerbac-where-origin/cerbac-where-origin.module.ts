import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacWhereOriginComponent } from './list/cerbac-where-origin.component';
import { CerbacWhereOriginDetailComponent } from './detail/cerbac-where-origin-detail.component';
import { CerbacWhereOriginUpdateComponent } from './update/cerbac-where-origin-update.component';
import { CerbacWhereOriginDeleteDialogComponent } from './delete/cerbac-where-origin-delete-dialog.component';
import { CerbacWhereOriginRoutingModule } from './route/cerbac-where-origin-routing.module';

@NgModule({
  imports: [SharedModule, CerbacWhereOriginRoutingModule],
  declarations: [
    CerbacWhereOriginComponent,
    CerbacWhereOriginDetailComponent,
    CerbacWhereOriginUpdateComponent,
    CerbacWhereOriginDeleteDialogComponent,
  ],
  entryComponents: [CerbacWhereOriginDeleteDialogComponent],
})
export class CerbacWhereOriginModule {}
