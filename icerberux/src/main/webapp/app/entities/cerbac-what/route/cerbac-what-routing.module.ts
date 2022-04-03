import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacWhatComponent } from '../list/cerbac-what.component';
import { CerbacWhatDetailComponent } from '../detail/cerbac-what-detail.component';
import { CerbacWhatUpdateComponent } from '../update/cerbac-what-update.component';
import { CerbacWhatRoutingResolveService } from './cerbac-what-routing-resolve.service';

const cerbacWhatRoute: Routes = [
  {
    path: '',
    component: CerbacWhatComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacWhatDetailComponent,
    resolve: {
      cerbacWhat: CerbacWhatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacWhatUpdateComponent,
    resolve: {
      cerbacWhat: CerbacWhatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacWhatUpdateComponent,
    resolve: {
      cerbacWhat: CerbacWhatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacWhatRoute)],
  exports: [RouterModule],
})
export class CerbacWhatRoutingModule {}
