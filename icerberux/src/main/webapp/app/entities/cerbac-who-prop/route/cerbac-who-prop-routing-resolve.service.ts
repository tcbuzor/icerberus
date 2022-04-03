import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacWhoProp, CerbacWhoProp } from '../cerbac-who-prop.model';
import { CerbacWhoPropService } from '../service/cerbac-who-prop.service';

@Injectable({ providedIn: 'root' })
export class CerbacWhoPropRoutingResolveService implements Resolve<ICerbacWhoProp> {
  constructor(protected service: CerbacWhoPropService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacWhoProp> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacWhoProp: HttpResponse<CerbacWhoProp>) => {
          if (cerbacWhoProp.body) {
            return of(cerbacWhoProp.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacWhoProp());
  }
}
