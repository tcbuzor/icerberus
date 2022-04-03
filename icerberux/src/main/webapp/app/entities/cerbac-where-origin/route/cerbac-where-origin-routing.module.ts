import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacWhereOriginComponent } from '../list/cerbac-where-origin.component';
import { CerbacWhereOriginDetailComponent } from '../detail/cerbac-where-origin-detail.component';
import { CerbacWhereOriginUpdateComponent } from '../update/cerbac-where-origin-update.component';
import { CerbacWhereOriginRoutingResolveService } from './cerbac-where-origin-routing-resolve.service';

const cerbacWhereOriginRoute: Routes = [
  {
    path: '',
    component: CerbacWhereOriginComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacWhereOriginDetailComponent,
    resolve: {
      cerbacWhereOrigin: CerbacWhereOriginRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacWhereOriginUpdateComponent,
    resolve: {
      cerbacWhereOrigin: CerbacWhereOriginRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacWhereOriginUpdateComponent,
    resolve: {
      cerbacWhereOrigin: CerbacWhereOriginRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacWhereOriginRoute)],
  exports: [RouterModule],
})
export class CerbacWhereOriginRoutingModule {}
