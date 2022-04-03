import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacWhere, CerbacWhere } from '../cerbac-where.model';
import { CerbacWhereService } from '../service/cerbac-where.service';

@Injectable({ providedIn: 'root' })
export class CerbacWhereRoutingResolveService implements Resolve<ICerbacWhere> {
  constructor(protected service: CerbacWhereService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacWhere> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacWhere: HttpResponse<CerbacWhere>) => {
          if (cerbacWhere.body) {
            return of(cerbacWhere.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacWhere());
  }
}
