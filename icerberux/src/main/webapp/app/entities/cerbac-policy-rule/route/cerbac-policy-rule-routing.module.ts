import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacPolicyRuleComponent } from '../list/cerbac-policy-rule.component';
import { CerbacPolicyRuleDetailComponent } from '../detail/cerbac-policy-rule-detail.component';
import { CerbacPolicyRuleUpdateComponent } from '../update/cerbac-policy-rule-update.component';
import { CerbacPolicyRuleRoutingResolveService } from './cerbac-policy-rule-routing-resolve.service';

const cerbacPolicyRuleRoute: Routes = [
  {
    path: '',
    component: CerbacPolicyRuleComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacPolicyRuleDetailComponent,
    resolve: {
      cerbacPolicyRule: CerbacPolicyRuleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacPolicyRuleUpdateComponent,
    resolve: {
      cerbacPolicyRule: CerbacPolicyRuleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacPolicyRuleUpdateComponent,
    resolve: {
      cerbacPolicyRule: CerbacPolicyRuleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacPolicyRuleRoute)],
  exports: [RouterModule],
})
export class CerbacPolicyRuleRoutingModule {}
