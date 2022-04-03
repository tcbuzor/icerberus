import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacWhere, getCerbacWhereIdentifier } from '../cerbac-where.model';

export type EntityResponseType = HttpResponse<ICerbacWhere>;
export type EntityArrayResponseType = HttpResponse<ICerbacWhere[]>;

@Injectable({ providedIn: 'root' })
export class CerbacWhereService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-wheres');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cerbacWhere: ICerbacWhere): Observable<EntityResponseType> {
    return this.http.post<ICerbacWhere>(this.resourceUrl, cerbacWhere, { observe: 'response' });
  }

  update(cerbacWhere: ICerbacWhere): Observable<EntityResponseType> {
    return this.http.put<ICerbacWhere>(`${this.resourceUrl}/${getCerbacWhereIdentifier(cerbacWhere) as number}`, cerbacWhere, {
      observe: 'response',
    });
  }

  partialUpdate(cerbacWhere: ICerbacWhere): Observable<EntityResponseType> {
    return this.http.patch<ICerbacWhere>(`${this.resourceUrl}/${getCerbacWhereIdentifier(cerbacWhere) as number}`, cerbacWhere, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacWhere>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacWhere[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacWhereToCollectionIfMissing(
    cerbacWhereCollection: ICerbacWhere[],
    ...cerbacWheresToCheck: (ICerbacWhere | null | undefined)[]
  ): ICerbacWhere[] {
    const cerbacWheres: ICerbacWhere[] = cerbacWheresToCheck.filter(isPresent);
    if (cerbacWheres.length > 0) {
      const cerbacWhereCollectionIdentifiers = cerbacWhereCollection.map(cerbacWhereItem => getCerbacWhereIdentifier(cerbacWhereItem)!);
      const cerbacWheresToAdd = cerbacWheres.filter(cerbacWhereItem => {
        const cerbacWhereIdentifier = getCerbacWhereIdentifier(cerbacWhereItem);
        if (cerbacWhereIdentifier == null || cerbacWhereCollectionIdentifiers.includes(cerbacWhereIdentifier)) {
          return false;
        }
        cerbacWhereCollectionIdentifiers.push(cerbacWhereIdentifier);
        return true;
      });
      return [...cerbacWheresToAdd, ...cerbacWhereCollection];
    }
    return cerbacWhereCollection;
  }
}
