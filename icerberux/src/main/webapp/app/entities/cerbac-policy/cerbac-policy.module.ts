import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacPolicyComponent } from './list/cerbac-policy.component';
import { CerbacPolicyDetailComponent } from './detail/cerbac-policy-detail.component';
import { CerbacPolicyUpdateComponent } from './update/cerbac-policy-update.component';
import { CerbacPolicyDeleteDialogComponent } from './delete/cerbac-policy-delete-dialog.component';
import { CerbacPolicyRoutingModule } from './route/cerbac-policy-routing.module';

@NgModule({
  imports: [SharedModule, CerbacPolicyRoutingModule],
  declarations: [CerbacPolicyComponent, CerbacPolicyDetailComponent, CerbacPolicyUpdateComponent, CerbacPolicyDeleteDialogComponent],
  entryComponents: [CerbacPolicyDeleteDialogComponent],
})
export class CerbacPolicyModule {}
