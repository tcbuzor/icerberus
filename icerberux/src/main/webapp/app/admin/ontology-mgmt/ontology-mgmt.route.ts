import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Routes, Router} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {OntologyMgmtEditComponent} from "app/admin/ontology-mgmt/edit/ontology-mgmt-edit.component";
import {OntologyMgmtCreateComponent} from "app/admin/ontology-mgmt/create/ontology-mgmt-create.component";
import {OntologyMgmtComponent} from "app/admin/ontology-mgmt/list/ontology-mgmt.component";
import {CerbacOntology, ICerbacOntology} from "app/admin/ontology-mgmt/ontology-mgmt.model";
import {HttpResponse} from "@angular/common/http";
import {OntologyMgmtService} from "app/admin/ontology-mgmt/service/ontology-mgmt.service";
import { mergeMap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class CerbacOntologyRoutingResolveService implements Resolve<ICerbacOntology> {
  constructor(protected service: OntologyMgmtService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacOntology> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacOntology: HttpResponse<CerbacOntology>) => {
          if (cerbacOntology.body) {
            return of(cerbacOntology.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacOntology());
  }
}

export const userManagementRoute: Routes = [
  {
    path: '',
    component: OntologyMgmtComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: 'new',
    component: OntologyMgmtCreateComponent,
    resolve: {
      // user: UserManagementResolve,
    },
  },
  {
    path: ':login/edit',
    component: OntologyMgmtEditComponent,
    resolve: {
      // user: UserManagementResolve,
    },
  },
];
