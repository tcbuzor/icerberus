import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacHow, getCerbacHowIdentifier } from '../cerbac-how.model';

export type EntityResponseType = HttpResponse<ICerbacHow>;
export type EntityArrayResponseType = HttpResponse<ICerbacHow[]>;

@Injectable({ providedIn: 'root' })
export class CerbacHowService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-hows');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cerbacHow: ICerbacHow): Observable<EntityResponseType> {
    return this.http.post<ICerbacHow>(this.resourceUrl, cerbacHow, { observe: 'response' });
  }

  update(cerbacHow: ICerbacHow): Observable<EntityResponseType> {
    return this.http.put<ICerbacHow>(`${this.resourceUrl}/${getCerbacHowIdentifier(cerbacHow) as number}`, cerbacHow, {
      observe: 'response',
    });
  }

  partialUpdate(cerbacHow: ICerbacHow): Observable<EntityResponseType> {
    return this.http.patch<ICerbacHow>(`${this.resourceUrl}/${getCerbacHowIdentifier(cerbacHow) as number}`, cerbacHow, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacHow>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacHow[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacHowToCollectionIfMissing(
    cerbacHowCollection: ICerbacHow[],
    ...cerbacHowsToCheck: (ICerbacHow | null | undefined)[]
  ): ICerbacHow[] {
    const cerbacHows: ICerbacHow[] = cerbacHowsToCheck.filter(isPresent);
    if (cerbacHows.length > 0) {
      const cerbacHowCollectionIdentifiers = cerbacHowCollection.map(cerbacHowItem => getCerbacHowIdentifier(cerbacHowItem)!);
      const cerbacHowsToAdd = cerbacHows.filter(cerbacHowItem => {
        const cerbacHowIdentifier = getCerbacHowIdentifier(cerbacHowItem);
        if (cerbacHowIdentifier == null || cerbacHowCollectionIdentifiers.includes(cerbacHowIdentifier)) {
          return false;
        }
        cerbacHowCollectionIdentifiers.push(cerbacHowIdentifier);
        return true;
      });
      return [...cerbacHowsToAdd, ...cerbacHowCollection];
    }
    return cerbacHowCollection;
  }
}
