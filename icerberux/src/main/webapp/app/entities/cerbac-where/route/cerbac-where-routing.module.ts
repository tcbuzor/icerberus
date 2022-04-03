import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacWhereComponent } from '../list/cerbac-where.component';
import { CerbacWhereDetailComponent } from '../detail/cerbac-where-detail.component';
import { CerbacWhereUpdateComponent } from '../update/cerbac-where-update.component';
import { CerbacWhereRoutingResolveService } from './cerbac-where-routing-resolve.service';

const cerbacWhereRoute: Routes = [
  {
    path: '',
    component: CerbacWhereComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacWhereDetailComponent,
    resolve: {
      cerbacWhere: CerbacWhereRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacWhereUpdateComponent,
    resolve: {
      cerbacWhere: CerbacWhereRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacWhereUpdateComponent,
    resolve: {
      cerbacWhere: CerbacWhereRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacWhereRoute)],
  exports: [RouterModule],
})
export class CerbacWhereRoutingModule {}
