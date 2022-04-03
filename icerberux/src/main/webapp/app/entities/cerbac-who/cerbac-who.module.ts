import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacWhoComponent } from './list/cerbac-who.component';
import { CerbacWhoDetailComponent } from './detail/cerbac-who-detail.component';
import { CerbacWhoUpdateComponent } from './update/cerbac-who-update.component';
import { CerbacWhoDeleteDialogComponent } from './delete/cerbac-who-delete-dialog.component';
import { CerbacWhoRoutingModule } from './route/cerbac-who-routing.module';

@NgModule({
  imports: [SharedModule, CerbacWhoRoutingModule],
  declarations: [CerbacWhoComponent, CerbacWhoDetailComponent, CerbacWhoUpdateComponent, CerbacWhoDeleteDialogComponent],
  entryComponents: [CerbacWhoDeleteDialogComponent],
})
export class CerbacWhoModule {}
