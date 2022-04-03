import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacEntityComponent } from '../list/cerbac-entity.component';
import { CerbacEntityDetailComponent } from '../detail/cerbac-entity-detail.component';
import { CerbacEntityUpdateComponent } from '../update/cerbac-entity-update.component';
import { CerbacEntityRoutingResolveService } from './cerbac-entity-routing-resolve.service';

const cerbacEntityRoute: Routes = [
  {
    path: '',
    component: CerbacEntityComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacEntityDetailComponent,
    resolve: {
      cerbacEntity: CerbacEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacEntityUpdateComponent,
    resolve: {
      cerbacEntity: CerbacEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacEntityUpdateComponent,
    resolve: {
      cerbacEntity: CerbacEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacEntityRoute)],
  exports: [RouterModule],
})
export class CerbacEntityRoutingModule {}
