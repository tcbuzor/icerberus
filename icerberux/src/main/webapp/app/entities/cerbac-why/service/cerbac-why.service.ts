import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacWhy, getCerbacWhyIdentifier } from '../cerbac-why.model';

export type EntityResponseType = HttpResponse<ICerbacWhy>;
export type EntityArrayResponseType = HttpResponse<ICerbacWhy[]>;

@Injectable({ providedIn: 'root' })
export class CerbacWhyService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-whies');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cerbacWhy: ICerbacWhy): Observable<EntityResponseType> {
    return this.http.post<ICerbacWhy>(this.resourceUrl, cerbacWhy, { observe: 'response' });
  }

  update(cerbacWhy: ICerbacWhy): Observable<EntityResponseType> {
    return this.http.put<ICerbacWhy>(`${this.resourceUrl}/${getCerbacWhyIdentifier(cerbacWhy) as number}`, cerbacWhy, {
      observe: 'response',
    });
  }

  partialUpdate(cerbacWhy: ICerbacWhy): Observable<EntityResponseType> {
    return this.http.patch<ICerbacWhy>(`${this.resourceUrl}/${getCerbacWhyIdentifier(cerbacWhy) as number}`, cerbacWhy, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacWhy>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacWhy[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacWhyToCollectionIfMissing(
    cerbacWhyCollection: ICerbacWhy[],
    ...cerbacWhiesToCheck: (ICerbacWhy | null | undefined)[]
  ): ICerbacWhy[] {
    const cerbacWhies: ICerbacWhy[] = cerbacWhiesToCheck.filter(isPresent);
    if (cerbacWhies.length > 0) {
      const cerbacWhyCollectionIdentifiers = cerbacWhyCollection.map(cerbacWhyItem => getCerbacWhyIdentifier(cerbacWhyItem)!);
      const cerbacWhiesToAdd = cerbacWhies.filter(cerbacWhyItem => {
        const cerbacWhyIdentifier = getCerbacWhyIdentifier(cerbacWhyItem);
        if (cerbacWhyIdentifier == null || cerbacWhyCollectionIdentifiers.includes(cerbacWhyIdentifier)) {
          return false;
        }
        cerbacWhyCollectionIdentifiers.push(cerbacWhyIdentifier);
        return true;
      });
      return [...cerbacWhiesToAdd, ...cerbacWhyCollection];
    }
    return cerbacWhyCollection;
  }
}
