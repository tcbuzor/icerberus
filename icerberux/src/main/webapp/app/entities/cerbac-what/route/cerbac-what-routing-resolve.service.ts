import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacWhat, CerbacWhat } from '../cerbac-what.model';
import { CerbacWhatService } from '../service/cerbac-what.service';

@Injectable({ providedIn: 'root' })
export class CerbacWhatRoutingResolveService implements Resolve<ICerbacWhat> {
  constructor(protected service: CerbacWhatService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacWhat> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacWhat: HttpResponse<CerbacWhat>) => {
          if (cerbacWhat.body) {
            return of(cerbacWhat.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacWhat());
  }
}
