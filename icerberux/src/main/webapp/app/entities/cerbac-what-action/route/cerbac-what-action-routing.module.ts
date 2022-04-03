import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacWhatActionComponent } from '../list/cerbac-what-action.component';
import { CerbacWhatActionDetailComponent } from '../detail/cerbac-what-action-detail.component';
import { CerbacWhatActionUpdateComponent } from '../update/cerbac-what-action-update.component';
import { CerbacWhatActionRoutingResolveService } from './cerbac-what-action-routing-resolve.service';

const cerbacWhatActionRoute: Routes = [
  {
    path: '',
    component: CerbacWhatActionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacWhatActionDetailComponent,
    resolve: {
      cerbacWhatAction: CerbacWhatActionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacWhatActionUpdateComponent,
    resolve: {
      cerbacWhatAction: CerbacWhatActionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacWhatActionUpdateComponent,
    resolve: {
      cerbacWhatAction: CerbacWhatActionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacWhatActionRoute)],
  exports: [RouterModule],
})
export class CerbacWhatActionRoutingModule {}
