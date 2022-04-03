import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CerbacPolicyRuleComponent } from './list/cerbac-policy-rule.component';
import { CerbacPolicyRuleDetailComponent } from './detail/cerbac-policy-rule-detail.component';
import { CerbacPolicyRuleUpdateComponent } from './update/cerbac-policy-rule-update.component';
import { CerbacPolicyRuleDeleteDialogComponent } from './delete/cerbac-policy-rule-delete-dialog.component';
import { CerbacPolicyRuleRoutingModule } from './route/cerbac-policy-rule-routing.module';

@NgModule({
  imports: [SharedModule, CerbacPolicyRuleRoutingModule],
  declarations: [
    CerbacPolicyRuleComponent,
    CerbacPolicyRuleDetailComponent,
    CerbacPolicyRuleUpdateComponent,
    CerbacPolicyRuleDeleteDialogComponent,
  ],
  entryComponents: [CerbacPolicyRuleDeleteDialogComponent],
})
export class CerbacPolicyRuleModule {}
