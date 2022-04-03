import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacType, CerbacType } from '../cerbac-type.model';
import { CerbacTypeService } from '../service/cerbac-type.service';

@Injectable({ providedIn: 'root' })
export class CerbacTypeRoutingResolveService implements Resolve<ICerbacType> {
  constructor(protected service: CerbacTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacType: HttpResponse<CerbacType>) => {
          if (cerbacType.body) {
            return of(cerbacType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacType());
  }
}
