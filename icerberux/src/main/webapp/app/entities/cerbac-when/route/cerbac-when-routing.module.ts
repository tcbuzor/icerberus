import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacWhenComponent } from '../list/cerbac-when.component';
import { CerbacWhenDetailComponent } from '../detail/cerbac-when-detail.component';
import { CerbacWhenUpdateComponent } from '../update/cerbac-when-update.component';
import { CerbacWhenRoutingResolveService } from './cerbac-when-routing-resolve.service';

const cerbacWhenRoute: Routes = [
  {
    path: '',
    component: CerbacWhenComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacWhenDetailComponent,
    resolve: {
      cerbacWhen: CerbacWhenRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacWhenUpdateComponent,
    resolve: {
      cerbacWhen: CerbacWhenRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacWhenUpdateComponent,
    resolve: {
      cerbacWhen: CerbacWhenRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacWhenRoute)],
  exports: [RouterModule],
})
export class CerbacWhenRoutingModule {}
