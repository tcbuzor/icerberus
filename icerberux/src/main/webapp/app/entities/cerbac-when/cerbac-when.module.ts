import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacWhenComponent } from './list/cerbac-when.component';
import { CerbacWhenDetailComponent } from './detail/cerbac-when-detail.component';
import { CerbacWhenUpdateComponent } from './update/cerbac-when-update.component';
import { CerbacWhenDeleteDialogComponent } from './delete/cerbac-when-delete-dialog.component';
import { CerbacWhenRoutingModule } from './route/cerbac-when-routing.module';

@NgModule({
  imports: [SharedModule, CerbacWhenRoutingModule],
  declarations: [CerbacWhenComponent, CerbacWhenDetailComponent, CerbacWhenUpdateComponent, CerbacWhenDeleteDialogComponent],
  entryComponents: [CerbacWhenDeleteDialogComponent],
})
export class CerbacWhenModule {}
