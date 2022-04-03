import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacEntityPropComponent } from '../list/cerbac-entity-prop.component';
import { CerbacEntityPropDetailComponent } from '../detail/cerbac-entity-prop-detail.component';
import { CerbacEntityPropUpdateComponent } from '../update/cerbac-entity-prop-update.component';
import { CerbacEntityPropRoutingResolveService } from './cerbac-entity-prop-routing-resolve.service';

const cerbacEntityPropRoute: Routes = [
  {
    path: '',
    component: CerbacEntityPropComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacEntityPropDetailComponent,
    resolve: {
      cerbacEntityProp: CerbacEntityPropRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacEntityPropUpdateComponent,
    resolve: {
      cerbacEntityProp: CerbacEntityPropRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacEntityPropUpdateComponent,
    resolve: {
      cerbacEntityProp: CerbacEntityPropRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacEntityPropRoute)],
  exports: [RouterModule],
})
export class CerbacEntityPropRoutingModule {}
