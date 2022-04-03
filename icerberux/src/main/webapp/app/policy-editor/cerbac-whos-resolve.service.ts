import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {CerbacWho, ICerbacWho} from "app/entities/cerbac-who/cerbac-who.model";
import {CerbacWhoService} from "app/entities/cerbac-who/service/cerbac-who.service";

@Injectable({ providedIn: 'root' })
export class CerbacWhosResolveService implements Resolve<ICerbacWho[]> {
  constructor(protected service: CerbacWhoService, protected router: Router) {}

  resolve(): Observable<ICerbacWho[]> | Observable<never> {

      return this.service.query().pipe(
        mergeMap((cerbacWhos: HttpResponse<CerbacWho[]>) => {
          if (cerbacWhos.body) {
            return of(cerbacWhos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );

  }
}
