import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacTypeComponent } from '../list/cerbac-type.component';
import { CerbacTypeDetailComponent } from '../detail/cerbac-type-detail.component';
import { CerbacTypeUpdateComponent } from '../update/cerbac-type-update.component';
import { CerbacTypeRoutingResolveService } from './cerbac-type-routing-resolve.service';

const cerbacTypeRoute: Routes = [
  {
    path: '',
    component: CerbacTypeComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacTypeDetailComponent,
    resolve: {
      cerbacType: CerbacTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacTypeUpdateComponent,
    resolve: {
      cerbacType: CerbacTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacTypeUpdateComponent,
    resolve: {
      cerbacType: CerbacTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacTypeRoute)],
  exports: [RouterModule],
})
export class CerbacTypeRoutingModule {}
