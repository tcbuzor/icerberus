import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacWhy, CerbacWhy } from '../cerbac-why.model';
import { CerbacWhyService } from '../service/cerbac-why.service';

@Injectable({ providedIn: 'root' })
export class CerbacWhyRoutingResolveService implements Resolve<ICerbacWhy> {
  constructor(protected service: CerbacWhyService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacWhy> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacWhy: HttpResponse<CerbacWhy>) => {
          if (cerbacWhy.body) {
            return of(cerbacWhy.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacWhy());
  }
}
