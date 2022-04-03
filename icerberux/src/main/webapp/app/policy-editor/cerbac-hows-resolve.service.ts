import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {ICerbacHow} from "app/entities/cerbac-how/cerbac-how.model";
import {CerbacHowService} from "app/entities/cerbac-how/service/cerbac-how.service";

@Injectable({ providedIn: 'root' })
export class CerbacHowsResolveService implements Resolve<ICerbacHow[]> {
  constructor(protected service: CerbacHowService, protected router: Router) {}

  resolve(): Observable<ICerbacHow[]> | Observable<never> {

      return this.service.query().pipe(
        mergeMap((cerbacHows: HttpResponse<ICerbacHow[]>) => {
          if (cerbacHows.body) {
            return of(cerbacHows.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );

  }
}
