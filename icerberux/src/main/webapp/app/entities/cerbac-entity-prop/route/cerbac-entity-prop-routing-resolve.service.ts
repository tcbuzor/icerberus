import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacEntityProp, CerbacEntityProp } from '../cerbac-entity-prop.model';
import { CerbacEntityPropService } from '../service/cerbac-entity-prop.service';

@Injectable({ providedIn: 'root' })
export class CerbacEntityPropRoutingResolveService implements Resolve<ICerbacEntityProp> {
  constructor(protected service: CerbacEntityPropService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacEntityProp> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacEntityProp: HttpResponse<CerbacEntityProp>) => {
          if (cerbacEntityProp.body) {
            return of(cerbacEntityProp.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacEntityProp());
  }
}
