import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacActionComponent } from '../list/cerbac-action.component';
import { CerbacActionDetailComponent } from '../detail/cerbac-action-detail.component';
import { CerbacActionUpdateComponent } from '../update/cerbac-action-update.component';
import { CerbacActionRoutingResolveService } from './cerbac-action-routing-resolve.service';

const cerbacActionRoute: Routes = [
  {
    path: '',
    component: CerbacActionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacActionDetailComponent,
    resolve: {
      cerbacAction: CerbacActionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacActionUpdateComponent,
    resolve: {
      cerbacAction: CerbacActionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacActionUpdateComponent,
    resolve: {
      cerbacAction: CerbacActionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacActionRoute)],
  exports: [RouterModule],
})
export class CerbacActionRoutingModule {}
