import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacPolicyComponent } from '../list/cerbac-policy.component';
import { CerbacPolicyDetailComponent } from '../detail/cerbac-policy-detail.component';
import { CerbacPolicyUpdateComponent } from '../update/cerbac-policy-update.component';
import { CerbacPolicyRoutingResolveService } from './cerbac-policy-routing-resolve.service';

const cerbacPolicyRoute: Routes = [
  {
    path: '',
    component: CerbacPolicyComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacPolicyDetailComponent,
    resolve: {
      cerbacPolicy: CerbacPolicyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacPolicyUpdateComponent,
    resolve: {
      cerbacPolicy: CerbacPolicyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacPolicyUpdateComponent,
    resolve: {
      cerbacPolicy: CerbacPolicyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacPolicyRoute)],
  exports: [RouterModule],
})
export class CerbacPolicyRoutingModule {}
