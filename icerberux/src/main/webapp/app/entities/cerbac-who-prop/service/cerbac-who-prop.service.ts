import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacWhoProp, getCerbacWhoPropIdentifier } from '../cerbac-who-prop.model';

export type EntityResponseType = HttpResponse<ICerbacWhoProp>;
export type EntityArrayResponseType = HttpResponse<ICerbacWhoProp[]>;

@Injectable({ providedIn: 'root' })
export class CerbacWhoPropService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-who-props');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cerbacWhoProp: ICerbacWhoProp): Observable<EntityResponseType> {
    return this.http.post<ICerbacWhoProp>(this.resourceUrl, cerbacWhoProp, { observe: 'response' });
  }

  update(cerbacWhoProp: ICerbacWhoProp): Observable<EntityResponseType> {
    return this.http.put<ICerbacWhoProp>(`${this.resourceUrl}/${getCerbacWhoPropIdentifier(cerbacWhoProp) as number}`, cerbacWhoProp, {
      observe: 'response',
    });
  }

  partialUpdate(cerbacWhoProp: ICerbacWhoProp): Observable<EntityResponseType> {
    return this.http.patch<ICerbacWhoProp>(`${this.resourceUrl}/${getCerbacWhoPropIdentifier(cerbacWhoProp) as number}`, cerbacWhoProp, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacWhoProp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacWhoProp[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacWhoPropToCollectionIfMissing(
    cerbacWhoPropCollection: ICerbacWhoProp[],
    ...cerbacWhoPropsToCheck: (ICerbacWhoProp | null | undefined)[]
  ): ICerbacWhoProp[] {
    const cerbacWhoProps: ICerbacWhoProp[] = cerbacWhoPropsToCheck.filter(isPresent);
    if (cerbacWhoProps.length > 0) {
      const cerbacWhoPropCollectionIdentifiers = cerbacWhoPropCollection.map(
        cerbacWhoPropItem => getCerbacWhoPropIdentifier(cerbacWhoPropItem)!
      );
      const cerbacWhoPropsToAdd = cerbacWhoProps.filter(cerbacWhoPropItem => {
        const cerbacWhoPropIdentifier = getCerbacWhoPropIdentifier(cerbacWhoPropItem);
        if (cerbacWhoPropIdentifier == null || cerbacWhoPropCollectionIdentifiers.includes(cerbacWhoPropIdentifier)) {
          return false;
        }
        cerbacWhoPropCollectionIdentifiers.push(cerbacWhoPropIdentifier);
        return true;
      });
      return [...cerbacWhoPropsToAdd, ...cerbacWhoPropCollection];
    }
    return cerbacWhoPropCollection;
  }
}
