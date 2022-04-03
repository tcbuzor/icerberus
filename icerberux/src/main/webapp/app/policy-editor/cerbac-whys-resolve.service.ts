import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {ICerbacWhy} from "app/entities/cerbac-why/cerbac-why.model";
import {CerbacWhyService} from "app/entities/cerbac-why/service/cerbac-why.service";

@Injectable({ providedIn: 'root' })
export class CerbacWhysResolveService implements Resolve<ICerbacWhy[]> {
  constructor(protected service: CerbacWhyService, protected router: Router) {}

  resolve(): Observable<ICerbacWhy[]> | Observable<never> {

      return this.service.query().pipe(
        mergeMap((cerbacWhys: HttpResponse<ICerbacWhy[]>) => {
          if (cerbacWhys.body) {
            return of(cerbacWhys.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );

  }
}
