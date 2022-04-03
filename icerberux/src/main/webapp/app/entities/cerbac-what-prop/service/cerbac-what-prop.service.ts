import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacWhatProp, getCerbacWhatPropIdentifier } from '../cerbac-what-prop.model';

export type EntityResponseType = HttpResponse<ICerbacWhatProp>;
export type EntityArrayResponseType = HttpResponse<ICerbacWhatProp[]>;

@Injectable({ providedIn: 'root' })
export class CerbacWhatPropService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-what-props');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cerbacWhatProp: ICerbacWhatProp): Observable<EntityResponseType> {
    return this.http.post<ICerbacWhatProp>(this.resourceUrl, cerbacWhatProp, { observe: 'response' });
  }

  update(cerbacWhatProp: ICerbacWhatProp): Observable<EntityResponseType> {
    return this.http.put<ICerbacWhatProp>(`${this.resourceUrl}/${getCerbacWhatPropIdentifier(cerbacWhatProp) as number}`, cerbacWhatProp, {
      observe: 'response',
    });
  }

  partialUpdate(cerbacWhatProp: ICerbacWhatProp): Observable<EntityResponseType> {
    return this.http.patch<ICerbacWhatProp>(
      `${this.resourceUrl}/${getCerbacWhatPropIdentifier(cerbacWhatProp) as number}`,
      cerbacWhatProp,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacWhatProp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacWhatProp[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacWhatPropToCollectionIfMissing(
    cerbacWhatPropCollection: ICerbacWhatProp[],
    ...cerbacWhatPropsToCheck: (ICerbacWhatProp | null | undefined)[]
  ): ICerbacWhatProp[] {
    const cerbacWhatProps: ICerbacWhatProp[] = cerbacWhatPropsToCheck.filter(isPresent);
    if (cerbacWhatProps.length > 0) {
      const cerbacWhatPropCollectionIdentifiers = cerbacWhatPropCollection.map(
        cerbacWhatPropItem => getCerbacWhatPropIdentifier(cerbacWhatPropItem)!
      );
      const cerbacWhatPropsToAdd = cerbacWhatProps.filter(cerbacWhatPropItem => {
        const cerbacWhatPropIdentifier = getCerbacWhatPropIdentifier(cerbacWhatPropItem);
        if (cerbacWhatPropIdentifier == null || cerbacWhatPropCollectionIdentifiers.includes(cerbacWhatPropIdentifier)) {
          return false;
        }
        cerbacWhatPropCollectionIdentifiers.push(cerbacWhatPropIdentifier);
        return true;
      });
      return [...cerbacWhatPropsToAdd, ...cerbacWhatPropCollection];
    }
    return cerbacWhatPropCollection;
  }
}
