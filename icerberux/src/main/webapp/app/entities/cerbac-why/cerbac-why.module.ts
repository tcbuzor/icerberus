import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacWhyComponent } from './list/cerbac-why.component';
import { CerbacWhyDetailComponent } from './detail/cerbac-why-detail.component';
import { CerbacWhyUpdateComponent } from './update/cerbac-why-update.component';
import { CerbacWhyDeleteDialogComponent } from './delete/cerbac-why-delete-dialog.component';
import { CerbacWhyRoutingModule } from './route/cerbac-why-routing.module';

@NgModule({
  imports: [SharedModule, CerbacWhyRoutingModule],
  declarations: [CerbacWhyComponent, CerbacWhyDetailComponent, CerbacWhyUpdateComponent, CerbacWhyDeleteDialogComponent],
  entryComponents: [CerbacWhyDeleteDialogComponent],
})
export class CerbacWhyModule {}
