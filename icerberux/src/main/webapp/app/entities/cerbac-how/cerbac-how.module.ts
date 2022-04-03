import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacHowComponent } from './list/cerbac-how.component';
import { CerbacHowDetailComponent } from './detail/cerbac-how-detail.component';
import { CerbacHowUpdateComponent } from './update/cerbac-how-update.component';
import { CerbacHowDeleteDialogComponent } from './delete/cerbac-how-delete-dialog.component';
import { CerbacHowRoutingModule } from './route/cerbac-how-routing.module';

@NgModule({
  imports: [SharedModule, CerbacHowRoutingModule],
  declarations: [CerbacHowComponent, CerbacHowDetailComponent, CerbacHowUpdateComponent, CerbacHowDeleteDialogComponent],
  entryComponents: [CerbacHowDeleteDialogComponent],
})
export class CerbacHowModule {}
