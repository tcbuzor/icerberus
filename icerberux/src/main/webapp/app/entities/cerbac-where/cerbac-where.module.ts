import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacWhereComponent } from './list/cerbac-where.component';
import { CerbacWhereDetailComponent } from './detail/cerbac-where-detail.component';
import { CerbacWhereUpdateComponent } from './update/cerbac-where-update.component';
import { CerbacWhereDeleteDialogComponent } from './delete/cerbac-where-delete-dialog.component';
import { CerbacWhereRoutingModule } from './route/cerbac-where-routing.module';

@NgModule({
  imports: [SharedModule, CerbacWhereRoutingModule],
  declarations: [CerbacWhereComponent, CerbacWhereDetailComponent, CerbacWhereUpdateComponent, CerbacWhereDeleteDialogComponent],
  entryComponents: [CerbacWhereDeleteDialogComponent],
})
export class CerbacWhereModule {}
