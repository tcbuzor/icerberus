import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacWhatComponent } from './list/cerbac-what.component';
import { CerbacWhatDetailComponent } from './detail/cerbac-what-detail.component';
import { CerbacWhatUpdateComponent } from './update/cerbac-what-update.component';
import { CerbacWhatDeleteDialogComponent } from './delete/cerbac-what-delete-dialog.component';
import { CerbacWhatRoutingModule } from './route/cerbac-what-routing.module';

@NgModule({
  imports: [SharedModule, CerbacWhatRoutingModule],
  declarations: [CerbacWhatComponent, CerbacWhatDetailComponent, CerbacWhatUpdateComponent, CerbacWhatDeleteDialogComponent],
  entryComponents: [CerbacWhatDeleteDialogComponent],
})
export class CerbacWhatModule {}
