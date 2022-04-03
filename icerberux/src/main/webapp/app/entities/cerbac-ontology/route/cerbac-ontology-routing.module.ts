import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CerbacOntologyComponent } from '../list/cerbac-ontology.component';
import { CerbacOntologyDetailComponent } from '../detail/cerbac-ontology-detail.component';
import { CerbacOntologyUpdateComponent } from '../update/cerbac-ontology-update.component';
import { CerbacOntologyRoutingResolveService } from './cerbac-ontology-routing-resolve.service';

const cerbacOntologyRoute: Routes = [
  {
    path: '',
    component: CerbacOntologyComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CerbacOntologyDetailComponent,
    resolve: {
      cerbacOntology: CerbacOntologyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CerbacOntologyUpdateComponent,
    resolve: {
      cerbacOntology: CerbacOntologyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CerbacOntologyUpdateComponent,
    resolve: {
      cerbacOntology: CerbacOntologyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cerbacOntologyRoute)],
  exports: [RouterModule],
})
export class CerbacOntologyRoutingModule {}
