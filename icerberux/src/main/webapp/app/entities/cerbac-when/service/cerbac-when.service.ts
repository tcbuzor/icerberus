import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacWhen, getCerbacWhenIdentifier } from '../cerbac-when.model';

export type EntityResponseType = HttpResponse<ICerbacWhen>;
export type EntityArrayResponseType = HttpResponse<ICerbacWhen[]>;

@Injectable({ providedIn: 'root' })
export class CerbacWhenService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-whens');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cerbacWhen: ICerbacWhen): Observable<EntityResponseType> {
    return this.http.post<ICerbacWhen>(this.resourceUrl, cerbacWhen, { observe: 'response' });
  }

  update(cerbacWhen: ICerbacWhen): Observable<EntityResponseType> {
    return this.http.put<ICerbacWhen>(`${this.resourceUrl}/${getCerbacWhenIdentifier(cerbacWhen) as number}`, cerbacWhen, {
      observe: 'response',
    });
  }

  partialUpdate(cerbacWhen: ICerbacWhen): Observable<EntityResponseType> {
    return this.http.patch<ICerbacWhen>(`${this.resourceUrl}/${getCerbacWhenIdentifier(cerbacWhen) as number}`, cerbacWhen, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacWhen>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacWhen[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacWhenToCollectionIfMissing(
    cerbacWhenCollection: ICerbacWhen[],
    ...cerbacWhensToCheck: (ICerbacWhen | null | undefined)[]
  ): ICerbacWhen[] {
    const cerbacWhens: ICerbacWhen[] = cerbacWhensToCheck.filter(isPresent);
    if (cerbacWhens.length > 0) {
      const cerbacWhenCollectionIdentifiers = cerbacWhenCollection.map(cerbacWhenItem => getCerbacWhenIdentifier(cerbacWhenItem)!);
      const cerbacWhensToAdd = cerbacWhens.filter(cerbacWhenItem => {
        const cerbacWhenIdentifier = getCerbacWhenIdentifier(cerbacWhenItem);
        if (cerbacWhenIdentifier == null || cerbacWhenCollectionIdentifiers.includes(cerbacWhenIdentifier)) {
          return false;
        }
        cerbacWhenCollectionIdentifiers.push(cerbacWhenIdentifier);
        return true;
      });
      return [...cerbacWhensToAdd, ...cerbacWhenCollection];
    }
    return cerbacWhenCollection;
  }
}
