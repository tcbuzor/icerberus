import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacWhereOrigin, getCerbacWhereOriginIdentifier } from '../cerbac-where-origin.model';

export type EntityResponseType = HttpResponse<ICerbacWhereOrigin>;
export type EntityArrayResponseType = HttpResponse<ICerbacWhereOrigin[]>;

@Injectable({ providedIn: 'root' })
export class CerbacWhereOriginService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-where-origins');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cerbacWhereOrigin: ICerbacWhereOrigin): Observable<EntityResponseType> {
    return this.http.post<ICerbacWhereOrigin>(this.resourceUrl, cerbacWhereOrigin, { observe: 'response' });
  }

  update(cerbacWhereOrigin: ICerbacWhereOrigin): Observable<EntityResponseType> {
    return this.http.put<ICerbacWhereOrigin>(
      `${this.resourceUrl}/${getCerbacWhereOriginIdentifier(cerbacWhereOrigin) as number}`,
      cerbacWhereOrigin,
      { observe: 'response' }
    );
  }

  partialUpdate(cerbacWhereOrigin: ICerbacWhereOrigin): Observable<EntityResponseType> {
    return this.http.patch<ICerbacWhereOrigin>(
      `${this.resourceUrl}/${getCerbacWhereOriginIdentifier(cerbacWhereOrigin) as number}`,
      cerbacWhereOrigin,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacWhereOrigin>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacWhereOrigin[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacWhereOriginToCollectionIfMissing(
    cerbacWhereOriginCollection: ICerbacWhereOrigin[],
    ...cerbacWhereOriginsToCheck: (ICerbacWhereOrigin | null | undefined)[]
  ): ICerbacWhereOrigin[] {
    const cerbacWhereOrigins: ICerbacWhereOrigin[] = cerbacWhereOriginsToCheck.filter(isPresent);
    if (cerbacWhereOrigins.length > 0) {
      const cerbacWhereOriginCollectionIdentifiers = cerbacWhereOriginCollection.map(
        cerbacWhereOriginItem => getCerbacWhereOriginIdentifier(cerbacWhereOriginItem)!
      );
      const cerbacWhereOriginsToAdd = cerbacWhereOrigins.filter(cerbacWhereOriginItem => {
        const cerbacWhereOriginIdentifier = getCerbacWhereOriginIdentifier(cerbacWhereOriginItem);
        if (cerbacWhereOriginIdentifier == null || cerbacWhereOriginCollectionIdentifiers.includes(cerbacWhereOriginIdentifier)) {
          return false;
        }
        cerbacWhereOriginCollectionIdentifiers.push(cerbacWhereOriginIdentifier);
        return true;
      });
      return [...cerbacWhereOriginsToAdd, ...cerbacWhereOriginCollection];
    }
    return cerbacWhereOriginCollection;
  }
}
