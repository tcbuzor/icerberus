import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICerbacEntity, CerbacEntity } from '../../../shared/model/cerbac-entity.model';
import { CerbacEntityService } from '../../../shared/service/cerbac-entity.service';

@Injectable({ providedIn: 'root' })
export class CerbacEntityRoutingResolveService implements Resolve<ICerbacEntity> {
  constructor(protected service: CerbacEntityService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICerbacEntity> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cerbacEntity: HttpResponse<CerbacEntity>) => {
          if (cerbacEntity.body) {
            return of(cerbacEntity.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CerbacEntity());
  }
}
