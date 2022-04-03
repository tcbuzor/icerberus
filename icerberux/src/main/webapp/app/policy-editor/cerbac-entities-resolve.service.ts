import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {CerbacEntityService} from "app/shared/service/cerbac-entity.service";
import {CerbacEntity, ICerbacEntity} from "app/shared/model/cerbac-entity.model";

@Injectable({ providedIn: 'root' })
export class CerbacEntitiesResolveService implements Resolve<ICerbacEntity[]> {
  constructor(protected service: CerbacEntityService, protected router: Router) {}

  resolve(): Observable<ICerbacEntity[]> | Observable<never> {

      return this.service.query().pipe(
        mergeMap((cerbacEntities: HttpResponse<CerbacEntity[]>) => {
          if (cerbacEntities.body) {
            return of(cerbacEntities.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );

  }
}
