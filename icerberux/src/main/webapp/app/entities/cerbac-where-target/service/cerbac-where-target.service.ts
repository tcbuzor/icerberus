import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacWhereTarget, getCerbacWhereTargetIdentifier } from '../cerbac-where-target.model';

export type EntityResponseType = HttpResponse<ICerbacWhereTarget>;
export type EntityArrayResponseType = HttpResponse<ICerbacWhereTarget[]>;

@Injectable({ providedIn: 'root' })
export class CerbacWhereTargetService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-where-targets');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cerbacWhereTarget: ICerbacWhereTarget): Observable<EntityResponseType> {
    return this.http.post<ICerbacWhereTarget>(this.resourceUrl, cerbacWhereTarget, { observe: 'response' });
  }

  update(cerbacWhereTarget: ICerbacWhereTarget): Observable<EntityResponseType> {
    return this.http.put<ICerbacWhereTarget>(
      `${this.resourceUrl}/${getCerbacWhereTargetIdentifier(cerbacWhereTarget) as number}`,
      cerbacWhereTarget,
      { observe: 'response' }
    );
  }

  partialUpdate(cerbacWhereTarget: ICerbacWhereTarget): Observable<EntityResponseType> {
    return this.http.patch<ICerbacWhereTarget>(
      `${this.resourceUrl}/${getCerbacWhereTargetIdentifier(cerbacWhereTarget) as number}`,
      cerbacWhereTarget,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacWhereTarget>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacWhereTarget[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacWhereTargetToCollectionIfMissing(
    cerbacWhereTargetCollection: ICerbacWhereTarget[],
    ...cerbacWhereTargetsToCheck: (ICerbacWhereTarget | null | undefined)[]
  ): ICerbacWhereTarget[] {
    const cerbacWhereTargets: ICerbacWhereTarget[] = cerbacWhereTargetsToCheck.filter(isPresent);
    if (cerbacWhereTargets.length > 0) {
      const cerbacWhereTargetCollectionIdentifiers = cerbacWhereTargetCollection.map(
        cerbacWhereTargetItem => getCerbacWhereTargetIdentifier(cerbacWhereTargetItem)!
      );
      const cerbacWhereTargetsToAdd = cerbacWhereTargets.filter(cerbacWhereTargetItem => {
        const cerbacWhereTargetIdentifier = getCerbacWhereTargetIdentifier(cerbacWhereTargetItem);
        if (cerbacWhereTargetIdentifier == null || cerbacWhereTargetCollectionIdentifiers.includes(cerbacWhereTargetIdentifier)) {
          return false;
        }
        cerbacWhereTargetCollectionIdentifiers.push(cerbacWhereTargetIdentifier);
        return true;
      });
      return [...cerbacWhereTargetsToAdd, ...cerbacWhereTargetCollection];
    }
    return cerbacWhereTargetCollection;
  }
}
