import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacWhatActionComponent } from './list/cerbac-what-action.component';
import { CerbacWhatActionDetailComponent } from './detail/cerbac-what-action-detail.component';
import { CerbacWhatActionUpdateComponent } from './update/cerbac-what-action-update.component';
import { CerbacWhatActionDeleteDialogComponent } from './delete/cerbac-what-action-delete-dialog.component';
import { CerbacWhatActionRoutingModule } from './route/cerbac-what-action-routing.module';

@NgModule({
  imports: [SharedModule, CerbacWhatActionRoutingModule],
  declarations: [
    CerbacWhatActionComponent,
    CerbacWhatActionDetailComponent,
    CerbacWhatActionUpdateComponent,
    CerbacWhatActionDeleteDialogComponent,
  ],
  entryComponents: [CerbacWhatActionDeleteDialogComponent],
})
export class CerbacWhatActionModule {}
