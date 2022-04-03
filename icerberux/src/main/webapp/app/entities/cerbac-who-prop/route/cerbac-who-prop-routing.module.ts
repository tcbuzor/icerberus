import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacWhoPropComponent } from '../list/cerbac-who-prop.component';
import { CerbacWhoPropDetailComponent } from '../detail/cerbac-who-prop-detail.component';
import { CerbacWhoPropUpdateComponent } from '../update/cerbac-who-prop-update.component';
import { CerbacWhoPropRoutingResolveService } from './cerbac-who-prop-routing-resolve.service';

const cerbacWhoPropRoute: Routes = [
  {
    path: '',
    component: CerbacWhoPropComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacWhoPropDetailComponent,
    resolve: {
      cerbacWhoProp: CerbacWhoPropRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacWhoPropUpdateComponent,
    resolve: {
      cerbacWhoProp: CerbacWhoPropRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacWhoPropUpdateComponent,
    resolve: {
      cerbacWhoProp: CerbacWhoPropRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacWhoPropRoute)],
  exports: [RouterModule],
})
export class CerbacWhoPropRoutingModule {}
