import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacWhoPropComponent } from './list/cerbac-who-prop.component';
import { CerbacWhoPropDetailComponent } from './detail/cerbac-who-prop-detail.component';
import { CerbacWhoPropUpdateComponent } from './update/cerbac-who-prop-update.component';
import { CerbacWhoPropDeleteDialogComponent } from './delete/cerbac-who-prop-delete-dialog.component';
import { CerbacWhoPropRoutingModule } from './route/cerbac-who-prop-routing.module';

@NgModule({
  imports: [SharedModule, CerbacWhoPropRoutingModule],
  declarations: [CerbacWhoPropComponent, CerbacWhoPropDetailComponent, CerbacWhoPropUpdateComponent, CerbacWhoPropDeleteDialogComponent],
  entryComponents: [CerbacWhoPropDeleteDialogComponent],
})
export class CerbacWhoPropModule {}
