import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacWho, CerbacWho } from '../cerbac-who.model';
import { CerbacWhoService } from '../service/cerbac-who.service';

@Injectable({ providedIn: 'root' })
export class CerbacWhoRoutingResolveService implements Resolve<ICerbacWho> {
  constructor(protected service: CerbacWhoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacWho> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacWho: HttpResponse<CerbacWho>) => {
          if (cerbacWho.body) {
            return of(cerbacWho.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacWho());
  }
}
