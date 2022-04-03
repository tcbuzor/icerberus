import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacPolicy, CerbacPolicy } from '../cerbac-policy.model';
import { CerbacPolicyService } from '../service/cerbac-policy.service';

@Injectable({ providedIn: 'root' })
export class CerbacPolicyRoutingResolveService implements Resolve<ICerbacPolicy> {
  constructor(protected service: CerbacPolicyService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacPolicy> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacPolicy: HttpResponse<CerbacPolicy>) => {
          if (cerbacPolicy.body) {
            return of(cerbacPolicy.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacPolicy());
  }
}
