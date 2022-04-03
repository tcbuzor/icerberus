import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacWhatAction, CerbacWhatAction } from '../cerbac-what-action.model';
import { CerbacWhatActionService } from '../service/cerbac-what-action.service';

@Injectable({ providedIn: 'root' })
export class CerbacWhatActionRoutingResolveService implements Resolve<ICerbacWhatAction> {
  constructor(protected service: CerbacWhatActionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacWhatAction> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacWhatAction: HttpResponse<CerbacWhatAction>) => {
          if (cerbacWhatAction.body) {
            return of(cerbacWhatAction.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacWhatAction());
  }
}
