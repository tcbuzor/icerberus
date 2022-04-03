import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CerbacAction, ICerbacAction } from "app/entities/cerbac-action/cerbac-action.model";
import { CerbacActionService } from "app/entities/cerbac-action/service/cerbac-action.service";

@Injectable({ providedIn: 'root' })
export class CerbacActionsResolveService implements Resolve<ICerbacAction[]> {
  constructor(protected service: CerbacActionService, protected router: Router) {}

  resolve(): Observable<ICerbacAction[]> | Observable<never> {

      return this.service.query().pipe(
        mergeMap((cerbacActions: HttpResponse<CerbacAction[]>) => {
          if (cerbacActions.body) {
            return of(cerbacActions.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );

  }
}
