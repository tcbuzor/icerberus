import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacAction, CerbacAction } from '../cerbac-action.model';
import { CerbacActionService } from '../service/cerbac-action.service';

@Injectable({ providedIn: 'root' })
export class CerbacActionRoutingResolveService implements Resolve<ICerbacAction> {
  constructor(protected service: CerbacActionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacAction> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacAction: HttpResponse<CerbacAction>) => {
          if (cerbacAction.body) {
            return of(cerbacAction.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacAction());
  }
}
