import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacWho, getCerbacWhoIdentifier } from '../cerbac-who.model';

export type EntityResponseType = HttpResponse<ICerbacWho>;
export type EntityArrayResponseType = HttpResponse<ICerbacWho[]>;

@Injectable({ providedIn: 'root' })
export class CerbacWhoService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-whos');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cerbacWho: ICerbacWho): Observable<EntityResponseType> {
    return this.http.post<ICerbacWho>(this.resourceUrl, cerbacWho, { observe: 'response' });
  }

  update(cerbacWho: ICerbacWho): Observable<EntityResponseType> {
    return this.http.put<ICerbacWho>(`${this.resourceUrl}/${getCerbacWhoIdentifier(cerbacWho) as number}`, cerbacWho, {
      observe: 'response',
    });
  }

  partialUpdate(cerbacWho: ICerbacWho): Observable<EntityResponseType> {
    return this.http.patch<ICerbacWho>(`${this.resourceUrl}/${getCerbacWhoIdentifier(cerbacWho) as number}`, cerbacWho, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacWho>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacWho[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacWhoToCollectionIfMissing(
    cerbacWhoCollection: ICerbacWho[],
    ...cerbacWhosToCheck: (ICerbacWho | null | undefined)[]
  ): ICerbacWho[] {
    const cerbacWhos: ICerbacWho[] = cerbacWhosToCheck.filter(isPresent);
    if (cerbacWhos.length > 0) {
      const cerbacWhoCollectionIdentifiers = cerbacWhoCollection.map(cerbacWhoItem => getCerbacWhoIdentifier(cerbacWhoItem)!);
      const cerbacWhosToAdd = cerbacWhos.filter(cerbacWhoItem => {
        const cerbacWhoIdentifier = getCerbacWhoIdentifier(cerbacWhoItem);
        if (cerbacWhoIdentifier == null || cerbacWhoCollectionIdentifiers.includes(cerbacWhoIdentifier)) {
          return false;
        }
        cerbacWhoCollectionIdentifiers.push(cerbacWhoIdentifier);
        return true;
      });
      return [...cerbacWhosToAdd, ...cerbacWhoCollection];
    }
    return cerbacWhoCollection;
  }
}
