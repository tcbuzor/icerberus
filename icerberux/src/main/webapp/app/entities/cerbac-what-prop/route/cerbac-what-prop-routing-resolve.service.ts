import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacWhatProp, CerbacWhatProp } from '../cerbac-what-prop.model';
import { CerbacWhatPropService } from '../service/cerbac-what-prop.service';

@Injectable({ providedIn: 'root' })
export class CerbacWhatPropRoutingResolveService implements Resolve<ICerbacWhatProp> {
  constructor(protected service: CerbacWhatPropService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacWhatProp> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacWhatProp: HttpResponse<CerbacWhatProp>) => {
          if (cerbacWhatProp.body) {
            return of(cerbacWhatProp.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacWhatProp());
  }
}
