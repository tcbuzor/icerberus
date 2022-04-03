import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacWhereTargetComponent } from '../list/cerbac-where-target.component';
import { CerbacWhereTargetDetailComponent } from '../detail/cerbac-where-target-detail.component';
import { CerbacWhereTargetUpdateComponent } from '../update/cerbac-where-target-update.component';
import { CerbacWhereTargetRoutingResolveService } from './cerbac-where-target-routing-resolve.service';

const cerbacWhereTargetRoute: Routes = [
  {
    path: '',
    component: CerbacWhereTargetComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacWhereTargetDetailComponent,
    resolve: {
      cerbacWhereTarget: CerbacWhereTargetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacWhereTargetUpdateComponent,
    resolve: {
      cerbacWhereTarget: CerbacWhereTargetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacWhereTargetUpdateComponent,
    resolve: {
      cerbacWhereTarget: CerbacWhereTargetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacWhereTargetRoute)],
  exports: [RouterModule],
})
export class CerbacWhereTargetRoutingModule {}
