import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacHowComponent } from '../list/cerbac-how.component';
import { CerbacHowDetailComponent } from '../detail/cerbac-how-detail.component';
import { CerbacHowUpdateComponent } from '../update/cerbac-how-update.component';
import { CerbacHowRoutingResolveService } from './cerbac-how-routing-resolve.service';

const cerbacHowRoute: Routes = [
  {
    path: '',
    component: CerbacHowComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacHowDetailComponent,
    resolve: {
      cerbacHow: CerbacHowRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacHowUpdateComponent,
    resolve: {
      cerbacHow: CerbacHowRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacHowUpdateComponent,
    resolve: {
      cerbacHow: CerbacHowRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacHowRoute)],
  exports: [RouterModule],
})
export class CerbacHowRoutingModule {}
