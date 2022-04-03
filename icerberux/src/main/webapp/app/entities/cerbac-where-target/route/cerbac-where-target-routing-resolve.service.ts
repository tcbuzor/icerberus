import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacWhereTarget, CerbacWhereTarget } from '../cerbac-where-target.model';
import { CerbacWhereTargetService } from '../service/cerbac-where-target.service';

@Injectable({ providedIn: 'root' })
export class CerbacWhereTargetRoutingResolveService implements Resolve<ICerbacWhereTarget> {
  constructor(protected service: CerbacWhereTargetService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacWhereTarget> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacWhereTarget: HttpResponse<CerbacWhereTarget>) => {
          if (cerbacWhereTarget.body) {
            return of(cerbacWhereTarget.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacWhereTarget());
  }
}
