import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacHow, CerbacHow } from '../cerbac-how.model';
import { CerbacHowService } from '../service/cerbac-how.service';

@Injectable({ providedIn: 'root' })
export class CerbacHowRoutingResolveService implements Resolve<ICerbacHow> {
  constructor(protected service: CerbacHowService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacHow> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacHow: HttpResponse<CerbacHow>) => {
          if (cerbacHow.body) {
            return of(cerbacHow.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacHow());
  }
}
