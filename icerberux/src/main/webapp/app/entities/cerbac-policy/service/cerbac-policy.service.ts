import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacPolicy, getCerbacPolicyIdentifier } from '../cerbac-policy.model';

export type EntityResponseType = HttpResponse<ICerbacPolicy>;
export type EntityArrayResponseType = HttpResponse<ICerbacPolicy[]>;

@Injectable({ providedIn: 'root' })
export class CerbacPolicyService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-policies');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cerbacPolicy: ICerbacPolicy): Observable<EntityResponseType> {
    return this.http.post<ICerbacPolicy>(this.resourceUrl, cerbacPolicy, { observe: 'response' });
  }

  update(cerbacPolicy: ICerbacPolicy): Observable<EntityResponseType> {
    return this.http.put<ICerbacPolicy>(`${this.resourceUrl}/${getCerbacPolicyIdentifier(cerbacPolicy) as number}`, cerbacPolicy, {
      observe: 'response',
    });
  }

  partialUpdate(cerbacPolicy: ICerbacPolicy): Observable<EntityResponseType> {
    return this.http.patch<ICerbacPolicy>(`${this.resourceUrl}/${getCerbacPolicyIdentifier(cerbacPolicy) as number}`, cerbacPolicy, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacPolicy>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacPolicy[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacPolicyToCollectionIfMissing(
    cerbacPolicyCollection: ICerbacPolicy[],
    ...cerbacPoliciesToCheck: (ICerbacPolicy | null | undefined)[]
  ): ICerbacPolicy[] {
    const cerbacPolicies: ICerbacPolicy[] = cerbacPoliciesToCheck.filter(isPresent);
    if (cerbacPolicies.length > 0) {
      const cerbacPolicyCollectionIdentifiers = cerbacPolicyCollection.map(
        cerbacPolicyItem => getCerbacPolicyIdentifier(cerbacPolicyItem)!
      );
      const cerbacPoliciesToAdd = cerbacPolicies.filter(cerbacPolicyItem => {
        const cerbacPolicyIdentifier = getCerbacPolicyIdentifier(cerbacPolicyItem);
        if (cerbacPolicyIdentifier == null || cerbacPolicyCollectionIdentifiers.includes(cerbacPolicyIdentifier)) {
          return false;
        }
        cerbacPolicyCollectionIdentifiers.push(cerbacPolicyIdentifier);
        return true;
      });
      return [...cerbacPoliciesToAdd, ...cerbacPolicyCollection];
    }
    return cerbacPolicyCollection;
  }
}
