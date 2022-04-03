import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacWhatPropComponent } from './list/cerbac-what-prop.component';
import { CerbacWhatPropDetailComponent } from './detail/cerbac-what-prop-detail.component';
import { CerbacWhatPropUpdateComponent } from './update/cerbac-what-prop-update.component';
import { CerbacWhatPropDeleteDialogComponent } from './delete/cerbac-what-prop-delete-dialog.component';
import { CerbacWhatPropRoutingModule } from './route/cerbac-what-prop-routing.module';

@NgModule({
  imports: [SharedModule, CerbacWhatPropRoutingModule],
  declarations: [
    CerbacWhatPropComponent,
    CerbacWhatPropDetailComponent,
    CerbacWhatPropUpdateComponent,
    CerbacWhatPropDeleteDialogComponent,
  ],
  entryComponents: [CerbacWhatPropDeleteDialogComponent],
})
export class CerbacWhatPropModule {}
