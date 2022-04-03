import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacActionComponent } from './list/cerbac-action.component';
import { CerbacActionDetailComponent } from './detail/cerbac-action-detail.component';
import { CerbacActionUpdateComponent } from './update/cerbac-action-update.component';
import { CerbacActionDeleteDialogComponent } from './delete/cerbac-action-delete-dialog.component';
import { CerbacActionRoutingModule } from './route/cerbac-action-routing.module';

@NgModule({
  imports: [SharedModule, CerbacActionRoutingModule],
  declarations: [CerbacActionComponent, CerbacActionDetailComponent, CerbacActionUpdateComponent, CerbacActionDeleteDialogComponent],
  entryComponents: [CerbacActionDeleteDialogComponent],
})
export class CerbacActionModule {}
