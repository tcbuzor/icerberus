import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacPolicyRule, CerbacPolicyRule } from '../cerbac-policy-rule.model';
import { CerbacPolicyRuleService } from '../service/cerbac-policy-rule.service';

@Injectable({ providedIn: 'root' })
export class CerbacPolicyRuleRoutingResolveService implements Resolve<ICerbacPolicyRule> {
  constructor(protected service: CerbacPolicyRuleService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacPolicyRule> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacPolicyRule: HttpResponse<CerbacPolicyRule>) => {
          if (cerbacPolicyRule.body) {
            return of(cerbacPolicyRule.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacPolicyRule());
  }
}
