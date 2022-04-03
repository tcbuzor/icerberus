import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacWhen, CerbacWhen } from '../cerbac-when.model';
import { CerbacWhenService } from '../service/cerbac-when.service';

@Injectable({ providedIn: 'root' })
export class CerbacWhenRoutingResolveService implements Resolve<ICerbacWhen> {
  constructor(protected service: CerbacWhenService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacWhen> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacWhen: HttpResponse<CerbacWhen>) => {
          if (cerbacWhen.body) {
            return of(cerbacWhen.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacWhen());
  }
}
