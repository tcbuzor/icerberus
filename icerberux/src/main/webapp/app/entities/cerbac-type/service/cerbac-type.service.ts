import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacType, getCerbacTypeIdentifier } from '../cerbac-type.model';

export type EntityResponseType = HttpResponse<ICerbacType>;
export type EntityArrayResponseType = HttpResponse<ICerbacType[]>;

@Injectable({ providedIn: 'root' })
export class CerbacTypeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-types');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cerbacType: ICerbacType): Observable<EntityResponseType> {
    return this.http.post<ICerbacType>(this.resourceUrl, cerbacType, { observe: 'response' });
  }

  update(cerbacType: ICerbacType): Observable<EntityResponseType> {
    return this.http.put<ICerbacType>(`${this.resourceUrl}/${getCerbacTypeIdentifier(cerbacType) as number}`, cerbacType, {
      observe: 'response',
    });
  }

  partialUpdate(cerbacType: ICerbacType): Observable<EntityResponseType> {
    return this.http.patch<ICerbacType>(`${this.resourceUrl}/${getCerbacTypeIdentifier(cerbacType) as number}`, cerbacType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacTypeToCollectionIfMissing(
    cerbacTypeCollection: ICerbacType[],
    ...cerbacTypesToCheck: (ICerbacType | null | undefined)[]
  ): ICerbacType[] {
    const cerbacTypes: ICerbacType[] = cerbacTypesToCheck.filter(isPresent);
    if (cerbacTypes.length > 0) {
      const cerbacTypeCollectionIdentifiers = cerbacTypeCollection.map(cerbacTypeItem => getCerbacTypeIdentifier(cerbacTypeItem)!);
      const cerbacTypesToAdd = cerbacTypes.filter(cerbacTypeItem => {
        const cerbacTypeIdentifier = getCerbacTypeIdentifier(cerbacTypeItem);
        if (cerbacTypeIdentifier == null || cerbacTypeCollectionIdentifiers.includes(cerbacTypeIdentifier)) {
          return false;
        }
        cerbacTypeCollectionIdentifiers.push(cerbacTypeIdentifier);
        return true;
      });
      return [...cerbacTypesToAdd, ...cerbacTypeCollection];
    }
    return cerbacTypeCollection;
  }
}
