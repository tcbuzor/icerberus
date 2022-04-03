import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacOntology, CerbacOntology } from '../cerbac-ontology.model';
import { CerbacOntologyService } from '../service/cerbac-ontology.service';

@Injectable({ providedIn: 'root' })
export class CerbacOntologyRoutingResolveService implements Resolve<ICerbacOntology> {
  constructor(protected service: CerbacOntologyService, protected router: Router) {}

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
