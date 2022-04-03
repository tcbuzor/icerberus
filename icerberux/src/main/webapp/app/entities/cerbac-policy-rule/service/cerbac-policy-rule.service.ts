import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacPolicyRule, getCerbacPolicyRuleIdentifier } from '../cerbac-policy-rule.model';

export type EntityResponseType = HttpResponse<ICerbacPolicyRule>;
export type EntityArrayResponseType = HttpResponse<ICerbacPolicyRule[]>;

@Injectable({ providedIn: 'root' })
export class CerbacPolicyRuleService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-policy-rules');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cerbacPolicyRule: ICerbacPolicyRule): Observable<EntityResponseType> {
    return this.http.post<ICerbacPolicyRule>(this.resourceUrl, cerbacPolicyRule, { observe: 'response' });
  }

  update(cerbacPolicyRule: ICerbacPolicyRule): Observable<EntityResponseType> {
    return this.http.put<ICerbacPolicyRule>(
      `${this.resourceUrl}/${getCerbacPolicyRuleIdentifier(cerbacPolicyRule) as number}`,
      cerbacPolicyRule,
      { observe: 'response' }
    );
  }

  partialUpdate(cerbacPolicyRule: ICerbacPolicyRule): Observable<EntityResponseType> {
    return this.http.patch<ICerbacPolicyRule>(
      `${this.resourceUrl}/${getCerbacPolicyRuleIdentifier(cerbacPolicyRule) as number}`,
      cerbacPolicyRule,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacPolicyRule>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacPolicyRule[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacPolicyRuleToCollectionIfMissing(
    cerbacPolicyRuleCollection: ICerbacPolicyRule[],
    ...cerbacPolicyRulesToCheck: (ICerbacPolicyRule | null | undefined)[]
  ): ICerbacPolicyRule[] {
    const cerbacPolicyRules: ICerbacPolicyRule[] = cerbacPolicyRulesToCheck.filter(isPresent);
    if (cerbacPolicyRules.length > 0) {
      const cerbacPolicyRuleCollectionIdentifiers = cerbacPolicyRuleCollection.map(
        cerbacPolicyRuleItem => getCerbacPolicyRuleIdentifier(cerbacPolicyRuleItem)!
      );
      const cerbacPolicyRulesToAdd = cerbacPolicyRules.filter(cerbacPolicyRuleItem => {
        const cerbacPolicyRuleIdentifier = getCerbacPolicyRuleIdentifier(cerbacPolicyRuleItem);
        if (cerbacPolicyRuleIdentifier == null || cerbacPolicyRuleCollectionIdentifiers.includes(cerbacPolicyRuleIdentifier)) {
          return false;
        }
        cerbacPolicyRuleCollectionIdentifiers.push(cerbacPolicyRuleIdentifier);
        return true;
      });
      return [...cerbacPolicyRulesToAdd, ...cerbacPolicyRuleCollection];
    }
    return cerbacPolicyRuleCollection;
  }
}
