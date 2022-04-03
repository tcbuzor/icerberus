import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacEntityProp, getCerbacEntityPropIdentifier } from '../cerbac-entity-prop.model';

export type EntityResponseType = HttpResponse<ICerbacEntityProp>;
export type EntityArrayResponseType = HttpResponse<ICerbacEntityProp[]>;

@Injectable({ providedIn: 'root' })
export class CerbacEntityPropService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-entity-props');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cerbacEntityProp: ICerbacEntityProp): Observable<EntityResponseType> {
    return this.http.post<ICerbacEntityProp>(this.resourceUrl, cerbacEntityProp, { observe: 'response' });
  }

  update(cerbacEntityProp: ICerbacEntityProp): Observable<EntityResponseType> {
    return this.http.put<ICerbacEntityProp>(
      `${this.resourceUrl}/${getCerbacEntityPropIdentifier(cerbacEntityProp) as number}`,
      cerbacEntityProp,
      { observe: 'response' }
    );
  }

  partialUpdate(cerbacEntityProp: ICerbacEntityProp): Observable<EntityResponseType> {
    return this.http.patch<ICerbacEntityProp>(
      `${this.resourceUrl}/${getCerbacEntityPropIdentifier(cerbacEntityProp) as number}`,
      cerbacEntityProp,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacEntityProp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacEntityProp[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacEntityPropToCollectionIfMissing(
    cerbacEntityPropCollection: ICerbacEntityProp[],
    ...cerbacEntityPropsToCheck: (ICerbacEntityProp | null | undefined)[]
  ): ICerbacEntityProp[] {
    const cerbacEntityProps: ICerbacEntityProp[] = cerbacEntityPropsToCheck.filter(isPresent);
    if (cerbacEntityProps.length > 0) {
      const cerbacEntityPropCollectionIdentifiers = cerbacEntityPropCollection.map(
        cerbacEntityPropItem => getCerbacEntityPropIdentifier(cerbacEntityPropItem)!
      );
      const cerbacEntityPropsToAdd = cerbacEntityProps.filter(cerbacEntityPropItem => {
        const cerbacEntityPropIdentifier = getCerbacEntityPropIdentifier(cerbacEntityPropItem);
        if (cerbacEntityPropIdentifier == null || cerbacEntityPropCollectionIdentifiers.includes(cerbacEntityPropIdentifier)) {
          return false;
        }
        cerbacEntityPropCollectionIdentifiers.push(cerbacEntityPropIdentifier);
        return true;
      });
      return [...cerbacEntityPropsToAdd, ...cerbacEntityPropCollection];
    }
    return cerbacEntityPropCollection;
  }
}
