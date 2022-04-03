import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacWhat, getCerbacWhatIdentifier } from '../cerbac-what.model';

export type EntityResponseType = HttpResponse<ICerbacWhat>;
export type EntityArrayResponseType = HttpResponse<ICerbacWhat[]>;

@Injectable({ providedIn: 'root' })
export class CerbacWhatService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-whats');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cerbacWhat: ICerbacWhat): Observable<EntityResponseType> {
    return this.http.post<ICerbacWhat>(this.resourceUrl, cerbacWhat, { observe: 'response' });
  }

  update(cerbacWhat: ICerbacWhat): Observable<EntityResponseType> {
    return this.http.put<ICerbacWhat>(`${this.resourceUrl}/${getCerbacWhatIdentifier(cerbacWhat) as number}`, cerbacWhat, {
      observe: 'response',
    });
  }

  partialUpdate(cerbacWhat: ICerbacWhat): Observable<EntityResponseType> {
    return this.http.patch<ICerbacWhat>(`${this.resourceUrl}/${getCerbacWhatIdentifier(cerbacWhat) as number}`, cerbacWhat, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacWhat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacWhat[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacWhatToCollectionIfMissing(
    cerbacWhatCollection: ICerbacWhat[],
    ...cerbacWhatsToCheck: (ICerbacWhat | null | undefined)[]
  ): ICerbacWhat[] {
    const cerbacWhats: ICerbacWhat[] = cerbacWhatsToCheck.filter(isPresent);
    if (cerbacWhats.length > 0) {
      const cerbacWhatCollectionIdentifiers = cerbacWhatCollection.map(cerbacWhatItem => getCerbacWhatIdentifier(cerbacWhatItem)!);
      const cerbacWhatsToAdd = cerbacWhats.filter(cerbacWhatItem => {
        const cerbacWhatIdentifier = getCerbacWhatIdentifier(cerbacWhatItem);
        if (cerbacWhatIdentifier == null || cerbacWhatCollectionIdentifiers.includes(cerbacWhatIdentifier)) {
          return false;
        }
        cerbacWhatCollectionIdentifiers.push(cerbacWhatIdentifier);
        return true;
      });
      return [...cerbacWhatsToAdd, ...cerbacWhatCollection];
    }
    return cerbacWhatCollection;
  }
}
