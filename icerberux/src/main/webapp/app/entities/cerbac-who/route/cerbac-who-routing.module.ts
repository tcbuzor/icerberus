import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacWhoComponent } from '../list/cerbac-who.component';
import { CerbacWhoDetailComponent } from '../detail/cerbac-who-detail.component';
import { CerbacWhoUpdateComponent } from '../update/cerbac-who-update.component';
import { CerbacWhoRoutingResolveService } from './cerbac-who-routing-resolve.service';

const cerbacWhoRoute: Routes = [
  {
    path: '',
    component: CerbacWhoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacWhoDetailComponent,
    resolve: {
      cerbacWho: CerbacWhoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacWhoUpdateComponent,
    resolve: {
      cerbacWho: CerbacWhoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacWhoUpdateComponent,
    resolve: {
      cerbacWho: CerbacWhoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacWhoRoute)],
  exports: [RouterModule],
})
export class CerbacWhoRoutingModule {}
