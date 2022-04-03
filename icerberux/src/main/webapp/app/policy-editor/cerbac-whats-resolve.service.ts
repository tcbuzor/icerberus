import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {CerbacWhat, ICerbacWhat} from "app/entities/cerbac-what/cerbac-what.model";
import {CerbacWhatService} from "app/entities/cerbac-what/service/cerbac-what.service";

@Injectable({ providedIn: 'root' })
export class CerbacWhatsResolveService implements Resolve<ICerbacWhat[]> {
  constructor(protected service: CerbacWhatService, protected router: Router) {}

  resolve(): Observable<ICerbacWhat[]> | Observable<never> {

      return this.service.query().pipe(
        mergeMap((cerbacWhats: HttpResponse<CerbacWhat[]>) => {
          if (cerbacWhats.body) {
            return of(cerbacWhats.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );

  }
}
