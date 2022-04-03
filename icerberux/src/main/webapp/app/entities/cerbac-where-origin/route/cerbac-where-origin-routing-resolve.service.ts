import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacWhereOrigin, CerbacWhereOrigin } from '../cerbac-where-origin.model';
import { CerbacWhereOriginService } from '../service/cerbac-where-origin.service';

@Injectable({ providedIn: 'root' })
export class CerbacWhereOriginRoutingResolveService implements Resolve<ICerbacWhereOrigin> {
  constructor(protected service: CerbacWhereOriginService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacWhereOrigin> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacWhereOrigin: HttpResponse<CerbacWhereOrigin>) => {
          if (cerbacWhereOrigin.body) {
            return of(cerbacWhereOrigin.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacWhereOrigin());
  }
}
