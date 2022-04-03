import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacWhyComponent } from '../list/cerbac-why.component';
import { CerbacWhyDetailComponent } from '../detail/cerbac-why-detail.component';
import { CerbacWhyUpdateComponent } from '../update/cerbac-why-update.component';
import { CerbacWhyRoutingResolveService } from './cerbac-why-routing-resolve.service';

const cerbacWhyRoute: Routes = [
  {
    path: '',
    component: CerbacWhyComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacWhyDetailComponent,
    resolve: {
      cerbacWhy: CerbacWhyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacWhyUpdateComponent,
    resolve: {
      cerbacWhy: CerbacWhyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacWhyUpdateComponent,
    resolve: {
      cerbacWhy: CerbacWhyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacWhyRoute)],
  exports: [RouterModule],
})
export class CerbacWhyRoutingModule {}
