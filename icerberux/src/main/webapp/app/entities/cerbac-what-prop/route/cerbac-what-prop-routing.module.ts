import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacWhatPropComponent } from '../list/cerbac-what-prop.component';
import { CerbacWhatPropDetailComponent } from '../detail/cerbac-what-prop-detail.component';
import { CerbacWhatPropUpdateComponent } from '../update/cerbac-what-prop-update.component';
import { CerbacWhatPropRoutingResolveService } from './cerbac-what-prop-routing-resolve.service';

const cerbacWhatPropRoute: Routes = [
  {
    path: '',
    component: CerbacWhatPropComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacWhatPropDetailComponent,
    resolve: {
      cerbacWhatProp: CerbacWhatPropRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacWhatPropUpdateComponent,
    resolve: {
      cerbacWhatProp: CerbacWhatPropRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacWhatPropUpdateComponent,
    resolve: {
      cerbacWhatProp: CerbacWhatPropRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacWhatPropRoute)],
  exports: [RouterModule],
})
export class CerbacWhatPropRoutingModule {}
