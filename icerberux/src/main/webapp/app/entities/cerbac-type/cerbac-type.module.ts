import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacTypeComponent } from './list/cerbac-type.component';
import { CerbacTypeDetailComponent } from './detail/cerbac-type-detail.component';
import { CerbacTypeUpdateComponent } from './update/cerbac-type-update.component';
import { CerbacTypeDeleteDialogComponent } from './delete/cerbac-type-delete-dialog.component';
import { CerbacTypeRoutingModule } from './route/cerbac-type-routing.module';

@NgModule({
  imports: [SharedModule, CerbacTypeRoutingModule],
  declarations: [CerbacTypeComponent, CerbacTypeDetailComponent, CerbacTypeUpdateComponent, CerbacTypeDeleteDialogComponent],
  entryComponents: [CerbacTypeDeleteDialogComponent],
})
export class CerbacTypeModule {}
